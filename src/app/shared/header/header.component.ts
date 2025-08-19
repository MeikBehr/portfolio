import { Component, Inject, HostListener, OnDestroy } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule, DOCUMENT } from '@angular/common';

type NavId = 'aboutMe' | 'mySkills' | 'portfolio';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  isMobileMenuOpen = false;
  currentLang = 'EN';
  activeLink: NavId | null = 'aboutMe';

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.currentLang = this.translate.currentLang?.toUpperCase() || 'EN';
  }

  private setMobileMenu(open: boolean): void {
    this.isMobileMenuOpen = open;
    this.doc.body.style.overflow = open ? 'hidden' : '';
  }


  // toggleMobileMenu(): void {
  //   this.isMobileMenuOpen = !this.isMobileMenuOpen;

  //   if (this.isMobileMenuOpen) {
  //     const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

  //     document.body.style.overflow = 'hidden';

  //     // Nur wenn > 0 (also Scrollbar existiert → Desktop)
  //     if (scrollBarWidth > 0) {
  //       document.body.style.paddingRight = `${scrollBarWidth}px`;
  //     }
  //   } else {
  //     document.body.style.overflow = '';
  //     document.body.style.paddingRight = '';
  //   }
  // }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.isMobileMenuOpen ? this.lockScroll() : this.unlockScroll();
  }




  closeMobileMenu(): void {
    this.setMobileMenu(false);
    if (!this.isMobileMenuOpen) return;
    this.isMobileMenuOpen = false;
    this.unlockScroll();
  }

  openWrapper(): void {
    this.setMobileMenu(true);
  }

  closeWrapper(): void {
    this.setMobileMenu(false);
    if (!this.isMobileMenuOpen) return;
    this.isMobileMenuOpen = false;
    this.unlockScroll();
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') this.closeMobileMenu();
  }

  switchLanguage(): void {
    const next = this.translate.currentLang === 'de' ? 'en' : 'de';
    this.translate.use(next);
    localStorage.setItem('lang', next);
    this.currentLang = next.toUpperCase();
    this.closeWrapper();
  }

  switchLanguageTo(lang: 'de'|'en'){ 
    if ((this.currentLang || '').toLowerCase() === lang) return;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
    this.currentLang = lang.toUpperCase();
  }

  scrollTo(targetId: string, event: Event): void {
    event.preventDefault();

    switch (targetId) {
      case 'aboutMe':
      case 'mySkills':
      case 'portfolio':
        this.activeLink = targetId as NavId;
        break;
      default:
        // z.B. 'contact' -> kein Desktop-Tab aktiv ändern
        break;
    }

    this.isMobileMenuOpen = false;
    this.unlockScroll();

    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  ngOnDestroy(): void {
    this.doc.body.style.overflow = '';
    this.unlockScroll();
  }


  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  private lockScroll(): void {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`; // nur Desktop
  }

  private unlockScroll(): void {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }



}

