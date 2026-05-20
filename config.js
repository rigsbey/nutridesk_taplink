/**
 * Настройки сайта Валерии.
 */
window.SITE_CONFIG = {
  bookingUrl: "#contacts",

  telegram: "https://t.me/vam_svetlo",
  /** username без @ — куда уходит заявка из формы ожидания */
  waitlistTelegram: "vam_svetlo",
  instagram: "https://www.instagram.com/valeria.vam_svetlo/",

  photos: {
    portrait: "images/hero.jpg",
    lifestyle: "images/lifestyle.png",
    food: "images/smoothie.png",
    detail: "images/vegetables.png",
    flowers: "images/nutrition-book.png",
    footer: "images/footer.png",
  },
};

(function applyConfig() {
  const { bookingUrl, telegram, instagram, photos } = SITE_CONFIG;

  function setNavLink(selector, url) {
    if (!url) return;
    document.querySelectorAll(selector).forEach((el) => {
      el.href = url;
      if (url.startsWith("#")) {
        el.removeAttribute("target");
        el.removeAttribute("rel");
      } else {
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      }
    });
  }

  setNavLink('[data-link="booking"]', bookingUrl);

  Object.entries({ telegram, instagram }).forEach(([key, url]) => {
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
      el.classList.add("has-image");
      const img = el.querySelector("img.photo__img");
      if (img) {
        img.src = src;
      } else {
        el.style.backgroundImage = `url("${src}")`;
      }
    });
  }

  Object.entries(photos).forEach(([key, src]) => setPhoto(key, src));
})();
