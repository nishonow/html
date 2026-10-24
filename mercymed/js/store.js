const STORE_KEY = "mercymed:site:v1";
const EDITABLE = ["clinic", "doctors", "news", "promo", "photos"];

const Store = {
  load() {
    const data = structuredClone(DEFAULT_DATA);
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY));
      if (saved && typeof saved === "object") EDITABLE.forEach((key) => key in saved && (data[key] = saved[key]));
    } catch {}
    return data;
  },
  save(data) {
    localStorage.setItem(STORE_KEY, JSON.stringify(Object.fromEntries(EDITABLE.map((key) => [key, data[key]]))));
  },
  reset() {
    localStorage.removeItem(STORE_KEY);
  },
};
