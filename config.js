/**
 * Настройки сайта Валерии.
 */
const SITE_CONFIG = {
  bookingUrl: "#booking",
  waitlistUrl: "#booking",

  telegram: "https://t.me/your_username",
  instagram: "https://instagram.com/your_username",
  whatsapp: "https://wa.me/0000000000",

  photos: {
    portrait: "images/hero.jpg",
    lifestyle: "images/lifestyle.jpg",
    food: "images/lifestyle.jpg",
    detail: "images/hero.jpg",
    flowers: "images/contacts.jpg",
    footer: "images/contacts.jpg",
  },
};

(function applyConfig() {
  const { bookingUrl, waitlistUrl, telegram, instagram, whatsapp, photos } = SITE_CONFIG;

  document.querySelectorAll('[data-link="booking"]').forEach((el) => {
    if (bookingUrl && !bookingUrl.startsWith("#")) {
      el.href = bookingUrl;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }
  });

  const waitlistBtn = document.querySelector('[data-link="waitlist"]');
  if (waitlistBtn && waitlistUrl) {
    waitlistBtn.href = waitlistUrl;
    if (!waitlistUrl.startsWith("#")) {
      waitlistBtn.target = "_blank";
      waitlistBtn.rel = "noopener noreferrer";
    }
  }

  Object.entries({ telegram, instagram, whatsapp }).forEach(([key, url]) => {
    const el = document.querySelector(`[data-link="${key}"]`);
    if (el && url && url !== "#") {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }
  });

  function setPhoto(key, src) {
    if (!src) return;
    document.querySelectorAll(`[data-photo="${key}"]`).forEach((el) => {
      el.style.backgroundImage = `url("${src}")`;
    });
  }

  Object.entries(photos).forEach(([key, src]) => setPhoto(key, src));
})();
