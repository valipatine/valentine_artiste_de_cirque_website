const SOCIAL = {
  facebook: "https://www.facebook.com/valentineyvinartistedecirque/",
  instagram: "https://www.instagram.com/rulosalvientoo/",
  youtube:
    "https://www.youtube.com/channel/UCDN5LKlx5cKHbzyabUa4a5w/videos?disable_polymer=1",
};

function renderHeader(activePage) {
  const suffix = langSuffix();
  const isHome = activePage === "home";
  const homePrefix = isHome ? "" : `index.html${suffix}`;
  const disciplinePages = ["matChinois", "trapezeSangles", "aerialLoop"];
  const isDisciplinesActive = disciplinePages.includes(activePage);

  return `
    <header class="site-header" id="header">
      <div class="header-inner">
        <a href="index.html${suffix}" class="brand" data-i18n="brand.name">Valentine Yvin</a>

        <button class="nav-toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav-menu">
          <span></span><span></span><span></span>
        </button>

        <ul class="nav-menu" id="nav-menu">
          <li><a href="${homePrefix}#biographie" data-i18n="nav.bio">Biographie</a></li>
          <li class="nav-item nav-item--dropdown${isDisciplinesActive ? " is-active" : ""}">
            <a
              href="${homePrefix}#disciplines"
              class="nav-link nav-link--parent${isDisciplinesActive ? " active" : ""}"
              data-i18n="nav.disciplines"
              aria-haspopup="true"
            >Disciplines</a>
            <ul class="nav-submenu" role="menu">
              <li role="none">
                <a
                  href="mat-chinois.html${suffix}"
                  data-page-href="mat-chinois.html"
                  class="nav-link${activePage === "matChinois" ? " active" : ""}"
                  data-i18n="nav.mat"
                  role="menuitem"
                >Mât chinois</a>
              </li>
              <li role="none">
                <a
                  href="trapeze-sangles.html${suffix}"
                  data-page-href="trapeze-sangles.html"
                  class="nav-link${activePage === "trapezeSangles" ? " active" : ""}"
                  data-i18n="nav.trapSangles"
                  role="menuitem"
                >Trapèze sangles</a>
              </li>
              <li role="none">
                <a
                  href="aerial-loop.html${suffix}"
                  data-page-href="aerial-loop.html"
                  class="nav-link${activePage === "aerialLoop" ? " active" : ""}"
                  data-i18n="nav.trapDanse"
                  role="menuitem"
                >Cerceau Lyra</a>
              </li>
            </ul>
          </li>
          <li><a href="${homePrefix}#contact" data-i18n="nav.contact">Contact</a></li>
        </ul>

        <div class="header-actions">
          <div class="lang-switcher" role="group" aria-label="Language">
            <button class="lang-btn active" data-lang="fr" aria-pressed="true">FR</button>
            <span class="lang-sep">|</span>
            <button class="lang-btn" data-lang="en" aria-pressed="false">EN</button>
            <span class="lang-sep">|</span>
            <button class="lang-btn" data-lang="es" aria-pressed="false">ES</button>
          </div>
          <a href="${homePrefix}#contact" class="btn-cta header-cta" data-i18n="nav.contact">Contact</a>
        </div>
      </div>
    </header>`;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container footer-inner">
        <div class="footer-brand" data-i18n="brand.name">Valentine Yvin</div>
        <nav class="social-links" aria-label="Social media">
          <a href="${SOCIAL.instagram}" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
          </a>
          <a href="${SOCIAL.facebook}" target="_blank" rel="noopener" aria-label="Facebook">
            <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="${SOCIAL.youtube}" target="_blank" rel="noopener" aria-label="YouTube">
            <svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1 31.3 31.3 0 0 0 .5-5.8 31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z"/></svg>
          </a>
        </nav>
        <p class="footer-copy" data-i18n="footer.copy">© Valentine Yvin</p>
      </div>
    </footer>`;
}

function injectLayout(activePage) {
  const headerEl = document.getElementById("site-header");
  const footerEl = document.getElementById("site-footer");
  if (headerEl) headerEl.innerHTML = renderHeader(activePage);
  if (footerEl) footerEl.innerHTML = renderFooter();
}

function injectScrollPole() {
  if (document.querySelector(".scroll-pole")) return;

  const pole = document.createElement("aside");
  pole.className = document.querySelector(".hero")
    ? "scroll-pole scroll-pole--hidden"
    : "scroll-pole";
  pole.setAttribute("aria-hidden", "true");
  pole.innerHTML = `
    <div class="scroll-pole-track">
      <div class="scroll-pole-line"></div>
      <div class="scroll-pole-climber">
        <img src="assets/images/mat-chinois/01-cutout.png" alt="" width="165" height="180" decoding="async" />
      </div>
    </div>`;
  document.body.appendChild(pole);
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page || "home";
  injectLayout(page);
  injectScrollPole();
  initLanguage();
  initNav();
  initScrollHeader();
  initReveal();
  initHero();
  initScrollPole();
});
