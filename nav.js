/**
 * Site navigation — include this on every page with:
 *   <script src="nav.js" defer></script>
 *
 * It builds the nav bar and injects it at the top of <body>,
 * so you don't have to copy/paste nav HTML into every page.
 *
 * To mark the current page as active, add a matching `data-page`
 * attribute to your <body> tag, e.g.:
 *   <body data-page="about">
 * If you skip this, the nav still works — it just won't highlight
 * the current page.
 */

(function () {
  const NAV_ITEMS = [
    { label: "Home", href: "index.html", page: "home" },
    { label: "About Me", href: "about.html", page: "about" },
    { label: "Resume", href: "resume.html", page: "resume" },
    { label: "Contact", href: "contact.html", page: "contact" },
  ];

  function buildNav() {
    const currentPage = document.body.getAttribute("data-page");

    const nav = document.createElement("header");
    nav.className = "site-nav";

    const wordmark = document.createElement("a");
    wordmark.className = "site-nav__wordmark";
    wordmark.href = "index.html";
    wordmark.textContent = "Delaney";

    const list = document.createElement("nav");
    list.className = "site-nav__links";

    NAV_ITEMS.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      if (item.page === currentPage) {
        link.setAttribute("aria-current", "page");
      }
      list.appendChild(link);
    });

    nav.appendChild(wordmark);
    nav.appendChild(list);
    document.body.prepend(nav);
  }

  function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .site-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.6rem 6vw;
        font-family: 'Work Sans', sans-serif;
        background: var(--paper, #EFE8D8);
      }

      .site-nav__wordmark {
        font-family: 'Fraunces', serif;
        font-size: 1.15rem;
        font-weight: 600;
        letter-spacing: 0.01em;
        text-decoration: none;
        color: var(--ink, #1C1A15);
      }

      .site-nav__links {
        display: flex;
        gap: 2rem;
      }

      .site-nav__links a {
        text-decoration: none;
        font-size: 0.95rem;
        color: var(--ink, #1C1A15);
        position: relative;
        padding-bottom: 2px;
      }

      .site-nav__links a::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -2px;
        height: 1px;
        background: var(--brass, #C1873C);
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s ease;
      }

      .site-nav__links a:hover::after,
      .site-nav__links a[aria-current="page"]::after {
        transform: scaleX(1);
        transform-origin: left;
      }

      .site-nav__links a[aria-current="page"] {
        color: var(--brass, #C1873C);
      }

      @media (max-width: 760px) {
        .site-nav {
          flex-direction: column;
          gap: 1rem;
          align-items: flex-start;
        }
        .site-nav__links {
          gap: 1.2rem;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .site-nav__links a::after {
          transition: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectStyles();
    buildNav();
  });
})();
