const LANGS = ["ru", "ky", "en"];
const FLAG = { ru: "ru", ky: "kg", en: "en" };
const NUMBER_LOCALE = { ru: "ru-RU", ky: "ru-RU", en: "en-US" };

let DATA = Store.load();
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

const CLINIC_TEXT = { info_address_v: "address", c_address_v: "addressFull", info_hours_v: "hours", c_hours_v: "hoursFull", info_price_v: "price" };
const t = (key) => (CLINIC_TEXT[key] ? DATA.clinic[CLINIC_TEXT[key]]?.[lang] : I18N[lang][key] ?? I18N.ru[key]) ?? "";
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const num = (n) => n.toLocaleString(NUMBER_LOCALE[lang]);
const plural = (n, word) => PLURAL[lang](n, WORDS[word][lang]);
const waLink = (text) => `https://wa.me/${DATA.clinic.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const PERSON_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';

function renderServices() {
  document.getElementById("servicesList").innerHTML = DATA.services.map((s) => {
    const [title, text] = s[lang];
    return `<li class="list__item reveal">${icon(s.icon)}<h3>${title}</h3><p>${text}</p></li>`;
  }).join("");
}

function renderPlans() {
  document.getElementById("plansList").innerHTML = DATA.plans.map((p) => {
    const [title, text] = p[lang];
    return `<article class="column reveal">${icon(p.icon)}<h3>${title}</h3><p>${text}</p></article>`;
  }).join("");
}

function renderTeam() {
  document.getElementById("teamList").innerHTML = DATA.doctors.map((d) => {
    const name = esc(d.name[lang]);
    const photo = d.photo
      ? `<img src="${esc(d.photo)}" alt="${name}" width="200" height="200" loading="lazy" decoding="async" onerror="this.replaceWith(document.createRange().createContextualFragment(PERSON_SVG))">`
      : PERSON_SVG;
    const meta = [];
    if (+d.years) meta.push(`${WORDS.experience[lang]} ${d.years} ${plural(d.years, "years")}`);
    meta.push(+d.rating ? `★ ${num(d.rating)} · ${d.reviews} ${plural(d.reviews, "reviews")}` : t("team_new"));
    return `
      <li class="doctor reveal">
        <div class="doctor__photo">${photo}</div>
        <h3>${name}</h3>
        <p class="doctor__role">${esc(d.role[lang])}</p>
        <div class="doctor__foot">
          <p class="doctor__meta">${meta.join("<br>")}</p>
          <a class="doctor__book" href="${esc(waLink(t("wa_doctor").replace("{name}", d.name[lang])))}" target="_blank" rel="noopener">${t("doc_book")} <span class="arrow" aria-hidden="true">→</span></a>
        </div>
      </li>`;
  }).join("");
}

const KY_MONTHS = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];

function formatNewsDate(iso) {
  const date = new Date(iso);
  if (lang === "ky") return `${date.getDate()}-${KY_MONTHS[date.getMonth()]}, ${date.getFullYear()}`;
  return date.toLocaleDateString(lang === "ru" ? "ru-RU" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function renderNews() {
  const latest = [...DATA.news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
  document.getElementById("news").hidden = !latest.length;
  document.getElementById("newsList").innerHTML = latest.map((n) => {
    const [title, text] = n[lang].map(esc);
    const media = n.image
      ? `<img src="${esc(n.image)}" alt="" loading="lazy" onerror="this.replaceWith(document.createRange().createContextualFragment(icon('news')))">`
      : icon(n.icon || "news");
    return `
      <article class="news__item reveal">
        <div class="news__media">${media}</div>
        <time datetime="${n.date}">${formatNewsDate(n.date)}</time>
        <h3>${title}</h3>
        <p>${text}</p>
      </article>`;
  }).join("");
}

function renderPromo() {
  const [title, text, cta, message] = DATA.promo[lang];
  document.getElementById("promoTitle").textContent = title;
  document.getElementById("promoText").textContent = text;
  const link = document.getElementById("promoCta");
  link.textContent = cta;
  link.href = waLink(message);
  const dialog = document.getElementById("promo");
  const img = document.getElementById("promoImg");
  dialog.classList.toggle("promo--no-image", !DATA.promo.image);
  if (DATA.promo.image && img.getAttribute("src") !== DATA.promo.image) img.src = DATA.promo.image;
}

function renderContacts() {
  document.querySelectorAll(".js-phone").forEach((a) => {
    a.textContent = DATA.clinic.phone;
    a.href = `tel:${DATA.clinic.phone.replace(/[^\d+]/g, "")}`;
  });
  document.querySelectorAll(".js-tel").forEach((a) => (a.href = `tel:${DATA.clinic.phone.replace(/[^\d+]/g, "")}`));
  document.querySelectorAll(".js-email").forEach((a) => {
    a.textContent = DATA.clinic.email;
    a.href = `mailto:${DATA.clinic.email}`;
  });
  document.querySelectorAll(".js-wa").forEach((a) => {
    a.href = waLink();
    a.target = "_blank";
    a.rel = "noopener";
  });
}

function shouldShowPromo() {
  if (new URLSearchParams(location.search).get("promo") === "preview") return true;
  if (!DATA.promo.enabled) return false;
  if (DATA.promo.showEvery !== "session") return true;
  try {
    if (sessionStorage.getItem("promoSeen")) return false;
    sessionStorage.setItem("promoSeen", "1");
  } catch {}
  return true;
}

function setupPromo() {
  const dialog = document.getElementById("promo");
  document.getElementById("promoImg").addEventListener("error", () => dialog.classList.add("promo--no-image"));
  if (typeof dialog.showModal !== "function" || !shouldShowPromo()) return;

  const close = () => {
    if (!dialog.open || dialog.classList.contains("is-closing")) return;
    if (reducedMotion()) return dialog.close();
    dialog.classList.add("is-closing");
    dialog.addEventListener("animationend", () => {
      dialog.classList.remove("is-closing");
      dialog.close();
    }, { once: true });
  };

  document.getElementById("promoClose").addEventListener("click", close);
  document.getElementById("promoCta").addEventListener("click", close);
  dialog.addEventListener("click", (e) => e.target === dialog && close());
  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    close();
  });

  setTimeout(() => !document.body.classList.contains("nav-open") && dialog.showModal(), DATA.promo.delay);
}

function renderHero() {
  const img = document.getElementById("heroImg");
  const src = DATA.photos.hero || DEFAULT_DATA.photos.hero;
  if (src !== DEFAULT_DATA.photos.hero) img.removeAttribute("srcset");
  if (img.getAttribute("src") !== src) img.src = src;
  if (DATA.photos.gallery.length) {
    document.getElementById("gallery").hidden = false;
    document.getElementById("galleryList").innerHTML = DATA.photos.gallery
      .map((src) => `<figure class="reveal"><img src="${src}" alt="${t("gallery_title")}" loading="lazy"></figure>`).join("");
  }
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
    document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-checked", b.dataset.lang === lang));
    document.getElementById("langFlag").src = `img/flags/${FLAG[lang]}.svg`;
    document.getElementById("langCode").textContent = FLAG[lang].toUpperCase();

    renderHero();
    renderContacts();
    renderServices();
    renderPlans();
    renderTeam();
    renderNews();
    renderPromo();
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

function maskDate(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)].filter(Boolean).join(".");
}

function isValidDob(value) {
  const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
  if (!match) return false;
  const [, d, m, y] = match.map(Number);
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d && y >= 1900 && date <= new Date();
}

function setupBooking() {
  const form = document.getElementById("bookingForm");
  const error = document.getElementById("formError");

  form.dob.addEventListener("input", () => {
    form.dob.value = maskDate(form.dob.value);
  });

  form.addEventListener("input", (e) => {
    e.target.setAttribute("aria-invalid", false);
    if (!form.querySelector('[aria-invalid="true"]')) error.textContent = "";
  });

  new IntersectionObserver(([entry]) => {
    document.body.classList.toggle("booking-in-view", entry.isIntersecting);
  }, { rootMargin: "-20% 0px -20% 0px" }).observe(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const missing = ["firstName", "lastName", "dob", "phone"].filter((k) => !data[k].trim());
    const invalid = missing.length ? missing : [
      !isValidDob(data.dob.trim()) && "dob",
      !/^\+?[\d\s()-]{9,}$/.test(data.phone.trim()) && "phone",
    ].filter(Boolean);

    form.querySelectorAll("input").forEach((input) => input.setAttribute("aria-invalid", invalid.includes(input.name)));

    if (invalid.length) {
      error.textContent = missing.length ? t("f_err_required") : t(invalid[0] === "dob" ? "f_err_dob" : "f_err_phone");
      form[invalid[0]].focus();
      return;
    }
    error.textContent = "";

    const message = [
      t("wa_hello"),
      "",
      `${t("wa_first")}: ${data.firstName.trim()}`,
      `${t("wa_last")}: ${data.lastName.trim()}`,
      `${t("wa_dob")}: ${data.dob.trim()}`,
      `${t("wa_phone")}: ${data.phone.trim()}`,
    ].join("\n");

    window.open(waLink(message), "_blank", "noopener");
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
    const ready = header.classList.contains("is-ready");
    header.classList.remove("is-ready", "is-compact");
    header.classList.toggle("is-compact", innerWidth < 900 || bar.scrollWidth > bar.clientWidth + 1);
    if (!header.classList.contains("is-compact")) setMenu(false);
    if (ready) {
      void header.offsetWidth;
      header.classList.add("is-ready");
    }
  };
  addEventListener("resize", fit);
  document.fonts?.ready.then(fit);
  fitNav = fit;
  fit();
  requestAnimationFrame(() => requestAnimationFrame(() => header.classList.add("is-ready")));

  const langBox = document.getElementById("lang");
  const langToggle = document.getElementById("langToggle");
  const setLangMenu = (open) => {
    langBox.classList.toggle("is-open", open);
    langToggle.setAttribute("aria-expanded", open);
  };
  langToggle.addEventListener("click", () => setLangMenu(!langBox.classList.contains("is-open")));
  document.addEventListener("click", (e) => !langBox.contains(e.target) && setLangMenu(false));
  addEventListener("keydown", (e) => e.key === "Escape" && setLangMenu(false));
  document.querySelectorAll("[data-lang]").forEach((b) => {
    b.addEventListener("click", () => {
      setLangMenu(false);
      if (b.dataset.lang !== lang) applyLang(b.dataset.lang, { animate: true });
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
}

applyLang(lang);
addEventListener("storage", (e) => {
  if (e.key !== STORE_KEY && e.key !== null) return;
  DATA = Store.load();
  applyLang(lang);
});
setupBooking();
setupHeader();
setupPromo();
requestAnimationFrame(() => document.body.classList.add("is-loaded"));
