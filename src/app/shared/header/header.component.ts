import { Component, Inject, HostListener, OnDestroy } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule, DOCUMENT } from '@angular/common';

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

  constructor(
    private translate: TranslateService,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.currentLang = this.translate.currentLang?.toUpperCase() || 'EN';
  }

  // Zentrale Steuerung, um Doppelcode zu vermeiden + Scroll-Lock
  private setMobileMenu(open: boolean): void {
    this.isMobileMenuOpen = open;
    // Body-Scroll-Lock (bewusst direkt, da reines Client-Portfolio)
    this.doc.body.style.overflow = open ? 'hidden' : '';
  }

  // toggleMobileMenu(): void {
  //   this.setMobileMenu(!this.isMobileMenuOpen);
  // }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }


  closeMobileMenu(): void {
    this.setMobileMenu(false);
  }

  openWrapper(): void {
    this.setMobileMenu(true);
  }

  closeWrapper(): void {
    this.setMobileMenu(false);
  }

  // Escape schließt das Overlay
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

  scrollTo(targetId: string, event: Event): void {
    event.preventDefault();
    const el = this.doc.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    this.closeWrapper();
  }

  ngOnDestroy(): void {
    // Safety: immer sauber zurücksetzen
    this.doc.body.style.overflow = '';
  }


  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

}

