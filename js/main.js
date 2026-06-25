const CONTACT_EMAIL = "adrienyvin@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initContactForm();
});

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector(".btn-submit");
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) return;

    submitBtn.disabled = true;

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            message,
            _subject: `Contact from ${name} - Valentine Yvin website`,
          }),
        }
      );

      if (!response.ok) throw new Error("Form submission failed");

      form.reset();
      form.classList.add("hidden");
      success.classList.remove("hidden");
    } catch {
      submitBtn.disabled = false;
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  });
}
