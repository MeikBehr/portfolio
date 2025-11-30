const translations = {
  de: {
    projectName: "JOIN",
    headline: "JOIN – Kanban Demo-Projekt",
    descriptionLine1: "Dies ist ein privates Demo- und Trainingsprojekt zur Umsetzung eines Kanban-Task-Managers für Webanwendungen.",
    descriptionLine2: "Die Anwendung speichert Testdaten lokal im Browser (LocalStorage) und nutzt zusätzlich Firebase zur Synchronisation – bitte keine echten personenbezogenen Daten eingeben.",
    start: "Ich stimme zu und will starten",
    imprint: "Impressum",
    privacy: "Datenschutz"
  },
  en: {
    projectName: "JOIN",
    headline: "JOIN – Kanban Demo Project",
    descriptionLine1: "This is a private demo and training project showcasing a Kanban-based task management web application.",
    descriptionLine2: "The application stores test data locally in the browser (LocalStorage) and also uses Firebase for synchronization – please do not enter any real personal data.",
    start: "I agree and want to start",
    imprint: "Imprint",
    privacy: "Privacy Policy"
  }
};

/**
 * Updates all visible text based on the selected language.
 * @param {string} lang - Language key ("de" | "en")
 */
function updateTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = translations[lang][el.dataset.i18n];
  });
}

/**
 * Updates all aria-labels based on the selected language.
 * @param {string} lang - Language key ("de" | "en")
 */
function updateAriaLabels(lang) {
  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    el.setAttribute("aria-label", translations[lang][el.dataset.i18nAria]);
  });
}

/**
 * Updates the active state of the language buttons.
 * @param {string} lang - Language key ("de" | "en")
 */
function updateLangButtons(lang) {
  document.querySelectorAll(".consent-lang-btn").forEach(btn => {
    btn.classList.toggle("is-active", btn.textContent.toLowerCase() === lang);
  });
}

/**
 * Sets the active language and updates the UI.
 * @param {string} lang - Language key ("de" | "en")
 */
function setLang(lang) {
  updateTranslations(lang);
  updateAriaLabels(lang);
  updateLangButtons(lang);
}

/**
 * Registers the start button click handler.
 */
function initStartButton() {
  document.getElementById("startBtn").addEventListener("click", () => {
    window.location.href = "./app/";
  });
}

/**
 * Sets the current year in the footer.
 */
function setCurrentYear() {
  document.getElementById("currentYear").textContent = new Date().getFullYear();
}

/* ---------- Init ---------- */
setLang("de");
initStartButton();
setCurrentYear();