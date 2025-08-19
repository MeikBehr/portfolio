import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  currentLang = 'EN';

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang?.toUpperCase() || 'EN';
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openWrapper(): void {
    this.isMobileMenuOpen = true;
  }

  closeWrapper(): void {
    this.isMobileMenuOpen = false;
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
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    this.closeWrapper();
  }
}
