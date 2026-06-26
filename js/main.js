const CONTACT_EMAIL = "valipatine@gmail.com";

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

function initScrollHeader() {
  const header = document.getElementById("header");
  if (!header) return;
  window.addEventListener(
    "scroll",
    () => header.classList.toggle("scrolled", window.scrollY > 40),
    { passive: true }
  );
}

function initHero() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  requestAnimationFrame(() => {
    hero.classList.remove("hero--loading");
    hero.classList.add("hero--ready");
  });

  if (reducedMotion) return;

  const visualBg = hero.querySelector(".hero-visual-bg");
  if (!visualBg) return;

  let rafId = null;

  hero.addEventListener("mousemove", (e) => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      visualBg.style.transform = `scale(1.05) translate(${x * 12}px, ${y * 8}px)`;

      rafId = null;
    });
  });

  hero.addEventListener("mouseleave", () => {
    visualBg.style.transform = "";
  });
}

function initScrollPole() {
  const pole = document.querySelector(".scroll-pole");
  const track = document.querySelector(".scroll-pole-track");
  const climber = document.querySelector(".scroll-pole-climber");
  const img = climber?.querySelector("img");
  const hero = document.querySelector(".hero");
  if (!pole || !track || !climber) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function updateVisibility() {
    if (!hero) {
      pole.classList.remove("scroll-pole--hidden");
      return;
    }
    pole.classList.toggle("scroll-pole--hidden", window.scrollY < hero.offsetHeight);
  }

  let ticking = false;

  function update() {
    updateVisibility();

    const trackHeight = track.clientHeight;
    const climberHeight = climber.offsetHeight;
    const maxTravel = Math.max(0, trackHeight - climberHeight);
    const scrollStart = hero ? hero.offsetHeight : 0;
    const scrollMax =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollRange = Math.max(0, scrollMax - scrollStart);
    const progress =
      scrollRange > 0
        ? Math.max(0, Math.min(1, (window.scrollY - scrollStart) / scrollRange))
        : 0;
    const y = progress * maxTravel;

    climber.style.setProperty("--scroll-y", `${y}px`);
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  function bind() {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  if (reducedMotion) {
    bind();
    return;
  }

  if (img && !img.complete) {
    img.addEventListener("load", bind, { once: true });
  } else {
    bind();
  }
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  els.forEach((el) => observer.observe(el));
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
    const organization = form.organization?.value.trim() || "";
    const eventType = form.eventType?.value || "";

    if (!name || !email || !message) return;

    submitBtn.disabled = true;

    const body = {
      name,
      email,
      message,
      organization,
      eventType,
      _subject: `Booking inquiry from ${name} — Valentine Yvin`,
    };

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) throw new Error("failed");
      form.reset();
      form.classList.add("hidden");
      success.classList.remove("hidden");
    } catch {
      submitBtn.disabled = false;
    }
  });
}

function initGallery() {
  const images = document.querySelectorAll(".gallery-grid img, .act-gallery img");
  if (!images.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-prev" aria-label="Previous">&#8249;</button>
    <img src="" alt="" />
    <button class="lightbox-next" aria-label="Next">&#8250;</button>`;
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector("img");
  let current = 0;
  const srcs = Array.from(images).map((img) => img.src);

  function show(idx) {
    current = (idx + srcs.length) % srcs.length;
    lbImg.src = srcs[current];
    lightbox.classList.add("open");
  }

  images.forEach((img, i) => img.addEventListener("click", () => show(i)));
  lightbox.querySelector(".lightbox-close").addEventListener("click", () =>
    lightbox.classList.remove("open")
  );
  lightbox.querySelector(".lightbox-prev").addEventListener("click", () =>
    show(current - 1)
  );
  lightbox.querySelector(".lightbox-next").addEventListener("click", () =>
    show(current + 1)
  );
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("open");
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") lightbox.classList.remove("open");
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initContactForm();
  initGallery();
});
