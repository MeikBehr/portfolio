import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TranslateService } from '@ngx-translate/core';

/**
 * Root app component. Provides global layout, language detection and context.
 * Contains header, router outlet and footer.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** Application title, used for display in sub-components or meta */
  title = 'portfolio';

  /**
   * On startup: loads saved language from localStorage (default: DE).
   * Sets up ngx-translate with fallback and active language.
   * @param translate ngx-translate service
   */
  constructor(private translate: TranslateService) {
    const saved = localStorage.getItem('lang') || 'de';   // Default: DE
    this.translate.setDefaultLang('de');
    this.translate.use(saved);
  }
}