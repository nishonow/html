const ICONS = {
  baby: '<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/><path d="M10.5 8h.01M13.5 8h.01"/>',
  home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M12 13v4M10 15h4"/>',
  brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1Z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>',
  drop: '<path d="M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12Z"/>',
  wave: '<path d="M2 12c2 0 2-5 4-5s2 10 4 10 2-10 4-10 2 10 4 10 2-5 4-5"/>',
  pulse: '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
  hand: '<path d="M7 11V6a1.5 1.5 0 0 1 3 0v5M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V12"/><path d="M16 9.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-12.6 4.2L4 15a1.5 1.5 0 0 1 2.3-2L7 14"/>',
  heart: '<path d="M12 21s-8-4.8-8-10.4A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 8 2.6C20 16.2 12 21 12 21Z"/>',
  chat: '<path d="M4 5h16v11H9l-5 4Z"/><path d="M8 10h8M8 13h5"/>',
  car: '<path d="M5 16V11l2-5h10l2 5v5"/><path d="M3 16h18v3H3z"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="16.5" cy="19" r="1.5"/>',
};

const icon = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;

const initials = (name) => name.split(" ").map((p) => p[0]).slice(0, 2).join("");

function render() {
  document.getElementById("servicesGrid").innerHTML = SERVICES.map((s) => `
    <article class="service">
      <div class="service__icon">${icon(s.icon)}</div>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
    </article>`).join("");

  document.getElementById("plansGrid").innerHTML = PLANS.map((p) => `
    <article class="plan${p.featured ? " plan--featured" : ""}">
      ${p.featured ? '<span class="plan__badge">Most chosen</span>' : ""}
      <h3>${p.name}</h3>
      <p>${p.text}</p>
      <a href="#contact" class="btn ${p.featured ? "btn--primary" : "btn--ghost"} btn--block">Ask about this plan</a>
    </article>`).join("");

  document.getElementById("teamGrid").innerHTML = DOCTORS.map((d) => `
    <article class="doctor">
      <div class="doctor__photo">${d.photo ? `<img src="${d.photo}" alt="${d.name}" loading="lazy">` : `<span>${initials(d.name)}</span>`}</div>
      <div class="doctor__body">
        <h3>${d.name}</h3>
        <p class="doctor__role">${d.role}</p>
        ${d.years ? `<p class="doctor__exp">${d.years} years of experience</p>` : ""}
        <div class="doctor__tags">${d.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      </div>
    </article>`).join("");

  document.getElementById("instaGrid").innerHTML = INSTAGRAM.map((p) => `
    <a href="${p.url}" target="_blank" rel="noopener" class="insta__item" aria-label="${p.alt}">
      ${p.image ? `<img src="${p.image}" alt="${p.alt}" loading="lazy">` : ""}
    </a>`).join("");

  document.getElementById("year").textContent = new Date().getFullYear();
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

    form.querySelectorAll("[required]").forEach((el) => el.classList.toggle("is-invalid", missing.includes(el.name)));
    if (missing.length) {
      error.textContent = "Please fill in your name, surname, date of birth and mobile number.";
      return;
    }
    if (!/^\+?[\d\s()-]{9,}$/.test(data.phone)) {
      error.textContent = "Please enter a valid mobile number.";
      form.phone.classList.add("is-invalid");
      return;
    }
    error.textContent = "";

    const lines = [
      "Hello MercyMed! I would like to book an appointment.",
      "",
      `Name: ${data.firstName.trim()}`,
      `Surname: ${data.lastName.trim()}`,
      `Date of birth: ${formatDate(data.dob)}`,
      `Mobile: ${data.phone.trim()}`,
    ];

    window.open(`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  });
}

function setupNav() {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const toggle = (open) => {
    document.body.classList.toggle("nav-open", open);
    burger.setAttribute("aria-expanded", open);
  };
  burger.addEventListener("click", () => toggle(!document.body.classList.contains("nav-open")));
  nav.addEventListener("click", (e) => e.target.tagName === "A" && toggle(false));

  const header = document.querySelector(".header");
  addEventListener("scroll", () => header.classList.toggle("is-scrolled", scrollY > 10), { passive: true });

  const links = [...nav.querySelectorAll("a")];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("is-active", a.hash === `#${entry.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));

  document.querySelectorAll(".js-wa").forEach((a) => {
    a.href = `https://wa.me/${CLINIC.whatsapp}`;
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll(".js-portal").forEach((a) => (a.href = CLINIC.portalUrl));
}

function setupReveal() {
  const items = document.querySelectorAll(".section__head, .service, .plan, .doctor, .card, .intl__list li, .about > *, .booking > *, .charity > *, .contact > *");
  items.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
}

render();
setupBooking();
setupNav();
setupReveal();
