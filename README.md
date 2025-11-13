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
* All project links marked as “private, non-WCAG” where relevant

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

* Contact form POST requests are handled by `/php/contact.php`
* PHP backend code is included under `/php/` (minimal, for demo; no database)
* Server must support PHP 7.4+ and have `mail()` enabled

## **Testing**

* No end-to-end or unit tests included (scope: DA project focus on UI, accessibility, and design)
* Accessibility checked with WAVE, axe, and [accessibilitychecker.org](https://www.accessibilitychecker.org/audit/)

## **Known Limitations**

* Portfolio projects section: Some links are for demonstration only and not fully WCAG-compliant
* No database integration; contact messages are sent via email only
* This is a showcase; no sensitive data, GDPR-safe (privacy policy linked)

## **Credits**

* Built by **Meik Behr** (2025)
* Contact: [meik@develobehr.de](mailto:meik@develobehr.de)
* Design tokens, colors, and animation curves inspired by Figma design system

## **For Reviewers**

* Please check both desktop and mobile, and test accessibility with screen reader and keyboard navigation
* Animation and transitions auto-disable for reduced-motion OS settings
* All code is fully documented (JSDoc, SCSS comments) and structured for maintainability
* If you encounter any issues, please contact me directly or open an issue on Github.

## **Changelog / Time Spent**

* Total time invested: ~117 hours (Frontend, animations, accessibility, backend, testing) *(as of 13.11.2025)*
* Final QA: ongoing

## **Standard Angular CLI Commands**

*(Moved to the end, since this is standard and not project-specific)*

* `ng generate component <name>`
* `ng build`
* `ng test`
* `ng e2e`

---
