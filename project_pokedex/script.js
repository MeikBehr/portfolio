const translations = {
  de: {
    start: "Ich stimme zu und will starten",
    startAria: "Demo-Projekt starten"
  },
  en: {
    start: "I agree and want to start",
    startAria: "Start demo project"
  }
};

function setLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = translations[lang][key];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    const key = el.dataset.i18nAria;
    console.log(el);
    el.setAttribute("aria-label", translations[lang][key]);
  });
}

// Initial language
setLang('de');