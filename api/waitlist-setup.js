const { BOT_TOKEN } = require("./telegram");

/** Один раз: GET /api/waitlist-setup после /start у @primera_lera_bot */
module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "GET only" });
  }

  if (!BOT_TOKEN) {
    return res.status(500).json({ ok: false, error: "Bot token not configured" });
  }

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
    const tgData = await tgRes.json();

    if (!tgData.ok) {
      return res.status(502).json({ ok: false, error: "getUpdates failed" });
    }

    const chats = [];
    const seen = new Set();

    for (const item of tgData.result || []) {
      const msg = item.message || item.edited_message;
      if (!msg?.chat?.id) continue;
      const id = String(msg.chat.id);
      if (seen.has(id)) continue;
      seen.add(id);
      chats.push({
        chat_id: id,
        type: msg.chat.type,
        name: [msg.from?.first_name, msg.from?.last_name].filter(Boolean).join(" "),
        username: msg.from?.username ? `@${msg.from.username}` : null,
      });
    }

    return res.status(200).json({
      ok: true,
      bot: "@primera_lera_bot",
      hint:
        chats.length === 0
          ? "Сначала откройте бота в Telegram и нажмите Start, затем обновите эту страницу."
          : "Скопируйте chat_id в api/telegram.js → CHAT_ID и задеплойте снова.",
      chats,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "Setup failed" });
  }
};
