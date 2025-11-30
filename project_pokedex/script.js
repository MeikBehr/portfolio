const translations = {
  de: {
    projectName: "Pokédex",
    headline: "Pokédex – Demo-Projekt",
    descriptionLine1: "Dies ist ein privates Demo- und Trainingsprojekt zur Darstellung moderner Web-App-Funktionalität.",
    descriptionLine2: "Die Anwendung arbeitet mit externen APIs und verarbeitet Testdaten – bitte keine echten personenbezogenen Daten eingeben.",
    start: "Ich stimme zu und will starten",
    imprint: "Impressum",
    privacy: "Datenschutz"
  },
  en: {
    projectName: "Pokédex",
    headline: "Pokédex – Demo Project",
    descriptionLine1: "This is a private demo and training project showcasing modern web application functionality.",
    descriptionLine2: "The application uses external APIs and processes test data – please do not enter any real personal data.",
    start: "I agree and want to start",
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

document.getElementById("startBtn").addEventListener("click", () => {
  window.location.href = "./app/";
});


// Initial language
setLang('de');

// set actual year
document.getElementById("currentYear").textContent = new Date().getFullYear();
