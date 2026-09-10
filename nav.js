/**
 * Site navigation — include this on every page with:
 *   <script src="nav.js" defer></script>
 *
 * Where to put it on the page:
 *   - Simple pages: nav.js will automatically insert the bar at the
 *     very top of <body> — no extra markup needed.
 *   - Pages with a custom header layout (like the homepage): add
 *     an empty placeholder where you want the bar to appear —
 *       <div id="site-nav"></div>
 *     — and nav.js will fill it in for you.
 *
 * To highlight the current page in the nav, set a `data-page`
 * attribute on <body>, matching one of the `page` values below:
 *   <body data-page="about">
 * This is optional — the nav still works without it.
 */

(function () {
  const NAV_ITEMS = [
    { label: "Home", href: "index.html", page: "home" },
    { label: "About Me", href: "products.html", page: "about" },
    { label: "Resume", href: "resume.html", page: "resume" },
    { label: "Contact", href: "contact.html", page: "contact" },
  ];

  function buildNav() {
    const currentPage = document.body.getAttribute("data-page");

    const nav = document.createElement("nav");
    nav.id = "site-nav";
    nav.className = "site-nav";

    NAV_ITEMS.forEach((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.textContent = item.label;
      if (item.page === currentPage) {
        link.setAttribute("aria-current", "page");
      }
      nav.appendChild(link);
    });

    return nav;
  }

  function injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .site-nav {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 2.5rem;
        padding: 1rem 1.8rem;
        font-family: 'Work Sans', sans-serif;
        background: var(--pine, #16261D);
        border-bottom: 1px solid var(--line, #C9BFA6);
      }

      .site-nav a {
        text-decoration: none;
        color: var(--paper, #EFE8D8);
        font-size: 0.95rem;
        position: relative;
        padding-bottom: 3px;
      }

      .site-nav a[aria-current="page"] {
        color: var(--brass, #C1873C);
      }

      .site-nav a::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -3px;
        height: 1px;
        background: var(--brass, #C1873C);
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s ease;
      }

      .site-nav a:hover::after,
      .site-nav a[aria-current="page"]::after {
        transform: scaleX(1);
        transform-origin: left;
      }

      @media (max-width: 480px) {
        .site-nav {
          gap: 1.4rem;
          padding: 0.9rem 1.2rem;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .site-nav a::after {
          transition: none;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function init() {
    injectStyles();
    const nav = buildNav();
    const placeholder = document.getElementById("site-nav");

    if (placeholder) {
      placeholder.replaceWith(nav);
    } else {
      document.body.prepend(nav);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
