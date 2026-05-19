/**
 * Настройки лендинга — поменяйте под себя перед публикацией.
 */
const TAPLINK_CONFIG = {
  name: "Елена Соколова",
  /** Ссылка на запись (Calendly, Tilda, Google Form и т.д.) */
  bookingUrl: "#booking",
  /** Telegram, WhatsApp или почта */
  contactUrl: "https://t.me/your_username",
};

(function applyConfig() {
  const nameEl = document.querySelector("[data-config='name']");
  if (nameEl && TAPLINK_CONFIG.name) {
    nameEl.textContent = TAPLINK_CONFIG.name;
    document.title = `${TAPLINK_CONFIG.name} — нутрициолог`;
  }

  document.querySelectorAll("[data-link='booking']").forEach((el) => {
    if (TAPLINK_CONFIG.bookingUrl && !TAPLINK_CONFIG.bookingUrl.startsWith("#")) {
      el.href = TAPLINK_CONFIG.bookingUrl;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }
  });

  const contactBtn = document.querySelector("[data-link='contact']");
  if (contactBtn && TAPLINK_CONFIG.contactUrl) {
    contactBtn.href = TAPLINK_CONFIG.contactUrl;
    if (TAPLINK_CONFIG.contactUrl.startsWith("http")) {
      contactBtn.target = "_blank";
      contactBtn.rel = "noopener noreferrer";
    }
  }
})();
