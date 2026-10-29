const LANGS = ["ru", "ky", "en"];
const FLAG = { ru: "ru", ky: "kg", en: "en" };
const NUMBER_LOCALE = { ru: "ru-RU", ky: "ru-RU", en: "en-US" };

const SITE_URL = "https://mercymed.kg";
const PATH_LANG = /\/(ru|ky|en)\/(?:index\.html)?$/;
const pathMode = false;
const ASSET_BASE = document.querySelector('link[href$="css/styles.css"]').getAttribute("href").replace("css/styles.css", "");
const asset = (src) => (!src || /^(https?:|\/)/.test(src) ? src : ASSET_BASE + src);

const DATA = DEFAULT_DATA;
const railMobile = matchMedia("(max-width: 860px)");
let lang = detectLang();
let fitNav = () => {};

function detectLang() {
  const fromPath = location.pathname.match(PATH_LANG)?.[1];
  if (fromPath) return fromPath;
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
function pageUrl(hash = "") {
  const url = new URL(location.href);
  if (pathMode) {
    const base = url.pathname.replace(PATH_LANG, "/").replace(/index\.html$/, "");
    url.pathname = `${base}${lang}/`;
    url.searchParams.delete("lang");
  } else {
    url.searchParams.set("lang", lang);
  }
  url.hash = hash;
  return url;
}

const t = (key) => (CLINIC_TEXT[key] ? DATA.clinic[CLINIC_TEXT[key]]?.[lang] : I18N[lang][key] ?? I18N.ru[key]) ?? "";
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const num = (n) => n.toLocaleString(NUMBER_LOCALE[lang]);
const plural = (n, word) => PLURAL[lang](n, WORDS[word][lang]);
const waLink = (text) => `https://wa.me/${DATA.clinic.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const PERSON_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';

let activeService = 0;

function serviceDetail(s) {
  const [title, text] = s[lang];
  const doctors = DATA.doctors.filter((d) => d.services.includes(s.id));
  const facts = [
    s.audience && `<div><dt>${t("svc_audience")}</dt><dd>${esc(s.audience[lang])}</dd></div>`,
    s.price && `<div><dt>${t("svc_price")}</dt><dd>${esc(s.price[lang])}</dd></div>`,
  ].filter(Boolean).join("");
  const people = doctors.length ? `
    <div class="svc__doctors">
      <span>${t("svc_doctors")}</span>
      <ul class="avatars">${doctors.map((d) => `<li title="${esc(d.name[lang])}">${d.photo ? `<img src="${esc(d.photo)}" alt="${esc(d.name[lang])}" loading="lazy" onerror="this.replaceWith(document.createRange().createContextualFragment(PERSON_SVG))">` : PERSON_SVG}</li>`).join("")}</ul>
    </div>` : "";
  return `
    ${icon(s.icon)}
    <h3>${esc(title)}</h3>
    <p class="svc__text">${esc(text)}</p>
    ${facts ? `<dl class="svc__facts">${facts}</dl>` : ""}
    ${people}
    <a class="btn btn--primary" href="${esc(waLink(t("wa_service").replace("{service}", title)))}" target="_blank" rel="noopener">${t("doc_book")} <span class="arrow" aria-hidden="true">→</span></a>`;
}

function renderServices() {
  activeService = Math.min(activeService, DATA.services.length - 1);
  document.getElementById("svcList").innerHTML = DATA.services.map((s, i) => `
    <li class="svc__item">
      <button type="button" class="svc__tab" aria-expanded="${i === activeService}" aria-controls="svc-body-${i}" data-i="${i}">
        <span class="svc__num">${String(i + 1).padStart(2, "0")}</span>${icon(s.icon)}<span class="svc__name">${esc(s[lang][0])}</span>
      </button>
      <div class="svc__body" id="svc-body-${i}">${serviceDetail(s)}</div>
    </li>`).join("");
  document.getElementById("svcPanel").innerHTML = serviceDetail(DATA.services[activeService]);
}

function setupServices() {
  const list = document.getElementById("svcList");
  const panel = document.getElementById("svcPanel");
  list.addEventListener("click", (e) => {
    const tab = e.target.closest(".svc__tab");
    if (!tab) return;
    const i = Number(tab.dataset.i);
    const isOpen = tab.getAttribute("aria-expanded") === "true";
    if (railMobile.matches && isOpen) {
      tab.setAttribute("aria-expanded", "false");
      return;
    }
    activeService = i;
    list.querySelectorAll(".svc__tab").forEach((b) => b.setAttribute("aria-expanded", b === tab));
    panel.innerHTML = serviceDetail(DATA.services[i]);
    panel.classList.remove("is-changing");
    void panel.offsetWidth;
    panel.classList.add("is-changing");
  });
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

let newsShown = [];

function newsMedia(n) {
  return n.image
    ? `<img src="${esc(asset(n.image))}" alt="" loading="lazy" onerror="this.replaceWith(document.createRange().createContextualFragment(icon('news')))">`
    : icon(n.icon || "news");
}

function fromInstagram(post) {
  const [title, ...rest] = (post.caption || "").split("\n");
  const text = rest.join("\n").trim();
  return {
    id: `ig-${post.id}`,
    date: post.timestamp.slice(0, 10),
    image: post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url,
    source: "instagram",
    permalink: post.permalink,
    ...Object.fromEntries(LANGS.map((l) => [l, [title, text]])),
  };
}

function allNews() {
  const posts = typeof INSTAGRAM === "undefined" ? [] : INSTAGRAM.posts.map(fromInstagram);
  return [...DATA.news, ...posts].sort((a, b) => b.date.localeCompare(a.date));
}

function renderInstagramBadge() {
  const badge = document.getElementById("igBadge");
  const latest = allNews().find((n) => n.source === "instagram");
  badge.hidden = !latest;
  if (!latest) return;
  badge.href = `#news/${encodeURIComponent(latest.id)}`;
  badge.innerHTML = `
    <img src="${esc(asset(latest.image))}" alt="" width="48" height="48">
    <span><b>@${esc(INSTAGRAM.username)}</b><small>${t("ig_badge")} · ${formatNewsDate(latest.date)}</small></span>
    <span class="arrow" aria-hidden="true">→</span>`;
}

function renderNews() {
  newsShown = allNews().slice(0, 8);
  document.getElementById("news").hidden = !newsShown.length;
  document.getElementById("newsList").innerHTML = newsShown.map((n, i) => {
    const [title, text] = n[lang].map(esc);
    const source = n.source === "instagram" ? ` · <span class="news__source">${icon("instagram")}Instagram</span>` : "";
    return `
      <article class="news__item reveal">
        <div class="news__media">${newsMedia(n)}</div>
        <p class="news__meta"><time datetime="${n.date}">${formatNewsDate(n.date)}</time>${source}</p>
        <h3><button type="button" class="news__open" data-news="${i}">${title}</button></h3>
        <p>${text}</p>
        <span class="news__more" aria-hidden="true">${t("news_more")} <span class="arrow">→</span></span>
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
  if (!DATA.promo.enabled) return false;
  if (DATA.promo.showEvery !== "session") return true;
  try {
    if (sessionStorage.getItem("promoSeen")) return false;
    sessionStorage.setItem("promoSeen", "1");
  } catch {}
  return true;
}

function setupDialog(dialog) {
  const close = () => {
    if (!dialog.open || dialog.classList.contains("is-closing")) return;
    if (reducedMotion()) return dialog.close();
    dialog.classList.add("is-closing");
    dialog.addEventListener("animationend", () => {
      dialog.classList.remove("is-closing");
      dialog.close();
    }, { once: true });
  };
  dialog.querySelectorAll("[data-close]").forEach((b) => b.addEventListener("click", close));
  dialog.addEventListener("click", (e) => e.target === dialog && close());
  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    close();
  });
  return close;
}

const newsId = (n) => n.id || n.date;
const NEWS_HASH = /^#news\/(.+)$/;

function setupNews() {
  const dialog = document.getElementById("newsModal");
  if (typeof dialog.showModal !== "function") return;
  const close = setupDialog(dialog);
  let pushed = false;

  const open = (n, push) => {
    fillNews(n);
    if (!dialog.open) dialog.showModal();
    const hash = `#news/${encodeURIComponent(newsId(n))}`;
    if (location.hash === hash) return;
    if (push) history.pushState({ news: newsId(n) }, "", pageUrl(hash));
    else history.replaceState({ news: newsId(n) }, "", pageUrl(hash));
    pushed = push;
  };
  const fromHash = () => {
    const id = location.hash.match(NEWS_HASH)?.[1];
    return id && allNews().find((n) => newsId(n) === decodeURIComponent(id));
  };

  document.getElementById("newsList").addEventListener("click", (e) => {
    const item = e.target.closest(".news__item");
    if (item) open(newsShown[item.querySelector("[data-news]").dataset.news], true);
  });
  dialog.addEventListener("close", () => {
    if (!NEWS_HASH.test(location.hash)) return;
    if (pushed) history.back();
    else history.replaceState(null, "", pageUrl("#news"));
    pushed = false;
  });
  addEventListener("popstate", () => {
    const n = fromHash();
    if (n) open(n, false);
    else if (dialog.open) {
      pushed = false;
      close();
    }
  });

  const initial = fromHash();
  if (initial) {
    document.getElementById("news").scrollIntoView();
    open(initial, false);
  }
}

function fillNews(n) {
  const [title, text] = n[lang];
  const media = document.getElementById("newsModalMedia");
  media.innerHTML = newsMedia(n);
  media.classList.toggle("promo__media--icon", !n.image);
  const date = document.getElementById("newsModalDate");
  date.textContent = formatNewsDate(n.date);
  date.dateTime = n.date;
  document.getElementById("newsModalTitle").textContent = title;
  document.getElementById("newsModalText").textContent = text;
  document.getElementById("newsModal").dataset.id = newsId(n);
  const link = document.getElementById("newsModalLink");
  link.hidden = !n.permalink;
  if (n.permalink) link.href = n.permalink;
}

function setupPromo() {
  const dialog = document.getElementById("promo");
  document.getElementById("promoImg").addEventListener("error", () => dialog.classList.add("promo--no-image"));
  if (typeof dialog.showModal !== "function" || !shouldShowPromo()) return;

  const close = setupDialog(dialog);
  document.getElementById("promoCta").addEventListener("click", close);

  setTimeout(() => {
    if (!document.body.classList.contains("nav-open") && !document.querySelector("dialog[open]")) dialog.showModal();
  }, DATA.promo.delay);
}

function railIndex(list) {
  const items = list.children;
  if (items.length < 2) return 0;
  if (list.scrollLeft + list.clientWidth >= list.scrollWidth - 2) return items.length - 1;
  const step = items[1].offsetLeft - items[0].offsetLeft;
  return Math.min(items.length - 1, Math.round(list.scrollLeft / step));
}

function updateRails() {
  document.querySelectorAll(".rail-dots").forEach((dots) => {
    const list = document.getElementById(dots.dataset.rail);
    const count = list.children.length;
    if (dots.children.length !== count) {
      dots.innerHTML = Array.from({ length: count }, (_, i) => `<button type="button" aria-label="${i + 1} / ${count}"><span></span></button>`).join("");
    }
    const active = railIndex(list);
    [...dots.children].forEach((b, i) => b.toggleAttribute("aria-current", i === active));
  });
}

function setupRails() {
  document.querySelectorAll(".rail-dots").forEach((dots) => {
    const list = document.getElementById(dots.dataset.rail);
    let ticking = false;
    list.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateRails();
        ticking = false;
      });
    }, { passive: true });
    dots.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      if (!button) return;
      const item = list.children[[...dots.children].indexOf(button)];
      list.scrollTo({ left: item.offsetLeft - list.firstElementChild.offsetLeft, behavior: reducedMotion() ? "auto" : "smooth" });
    });
  });
  railMobile.addEventListener("change", updateRails);
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
    document.getElementById("langFlag").src = asset(`img/flags/${FLAG[lang]}.svg`);
    document.getElementById("langCode").textContent = FLAG[lang].toUpperCase();

    renderContacts();
    renderServices();
    renderPlans();
    renderTeam();
    renderNews();
    renderInstagramBadge();
    renderPromo();
    const openNews = document.querySelector("#newsModal[open]");
    const shown = openNews && allNews().find((n) => newsId(n) === openNews.dataset.id);
    if (shown) fillNews(shown);
    observeReveal(document.querySelectorAll(".reveal:not(.is-visible)"));
    updateRails();
    fitNav();

    try { localStorage.setItem("lang", lang); } catch {}
    history.replaceState(history.state, "", pageUrl(location.hash));
    document.querySelector('link[rel="canonical"]').href = `${SITE_URL}/${lang}/`;
    document.querySelector('meta[property="og:url"]').content = `${SITE_URL}/${lang}/`;
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
  const groups = [...nav.querySelectorAll(".nav__group")];
  const setGroup = (group, open) => {
    group.classList.toggle("is-open", open);
    group.querySelector(".nav__trigger").setAttribute("aria-expanded", open);
  };
  groups.forEach((group) => {
    group.querySelector(".nav__trigger").addEventListener("click", () => {
      const open = !group.classList.contains("is-open");
      groups.forEach((g) => setGroup(g, false));
      setGroup(group, open);
    });
    group.addEventListener("mouseleave", () => setGroup(group, false));
    group.addEventListener("focusout", (e) => !group.contains(e.relatedTarget) && setGroup(group, false));
  });
  addEventListener("keydown", (e) => e.key === "Escape" && groups.forEach((g) => setGroup(g, false)));
  nav.addEventListener("click", (e) => {
    if (!e.target.closest("a")) return;
    groups.forEach((g) => setGroup(g, false));
    setMenu(false);
  });
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", scrollY > 8);
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const links = [...nav.querySelectorAll("a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  let spyTicking = false;
  const spy = () => {
    const line = innerHeight * 0.4;
    const current = sections.find((sec) => {
      const r = sec.getBoundingClientRect();
      return !sec.hidden && r.top <= line && r.bottom > line;
    });
    links.forEach((a) => a.classList.toggle("is-active", !!current && a.hash === `#${current.id}`));
    groups.forEach((g) => g.classList.toggle("is-active", !!g.querySelector("a.is-active")));
    spyTicking = false;
    if (!syncHash || document.querySelector("dialog[open]") || NEWS_HASH.test(location.hash)) return;
    const hash = current && current.id !== "top" ? `#${current.id}` : "";
    if (location.hash !== hash) history.replaceState(history.state, "", pageUrl(hash));
  };
  let syncHash = false;
  addEventListener("load", () => setTimeout(() => (syncHash = true), 600));
  addEventListener("scroll", () => {
    if (spyTicking) return;
    spyTicking = true;
    requestAnimationFrame(spy);
  }, { passive: true });
  spy();

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

// While a popup or the mobile menu is open, the page behind must not scroll.
// Blocking the input (instead of overflow: hidden) keeps the scrollbar on screen,
// so the page looks the same with and without a popup.
function scrollLockTarget() {
  return document.querySelector("dialog[open]") || (document.body.classList.contains("nav-open") ? document.getElementById("nav") : null);
}

function guardScroll(e, dy) {
  const box = scrollLockTarget();
  if (!box) return;
  const canScroll = dy < 0 ? box.scrollTop > 0 : box.scrollTop + box.clientHeight < box.scrollHeight - 1;
  if (box.contains(e.target) && canScroll) return;
  if (e.cancelable) e.preventDefault();
}

const SCROLL_KEYS = { ArrowUp: -1, ArrowDown: 1, PageUp: -1, PageDown: 1, Home: -1, End: 1, " ": 1 };
let touchY = 0;
addEventListener("wheel", (e) => guardScroll(e, e.deltaY), { passive: false });
addEventListener("touchstart", (e) => (touchY = e.touches[0].clientY), { passive: true });
addEventListener("touchmove", (e) => guardScroll(e, touchY - e.touches[0].clientY), { passive: false });
addEventListener("keydown", (e) => {
  if (!(e.key in SCROLL_KEYS) || e.target.closest("input, textarea, select")) return;
  if (e.key === " " && e.target.closest("button, a")) return;
  guardScroll(e, SCROLL_KEYS[e.key]);
});

applyLang(lang);
setupBooking();
setupHeader();
setupPromo();
setupNews();
setupServices();
setupRails();
requestAnimationFrame(() => document.body.classList.add("is-loaded"));
