import { Component, Inject, HostListener, OnDestroy } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ViewportScroller } from '@angular/common'; 
import { Router } from '@angular/router';

type NavId = 'aboutMe' | 'mySkills' | 'portfolio' | 'contact';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  /** Tracks whether the mobile menu is open */
  isMobileMenuOpen = false;

  /** Current UI language ('DE' or 'EN') */
  currentLang = 'EN';

  /** Active navigation link */
  activeLink: NavId | null = null;

  constructor(
    private translate: TranslateService,
    private viewport: ViewportScroller,
    private router: Router,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.currentLang = this.translate.currentLang?.toUpperCase() || 'EN';
  }

  /**
   * Toggles the mobile menu open/closed and locks/unlocks body scroll accordingly.
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.isMobileMenuOpen ? this.lockScroll() : this.unlockScroll();
  }

  /**
   * Closes the mobile menu and unlocks body scroll.
   */
  closeMobileMenu(): void {
    if (!this.isMobileMenuOpen) return;
    this.isMobileMenuOpen = false;
    this.unlockScroll();
  }

  /**
   * HostListener: Closes mobile menu when ESC is pressed.
   */
  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') this.closeMobileMenu();
  }

  /**
   * Switches the UI language to the given code ('de' or 'en').
   * Also closes the mobile menu after switching.
   */
  switchLanguageTo(lang: 'de' | 'en'): void { 
    if (this.currentLang.toLowerCase() === lang) return;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.currentLang = lang.toUpperCase();
    this.closeMobileMenu();
  }

  /**
   * Scrolls to the given section (by fragment or in-page anchor).
   * @param targetId Section ID or fragment.
   * @param event Mouse/keyboard event.
   */
  navigateToSection(targetId: string, event: Event): void {
    event.preventDefault();
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl === '/' || currentUrl === '/index.html') {
      this.scrollTo(targetId);
    } else {
      this.router.navigate(['/'], { fragment: targetId });
    }
  }

  /**
   * Scrolls smoothly to the given target section by ID.
   * @param targetId Section anchor ID.
   */
  scrollTo(targetId: string): void {
    switch (targetId) {
      case 'aboutMe':
      case 'atf':
      case 'mySkills':
      case 'portfolio':
      case 'contact':
        this.activeLink = targetId as NavId;
        break;
      default:
        break;
    }
    this.closeMobileMenu();
    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  /**
   * Scrolls smoothly to the top of the page.
   * @param event Mouse/keyboard event.
   */
  scrollToTop(event: Event): void {
    event.preventDefault();
    this.closeMobileMenu();
    this.activeLink = null;
    setTimeout(() => this.viewport.scrollToPosition([0, 0]), 0);
  }

  ngOnDestroy(): void {
    this.unlockScroll();
  }

  /**
   * Locks body scroll (prevents scrolling when mobile menu is open).
   */
  private lockScroll(): void {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`; // Desktop scroll compensation
  }

  /**
   * Unlocks body scroll (restores scrolling).
   */
  private unlockScroll(): void {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

}
