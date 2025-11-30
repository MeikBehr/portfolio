const translations = {
  de: {
    projectName: "Pokédex",
    headline: "Pokédex – Demo-Projekt",
    descriptionLine1: "Dieses Projekt ist ein privates Trainingsprojekt.",
    descriptionLine2: "Es demonstriert den Umgang mit der öffentlichen PokéAPI.",
    start: "Ich stimme zu und will starten",
    startAria: "Pokédex Demo-Projekt starten",
    imprint: "Impressum",
    privacy: "Datenschutz"
  },
  en: {
    projectName: "Pokédex",
    headline: "Pokédex – Demo Project",
    descriptionLine1: "This is a private training project.",
    descriptionLine2: "It demonstrates working with the public PokéAPI.",
    start: "I agree and want to start",
    startAria: "Start Pokédex demo project",
    imprint: "Imprint",
    privacy: "Privacy Policy"
  }
};


function setLang(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = translations[lang][key];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    const key = el.dataset.i18nAria;
    el.setAttribute("aria-label", translations[lang][key]);
  });

    document.querySelectorAll(".consent-lang-btn").forEach(btn => {
        btn.classList.remove("is-active");

        if (btn.textContent.toLowerCase() === lang) {
        btn.classList.add("is-active");
        }
    });
}

// Initial language
setLang('de');

// set actual year
document.getElementById("currentYear").textContent = new Date().getFullYear();
