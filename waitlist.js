(function initWaitlistForm() {
  const modal = document.getElementById("waitlist-modal");
  const form = document.getElementById("waitlist-form");
  const openBtn = document.querySelector("[data-waitlist-open]");
  const note = document.getElementById("waitlist-form-note");
  const submitBtn = form?.querySelector(".waitlist-form__submit");
  const telegramHint = document.getElementById("waitlist-telegram-hint");

  if (!modal || !form || !openBtn) return;

  const config = window.SITE_CONFIG || {};
  const botUsername = String(config.waitlistBot || "primera_lera_bot").replace(/^@/, "");

  if (telegramHint) {
    telegramHint.textContent = `@${botUsername}`;
    telegramHint.href = `https://t.me/${botUsername}`;
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

  function showNote(text, isError) {
    if (!note) return;
    note.hidden = false;
    note.textContent = text;
    note.classList.toggle("waitlist-form__note--error", Boolean(isError));
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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const payload = {
      firstName: String(data.get("firstName") || "").trim(),
      lastName: String(data.get("lastName") || "").trim(),
      goal: String(data.get("goal") || "").trim(),
      contact: String(data.get("contact") || "").trim(),
    };

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Отправляем…";
    }

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok || !result.ok) {
        const msg =
          result.error ||
          (res.status === 404
            ? "Отправка работает только на Vercel (задеплойте сайт)."
            : "Не удалось отправить. Попробуйте позже или напишите в Telegram.");
        showNote(msg, true);
        return;
      }

      showNote("Заявка отправлена. Скоро свяжусь с вами.", false);
      form.reset();
      setTimeout(closeModal, 1600);
    } catch {
      showNote("Нет связи с сервером. Проверьте интернет или напишите в Telegram.", true);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Отправить заявку";
      }
    }
  });
})();
