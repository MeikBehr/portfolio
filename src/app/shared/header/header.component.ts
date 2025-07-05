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

  openWrapper() {
    this.isMobileMenuOpen = true;
  }

  closeWrapper() {
    this.isMobileMenuOpen = false;
  }

  switchLanguage() {
    const newLang = this.translate.currentLang === 'en' ? 'de' : 'en';
    this.translate.use(newLang);
    this.currentLang = newLang.toUpperCase();
    this.closeWrapper();
  }

  scrollTo(targetId: string, event: Event) {
    event.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    this.closeWrapper();
  }
}
