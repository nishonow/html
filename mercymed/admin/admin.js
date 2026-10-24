const PASSWORD = "mercymed";
const LANGS = [["ru", "ru", "Русский"], ["ky", "kg", "Кыргызча"], ["en", "en", "English"]];
const NEWS_ICONS = [
  ["news", "Газета"], ["flask", "Лаборатория"], ["chat", "Сообщение"], ["baby", "Ребёнок"], ["users", "Семья"],
  ["heart", "Сердце"], ["drop", "Капля крови"], ["lungs", "Лёгкие"], ["pulse", "Пульс"], ["home", "Дом"],
  ["van", "Выездная клиника"], ["handheart", "Помощь"], ["board", "Семинар"], ["book", "Книга"], ["clock", "Время"],
];

let DATA = Store.load();
let current = "news";

const $ = (selector, root = document) => root.querySelector(selector);
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const flag = (code) => `<img class="lf__flag" src="../img/flags/${code}.svg" alt="" width="21" height="15">`;

function toast(message, isError = false) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.toggle("toast--error", isError);
  el.classList.add("is-visible");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("is-visible"), 2600);
}

function persist(message = "Сохранено") {
  try {
    Store.save(DATA);
    toast(message);
    return true;
  } catch {
    toast("Не хватает места в браузере. Уменьшите или удалите фото.", true);
    DATA = Store.load();
    return false;
  }
}

function langField(name, label, values = {}, { multiline = false } = {}) {
  const rows = LANGS.map(([lang, code, title]) => {
    const value = esc(values[lang]);
    const control = multiline
      ? `<textarea name="${name}.${lang}" rows="3" aria-label="${label}, ${title}">${value}</textarea>`
      : `<input name="${name}.${lang}" value="${value}" aria-label="${label}, ${title}">`;
    return `<label class="lf__row">${flag(code)}${control}</label>`;
  }).join("");
  return `<fieldset class="lf"><legend>${label}</legend>${rows}</fieldset>`;
}

function field(name, label, value = "", attrs = "") {
  return `<label class="field"><span>${label}</span><input name="${name}" value="${esc(value)}" ${attrs}></label>`;
}

function imageField(value, { round = false } = {}) {
  return `
    <div class="img-field">
      <div class="img-field__preview${round ? " img-field__preview--square" : ""}">${value ? `<img src="${esc(value)}" alt="">` : "<span>Нет фото</span>"}</div>
      <div class="img-field__actions">
        <label class="btn btn--secondary btn--sm">Загрузить фото<input type="file" accept="image/*" data-image hidden></label>
        ${value ? '<button type="button" class="btn btn--ghost btn--sm" data-remove-image>Убрать фото</button>' : ""}
      </div>
      <input type="hidden" name="image" value="${esc(value)}">
    </div>`;
}

function readLang(form, name) {
  return Object.fromEntries(LANGS.map(([lang]) => [lang, (form.elements[`${name}.${lang}`]?.value || "").trim()]));
}

function resizeImage(file, max = 1000) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function bindImageField(form) {
  const box = $(".img-field", form);
  if (!box) return;
  const setImage = (src) => {
    form.elements.image.value = src;
    $(".img-field__preview", box).innerHTML = src ? `<img src="${esc(src)}" alt="">` : "<span>Нет фото</span>";
    form.dispatchEvent(new Event("imagechange"));
  };
  box.addEventListener("change", async (e) => {
    if (!e.target.matches("[data-image]") || !e.target.files[0]) return;
    try {
      setImage(await resizeImage(e.target.files[0]));
    } catch {
      toast("Не удалось прочитать файл", true);
    }
  });
  box.addEventListener("click", (e) => e.target.matches("[data-remove-image]") && setImage(""));
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

/* ---------- news ---------- */

function newsList() {
  const items = DATA.news
    .map((n, i) => ({ n, i }))
    .sort((a, b) => b.n.date.localeCompare(a.n.date))
    .map(({ n, i }) => `
      <li class="row">
        <div class="row__thumb">${n.image ? `<img src="${esc(n.image)}" alt="">` : icon(n.icon || "news")}</div>
        <div class="row__text"><strong>${esc(n.ru[0])}</strong><span>${formatDate(n.date)}</span></div>
        <div class="row__actions">
          <button type="button" class="btn btn--secondary btn--sm" data-edit="${i}">Изменить</button>
          <button type="button" class="btn btn--ghost btn--sm" data-delete="${i}">Удалить</button>
        </div>
      </li>`).join("");
  return `
    <header class="view__head">
      <div><h1>Новости</h1><p>На сайте показываются 6 последних по дате.</p></div>
      <button type="button" class="btn btn--primary" data-add>Добавить новость</button>
    </header>
    ${items ? `<ul class="rows">${items}</ul>` : '<p class="empty">Новостей пока нет.</p>'}`;
}

function newsEditor(index) {
  const n = index === null ? { date: new Date().toISOString().slice(0, 10), icon: "news", image: "", ru: ["", ""], ky: ["", ""], en: ["", ""] } : DATA.news[index];
  const pick = (k) => Object.fromEntries(LANGS.map(([lang]) => [lang, n[lang][k]]));
  return `
    <header class="view__head"><div><h1>${index === null ? "Новая новость" : "Изменить новость"}</h1></div></header>
    <form class="card form-grid" id="editor">
      ${field("date", "Дата", n.date, 'type="date" required')}
      <div class="field"><span>Картинка</span>${imageField(n.image)}</div>
      <label class="field" data-icon-field${n.image ? " hidden" : ""}><span>Иконка, если нет фото</span>
        <span class="icon-select"><span class="icon-select__preview">${icon(n.icon)}</span><select name="icon">${NEWS_ICONS.map(([k, label]) => `<option value="${k}"${k === n.icon ? " selected" : ""}>${label}</option>`).join("")}</select></span>
      </label>
      ${langField("title", "Заголовок", pick(0))}
      ${langField("text", "Текст", pick(1), { multiline: true })}
      <div class="form-actions">
        <button type="submit" class="btn btn--primary">Сохранить</button>
        <button type="button" class="btn btn--secondary" data-cancel>Отмена</button>
      </div>
    </form>`;
}

function bindNewsEditor(index) {
  const form = $("#editor");
  bindImageField(form);
  form.addEventListener("imagechange", () => ($("[data-icon-field]", form).hidden = !!form.elements.image.value));
  form.elements.icon.addEventListener("change", () => ($(".icon-select__preview", form).innerHTML = icon(form.elements.icon.value)));
  $("[data-cancel]", form).addEventListener("click", () => show("news"));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = readLang(form, "title");
    const text = readLang(form, "text");
    if (!title.ru) return toast("Заполните заголовок хотя бы на русском", true);
    const item = {
      date: form.elements.date.value,
      image: form.elements.image.value,
      icon: form.elements.icon.value,
      ...Object.fromEntries(LANGS.map(([lang]) => [lang, [title[lang] || title.ru, text[lang] || text.ru]])),
    };
    if (index === null) DATA.news.push(item);
    else DATA.news[index] = item;
    if (persist()) show("news");
  });
}

/* ---------- doctors ---------- */

function doctorsList() {
  const items = DATA.doctors.map((d, i) => `
    <li class="row">
      <div class="row__thumb row__thumb--square">${d.photo ? `<img src="${esc(d.photo)}" alt="">` : "<span>—</span>"}</div>
      <div class="row__text"><strong>${esc(d.name.ru)}</strong><span>${esc(d.role.ru)}</span></div>
      <div class="row__actions">
        <button type="button" class="btn btn--ghost btn--sm btn--icon" data-move="${i}:-1" aria-label="Выше"${i === 0 ? " disabled" : ""}>↑</button>
        <button type="button" class="btn btn--ghost btn--sm btn--icon" data-move="${i}:1" aria-label="Ниже"${i === DATA.doctors.length - 1 ? " disabled" : ""}>↓</button>
        <button type="button" class="btn btn--secondary btn--sm" data-edit="${i}">Изменить</button>
        <button type="button" class="btn btn--ghost btn--sm" data-delete="${i}">Удалить</button>
      </div>
    </li>`).join("");
  return `
    <header class="view__head">
      <div><h1>Врачи</h1><p>Порядок как на сайте. Первые четыре врача с фото показываются в начале страницы.</p></div>
      <button type="button" class="btn btn--primary" data-add>Добавить врача</button>
    </header>
    ${items ? `<ul class="rows">${items}</ul>` : '<p class="empty">Врачей пока нет.</p>'}`;
}

function doctorEditor(index) {
  const d = index === null ? { name: {}, role: {}, years: "", rating: "", reviews: "", photo: "" } : DATA.doctors[index];
  return `
    <header class="view__head"><div><h1>${index === null ? "Новый врач" : "Изменить врача"}</h1></div></header>
    <form class="card form-grid" id="editor">
      <div class="field"><span>Фото</span>${imageField(d.photo, { round: true })}</div>
      ${langField("name", "Имя и фамилия", d.name)}
      ${langField("role", "Специальность", d.role)}
      <div class="form-row">
        ${field("years", "Стаж, лет", d.years, 'type="number" min="0" max="70" inputmode="numeric"')}
        ${field("rating", "Рейтинг из 10", d.rating, 'type="number" min="0" max="10" step="0.1" inputmode="decimal"')}
        ${field("reviews", "Отзывов", d.reviews, 'type="number" min="0" inputmode="numeric"')}
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn--primary">Сохранить</button>
        <button type="button" class="btn btn--secondary" data-cancel>Отмена</button>
      </div>
    </form>`;
}

function bindDoctorEditor(index) {
  const form = $("#editor");
  bindImageField(form);
  $("[data-cancel]", form).addEventListener("click", () => show("doctors"));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = readLang(form, "name");
    const role = readLang(form, "role");
    if (!name.ru) return toast("Заполните имя хотя бы на русском", true);
    const fill = (obj) => Object.fromEntries(LANGS.map(([lang]) => [lang, obj[lang] || obj.ru]));
    const number = (key) => (form.elements[key].value === "" ? null : Number(form.elements[key].value));
    const doctor = { name: fill(name), role: fill(role), years: number("years"), rating: number("rating"), reviews: number("reviews"), photo: form.elements.image.value };
    if (index === null) DATA.doctors.push(doctor);
    else DATA.doctors[index] = doctor;
    if (persist()) show("doctors");
  });
}

/* ---------- promo ---------- */

function promoView() {
  const p = DATA.promo;
  const pick = (k) => Object.fromEntries(LANGS.map(([lang]) => [lang, p[lang][k]]));
  return `
    <header class="view__head">
      <div><h1>Промо-окно</h1><p>Показывается один раз, когда посетитель открывает сайт. После закрытия браузера — снова.</p></div>
      <a class="btn btn--secondary" href="../index.html?promo=preview" target="_blank" rel="noopener">Предпросмотр ↗</a>
    </header>
    <form class="card form-grid" id="editor">
      <label class="switch"><input type="checkbox" name="enabled"${p.enabled ? " checked" : ""}><span class="switch__track"></span><span>Показывать окно на сайте</span></label>
      <div class="field"><span>Фото</span>${imageField(p.image)}</div>
      ${langField("title", "Заголовок", pick(0))}
      ${langField("text", "Текст", pick(1), { multiline: true })}
      ${langField("cta", "Текст кнопки", pick(2))}
      ${langField("message", "Сообщение в WhatsApp при нажатии", pick(3), { multiline: true })}
      <div class="form-actions"><button type="submit" class="btn btn--primary">Сохранить</button></div>
    </form>`;
}

function bindPromo() {
  const form = $("#editor");
  bindImageField(form);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const parts = ["title", "text", "cta", "message"].map((name) => readLang(form, name));
    DATA.promo = {
      ...DATA.promo,
      enabled: form.elements.enabled.checked,
      image: form.elements.image.value,
      ...Object.fromEntries(LANGS.map(([lang]) => [lang, parts.map((part) => part[lang] || part.ru)])),
    };
    persist();
  });
}

/* ---------- contacts ---------- */

function contactsView() {
  const c = DATA.clinic;
  return `
    <header class="view__head"><div><h1>Контакты</h1><p>Обновляются везде на сайте: в начале страницы, в контактах, в подвале и в кнопках WhatsApp.</p></div></header>
    <form class="card form-grid" id="editor">
      <div class="form-row">
        ${field("phone", "Телефон", c.phone, 'type="tel" required')}
        ${field("whatsapp", "Номер WhatsApp (только цифры)", c.whatsapp, 'inputmode="numeric" pattern="\\d{9,15}" required')}
        ${field("email", "Эл. почта", c.email, 'type="email" required')}
      </div>
      ${langField("address", "Адрес коротко", c.address)}
      ${langField("addressFull", "Адрес полностью", c.addressFull, { multiline: true })}
      ${langField("hours", "Часы работы коротко", c.hours)}
      ${langField("hoursFull", "Часы работы полностью", c.hoursFull, { multiline: true })}
      ${langField("price", "Стоимость приёма", c.price)}
      <div class="form-actions"><button type="submit" class="btn btn--primary">Сохранить</button></div>
    </form>`;
}

function bindContacts() {
  const form = $("#editor");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fill = (name) => {
      const value = readLang(form, name);
      return Object.fromEntries(LANGS.map(([lang]) => [lang, value[lang] || value.ru]));
    };
    DATA.clinic = {
      ...DATA.clinic,
      phone: form.elements.phone.value.trim(),
      whatsapp: form.elements.whatsapp.value.replace(/\D/g, ""),
      email: form.elements.email.value.trim(),
      address: fill("address"),
      addressFull: fill("addressFull"),
      hours: fill("hours"),
      hoursFull: fill("hoursFull"),
      price: fill("price"),
    };
    persist();
  });
}

/* ---------- data ---------- */

function dataView() {
  return `
    <header class="view__head"><div><h1>Данные</h1><p>Изменения хранятся в этом браузере. Чтобы перенести их на другой компьютер, сделайте экспорт и импорт.</p></div></header>
    <div class="card stack">
      <div class="stack__row"><div><strong>Экспорт</strong><p>Скачать все изменения одним файлом.</p></div><button type="button" class="btn btn--secondary" id="export">Скачать файл</button></div>
      <div class="stack__row"><div><strong>Импорт</strong><p>Загрузить ранее скачанный файл.</p></div><label class="btn btn--secondary">Выбрать файл<input type="file" accept="application/json,.json" id="import" hidden></label></div>
      <div class="stack__row"><div><strong>Сброс</strong><p>Вернуть исходное содержимое сайта.</p></div><button type="button" class="btn btn--danger" id="reset">Сбросить</button></div>
    </div>`;
}

function bindData() {
  $("#export").addEventListener("click", () => {
    const blob = new Blob([localStorage.getItem(STORE_KEY) || JSON.stringify({})], { type: "application/json" });
    const link = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: `mercymed-${new Date().toISOString().slice(0, 10)}.json` });
    link.click();
    URL.revokeObjectURL(link.href);
  });
  $("#import").addEventListener("change", async (e) => {
    try {
      const saved = JSON.parse(await e.target.files[0].text());
      if (!saved || typeof saved !== "object" || !EDITABLE.some((key) => key in saved)) throw new Error();
      localStorage.setItem(STORE_KEY, JSON.stringify(saved));
      DATA = Store.load();
      toast("Данные загружены");
    } catch {
      toast("Файл не подходит", true);
    }
  });
  $("#reset").addEventListener("click", () => {
    if (!confirm("Вернуть исходное содержимое сайта? Все изменения будут удалены.")) return;
    Store.reset();
    DATA = Store.load();
    toast("Сброшено");
  });
}

/* ---------- shell ---------- */

const VIEWS = {
  news: { render: newsList, editor: newsEditor, bindEditor: bindNewsEditor, list: () => DATA.news, confirm: "Удалить новость?" },
  doctors: { render: doctorsList, editor: doctorEditor, bindEditor: bindDoctorEditor, list: () => DATA.doctors, confirm: "Удалить врача?" },
  promo: { render: promoView, bind: bindPromo },
  contacts: { render: contactsView, bind: bindContacts },
  data: { render: dataView, bind: bindData },
};

function show(name) {
  current = name;
  const v = VIEWS[name];
  const view = $("#view");
  view.innerHTML = v.render();
  document.querySelectorAll("[data-view]").forEach((b) => b.setAttribute("aria-current", b.dataset.view === name ? "page" : "false"));
  v.bind?.();
  view.focus({ preventScroll: true });
  scrollTo({ top: 0 });
}

function openEditor(index) {
  const v = VIEWS[current];
  $("#view").innerHTML = v.editor(index);
  v.bindEditor(index);
  $("#editor input:not([type=hidden]), #editor textarea")?.focus();
}

$("#view").addEventListener("click", (e) => {
  const v = VIEWS[current];
  const button = e.target.closest("button");
  if (!button || !v.list) return;
  if (button.matches("[data-add]")) openEditor(null);
  if (button.dataset.edit) openEditor(Number(button.dataset.edit));
  if (button.dataset.delete && confirm(v.confirm)) {
    v.list().splice(Number(button.dataset.delete), 1);
    if (persist("Удалено")) show(current);
  }
  if (button.dataset.move) {
    const [i, step] = button.dataset.move.split(":").map(Number);
    const list = v.list();
    [list[i], list[i + step]] = [list[i + step], list[i]];
    if (persist("Порядок сохранён")) show(current);
  }
});

$("#sidenav").addEventListener("click", (e) => e.target.dataset.view && show(e.target.dataset.view));

function enter() {
  $("#login").hidden = true;
  $("#app").hidden = false;
  show(current);
}

$("#loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (e.target.elements.password.value !== PASSWORD) {
    $("#loginError").textContent = "Неверный пароль";
    return;
  }
  sessionStorage.setItem("adminAuthed", "1");
  enter();
});

$("#logout").addEventListener("click", () => {
  sessionStorage.removeItem("adminAuthed");
  location.reload();
});

addEventListener("storage", (e) => {
  if (e.key !== STORE_KEY && e.key !== null) return;
  DATA = Store.load();
  if (!$("#editor") || current === "data") show(current);
});

if (sessionStorage.getItem("adminAuthed")) enter();
else $("#loginForm").elements.password.focus();
