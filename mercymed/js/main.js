const LANGS = ["ru", "ky", "en"];
const NUMBER_LOCALE = { ru: "ru-RU", ky: "ky-KG", en: "en-US" };

let lang = detectLang();
let fitNav = () => {};

function detectLang() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (LANGS.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem("lang");
    if (LANGS.includes(saved)) return saved;
  } catch {}
  const browser = (navigator.language || "").slice(0, 2);
  return LANGS.includes(browser) ? browser : "ru";
}

const t = (key) => I18N[lang][key] ?? I18N.ru[key] ?? "";
const num = (n) => n.toLocaleString(NUMBER_LOCALE[lang]);
const plural = (n, word) => PLURAL[lang](n, WORDS[word][lang]);
const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const PERSON_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';

function renderServices() {
  document.getElementById("servicesList").innerHTML = SERVICES.map((s) => {
    const [title, text] = s[lang];
    return `<li class="list__item reveal"><h3>${title}</h3><p>${text}</p></li>`;
  }).join("");
}

function renderPlans() {
  document.getElementById("plansList").innerHTML = PLANS.map((p) => {
    const [title, text] = p[lang];
    return `<article class="column reveal"><h3>${title}</h3><p>${text}</p></article>`;
  }).join("");
}

function renderTeam() {
  document.getElementById("teamList").innerHTML = DOCTORS.map((d) => {
    const name = d.name[lang];
    const photo = d.photo
      ? `<img src="${d.photo}" alt="${name}" width="200" height="200" loading="lazy" decoding="async" onerror="this.replaceWith(document.createRange().createContextualFragment(PERSON_SVG))">`
      : PERSON_SVG;
    const meta = [];
    if (d.years) meta.push(`${WORDS.experience[lang]} ${d.years} ${plural(d.years, "years")}`);
    if (d.rating) meta.push(`★ ${num(d.rating)} · ${d.reviews} ${plural(d.reviews, "reviews")}`);
    return `
      <li class="doctor reveal">
        <div class="doctor__photo">${photo}</div>
        <h3>${name}</h3>
        <p class="doctor__role">${d.role[lang]}</p>
        ${meta.length ? `<p class="doctor__meta">${meta.join("<br>")}</p>` : ""}
      </li>`;
  }).join("");
}

function applyLang(next, { animate = false } = {}) {
  const run = () => {
    lang = next;
    document.documentElement.lang = lang;
    document.title = t("meta_title");
    document.querySelector('meta[name="description"]').content = t("meta_desc");

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const [attr, key] = el.dataset.i18nAttr.split(":");
      el.setAttribute(attr, t(key));
    });
    document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));

    renderServices();
    renderPlans();
    renderTeam();
    observeReveal(document.querySelectorAll(".reveal:not(.is-visible)"));
    fitNav();

    try { localStorage.setItem("lang", lang); } catch {}
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
  };

  if (!animate || reducedMotion()) return run();
  document.body.classList.add("is-switching");
  setTimeout(() => {
    run();
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible", "no-delay"));
    document.body.classList.remove("is-switching");
  }, 200);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    revealObserver.unobserve(entry.target);
  });
}, { rootMargin: "0px 0px -8% 0px" });

function observeReveal(elements) {
  elements.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    el.style.setProperty("--i", Math.min(siblings.indexOf(el), 6));
    revealObserver.observe(el);
  });
}

function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

function setupBooking() {
  const form = document.getElementById("bookingForm");
  const error = document.getElementById("formError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const missing = ["firstName", "lastName", "dob", "phone"].filter((k) => !data[k].trim());
    const phoneOk = /^\+?[\d\s()-]{9,}$/.test(data.phone.trim());

    form.querySelectorAll("input").forEach((input) => {
      const bad = missing.includes(input.name) || (input.name === "phone" && !missing.length && !phoneOk);
      input.setAttribute("aria-invalid", bad);
    });

    if (missing.length || !phoneOk) {
      error.textContent = missing.length ? t("f_err_required") : t("f_err_phone");
      return;
    }
    error.textContent = "";

    const message = [
      t("wa_hello"),
      "",
      `${t("wa_first")}: ${data.firstName.trim()}`,
      `${t("wa_last")}: ${data.lastName.trim()}`,
      `${t("wa_dob")}: ${formatDate(data.dob)}`,
      `${t("wa_phone")}: ${data.phone.trim()}`,
    ].join("\n");

    window.open(`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  });
}

function setupHeader() {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  const setMenu = (open) => {
    document.body.classList.toggle("nav-open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", t(open ? "menu_close" : "menu_open"));
  };
  burger.addEventListener("click", () => setMenu(!document.body.classList.contains("nav-open")));
  nav.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const links = [...nav.querySelectorAll("a")];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) links.forEach((a) => a.classList.toggle("is-active", a.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => spy.observe(s));

  const bar = document.querySelector(".header__bar");
  const fit = () => {
    header.classList.remove("is-compact");
    header.classList.toggle("is-compact", innerWidth < 900 || bar.scrollWidth > bar.clientWidth + 1);
    if (!header.classList.contains("is-compact")) setMenu(false);
  };
  addEventListener("resize", fit);
  document.fonts?.ready.then(fit);
  fitNav = fit;
  fit();

  document.querySelectorAll("[data-lang]").forEach((b) => {
    b.addEventListener("click", () => b.dataset.lang !== lang && applyLang(b.dataset.lang, { animate: true }));
  });

  document.querySelectorAll(".js-wa").forEach((a) => {
    a.href = `https://wa.me/${CLINIC.whatsapp}`;
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll(".js-portal").forEach((a) => (a.href = CLINIC.portalUrl));
  document.getElementById("year").textContent = new Date().getFullYear();
}

function setupParallax() {
  if (reducedMotion()) return;
  const layers = document.querySelectorAll(".hero__art .layer");
  let ticking = false;
  addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = Math.min(scrollY, 900);
      layers.forEach((l, i) => l.style.setProperty("--py", `${(-y * i * 0.015).toFixed(2)}px`));
      ticking = false;
    });
  }, { passive: true });
}

applyLang(lang);
setupBooking();
setupHeader();
setupParallax();
requestAnimationFrame(() => document.body.classList.add("is-loaded"));
