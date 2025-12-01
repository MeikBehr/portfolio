# Portfolio – Meik Behr

## **Project Overview**

This is my personal developer portfolio, built with Angular 18, showcasing my skills, selected projects, and a fully accessible contact form.
The site is optimized for accessibility (WCAG 2.1 AA), responsive design, and real-world usability.
Animations and transitions are designed to be keyboard-friendly and respect reduced-motion settings.

## **Live Demo & Repository**

* **Live site:** [https://develobehr.de/](https://develobehr.de/)
  (If not online, please use `ng serve` locally.)
* **Source code:** [https://github.com/develobehr/portfolio](https://github.com/develobehr/portfolio)

## **Key Features**

* Modern, component-based SPA architecture (Angular 18, standalone components)
* Bilingual: German (default) & English (ngx-translate, with browser language auto-detection)
* Fully responsive grid & layout (mobile-first, custom breakpoints)
* **Accessibility:**

  * WCAG 2.1 AA (tested with screenreaders, keyboard, accessibility tools)
  * Focus management, skip links, contrast, ARIA-labels, semantic HTML
  * Keyboard navigation for all interactive elements
* Animated skill/progress cards, smooth section transitions (motion safe, prefers-reduced-motion respected)
* PHP-based backend for secure contact form submission (server-side validation)
* Image optimization, webmanifest, favicons, and mobile app meta
* All project links marked as “private, non-WCAG” or “legacy” where relevant

## **About the Project Links**

Some project links included in this portfolio intentionally point to older, less polished, or non-accessible apps.
They are included to transparently demonstrate my learning path and growth as a developer.
Not all linked projects meet the same standards as this portfolio, but are shown for completeness and progression.

## Accessibility & WCAG Compliance

An external accessibility audit was conducted to evaluate the compliance of this portfolio with current accessibility standards.

- Tool used: accessibilitychecker.org  
- Standards: WCAG 2.2, EN 301 549, BITV  
- Result: **0 Critical Issues**, **95% automated audit score**
- All detected ARIA-related issues in the mobile navigation overlay were identified and corrected with proper semantic markup and accessible naming.
- Manual accessibility checks (e.g. keyboard navigation, focus order, screen reader behavior) are required and planned, as these cannot be fully validated by automated tools in modern Single Page Applications (SPAs).

This project follows a quality-first approach with a strong focus on real-world accessibility requirements.

## **How to Run Locally**

1. **Clone repository**
   `git clone https://github.com/develobehr/portfolio.git`
2. **Install dependencies**
   `npm install`
3. **Start dev server**
   `ng serve`
   Open [http://localhost:4200/](http://localhost:4200/) in your browser.

> **Note:**
> If you want to test the contact form locally, run a PHP server in the `/php/` directory
> (e.g., `php -S localhost:8000`) or deploy on any standard webhosting with PHP 7.4+ and enabled `mail()` function.

## **Build**

* Production build: `ng build --configuration production`
* Static assets are in `dist/`

## **Backend / Contact Form**

* The contact form submits data via POST to `/php/sendMail.php`
* PHP backend code is included under `/php/` (minimal, for demo; no database required)
* Input is validated server-side (required fields, email format, message length)
* Header injection protection and a hidden honeypot field against bots are implemented
* CORS is enabled for local and server deployment
* Server must support PHP 7.4+ and have `mail()` enabled (on Windows, mail() may require extra setup)
* For demo/testing: Script returns a success message if the request is valid, even if email delivery fails (no SMTP config)
* **Not for production!** Use a real email service and add anti-abuse features for any live deployment

## **Testing**

* No end-to-end or unit tests included (scope: DA project focus on UI, accessibility, and design)
* Accessibility checked with WAVE, axe, and [accessibilitychecker.org](https://www.accessibilitychecker.org/audit/)

## **Known Limitations**

* Portfolio projects section: Some links intentionally point to older, non-accessible projects to illustrate my development progress
* Not all projects are WCAG-compliant or maintained
* No database integration; contact messages are sent via email only
* This is a showcase; no sensitive data, GDPR-safe (privacy policy linked)

## **Credits**

* Built by **Meik Behr** (2025)
* Contact: [info@develobehr.de](mailto:info@develobehr.de)
* Design tokens, colors, and animation curves inspired by Figma design system

## **For Reviewers**

* Please check both desktop and mobile, and test accessibility with screen reader and keyboard navigation
* Some project links lead to legacy code or non-accessible demos for transparency about my skill evolution
* Animation and transitions auto-disable for reduced-motion OS settings
* All code is fully documented (JSDoc, SCSS comments) and structured for maintainability
* If you encounter any issues, please contact me directly or open an issue on Github

## **What to Test (Reviewer Checklist)**

* Keyboard navigation (TAB, SHIFT+TAB, Enter, ESC)
* Screenreader labels & ARIA (try NVDA/VoiceOver)
* Contact form validation and success/fail overlays
* Responsive design across breakpoints/devices
* Language switch (German/English)
* Animation auto-disable with “reduced motion” OS setting
* Try older project links to see evolution in code and design

## **Changelog / Time Spent**

* Total time invested: ~152 hours (Frontend, animations, accessibility, backend, testing) *(as of 01.12.2025)*
* Final QA: ongoing

## **Standard Angular CLI Commands**

*(Moved to the end, since this is standard and not project-specific)*

* `ng generate component <name>`
* `ng build`
* `ng test`
* `ng e2e`

