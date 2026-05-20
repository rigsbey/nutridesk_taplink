const { BOT_TOKEN, CHAT_ID } = require("./telegram");

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  if (!BOT_TOKEN) {
    return res.status(500).json({ ok: false, error: "Bot token not configured" });
  }

  if (!CHAT_ID) {
    return res.status(503).json({
      ok: false,
      error:
        "CHAT_ID не задан. Напишите /start боту @primera_lera_bot и откройте /api/waitlist-setup на сайте.",
    });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: "Invalid JSON" });
    }
  }

  const firstName = trim(body?.firstName);
  const lastName = trim(body?.lastName);
  const goal = trim(body?.goal);
  const contact = trim(body?.contact);

  if (!firstName || !lastName || !goal || !contact) {
    return res.status(400).json({ ok: false, error: "Заполните все поля" });
  }

  const text = [
    "📋 Заявка в лист ожидания",
    "",
    `Имя: ${firstName}`,
    `Фамилия: ${lastName}`,
    `Цель: ${goal}`,
    `Связь: ${contact}`,
  ].join("\n");

  try {
    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
    });

    const tgData = await tgRes.json();
    if (!tgData.ok) {
      console.error("Telegram API error:", tgData);
      return res.status(502).json({
        ok: false,
        error: "Telegram не принял сообщение. Проверьте CHAT_ID в api/telegram.js",
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: "Ошибка отправки" });
  }
};

function trim(value) {
  return String(value ?? "").trim();
}
