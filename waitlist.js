(function initWaitlistForm() {
  const modal = document.getElementById("waitlist-modal");
  const form = document.getElementById("waitlist-form");
  const openBtn = document.querySelector("[data-waitlist-open]");
  const note = document.getElementById("waitlist-form-note");
  const telegramHint = document.getElementById("waitlist-telegram-hint");

  if (!modal || !form || !openBtn) return;

  const config = window.SITE_CONFIG || {};
  const telegramUsername = getTelegramUsername(config);

  if (telegramHint && telegramUsername) {
    telegramHint.textContent = `@${telegramUsername}`;
    telegramHint.href = `https://t.me/${telegramUsername}`;
  }

  let lastFocus = null;

  function openModal() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("waitlist-modal-open");
    const first = form.querySelector("input, textarea");
    if (first) first.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("waitlist-modal-open");
    if (note) {
      note.hidden = true;
      note.textContent = "";
    }
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  openBtn.addEventListener("click", (event) => {
    event.preventDefault();
    openModal();
  });

  modal.querySelectorAll("[data-waitlist-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeModal();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!telegramUsername) {
      if (note) {
        note.hidden = false;
        note.textContent = "Укажите Telegram в config.js (waitlistTelegram).";
      }
      return;
    }

    const data = new FormData(form);
    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const goal = String(data.get("goal") || "").trim();
    const contact = String(data.get("contact") || "").trim();

    const message = [
      "Заявка в лист ожидания (курс)",
      "",
      `Имя: ${firstName}`,
      `Фамилия: ${lastName}`,
      `Цель: ${goal}`,
      `Связь: ${contact}`,
    ].join("\n");

    const url = buildTelegramMessageUrl(telegramUsername, message);
    window.open(url, "_blank", "noopener,noreferrer");

    if (note) {
      note.hidden = false;
      note.textContent = "Открылся Telegram — нажмите «Отправить» в чате, чтобы заявка дошла.";
    }

    form.reset();
    closeModal();
  });
})();

function getTelegramUsername(config) {
  if (config.waitlistTelegram) {
    return String(config.waitlistTelegram).replace(/^@/, "").trim();
  }

  const link = config.telegram || "";
  return link.replace(/^https?:\/\/t\.me\//i, "").replace(/\/$/, "").trim();
}

function buildTelegramMessageUrl(username, message) {
  const encoded = encodeURIComponent(message);
  return `https://t.me/${username}?text=${encoded}`;
}
