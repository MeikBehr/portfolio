import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

/**
 * Root application component.
 * Provides global app structure, manages language selection,
 * and handles device orientation for accessibility.
 *
 * Renders the header, main router outlet, and footer.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /** Application title, used in sub-components and meta information */
  title = 'portfolio';

  /** 
   * Flag indicating whether landscape mode is currently blocked
   * on small devices (to enforce portrait orientation for better usability).
   */
  isLandscapeBlocked = false;

  /**
   * Listens to window resize events and updates the landscape lock state.
   * This ensures that the landscape warning is shown/hidden dynamically
   * when the viewport size or orientation changes.
   */
  @HostListener('window:resize')
  onResize(): void {
    this.checkLandscape();
  }

  /**
   * Angular lifecycle hook.
   * Initializes the landscape blocking state on component startup.
   */
  ngOnInit(): void {
    this.checkLandscape();
  }

  /**
   * Checks if the device is in landscape mode with limited height,
   * and updates the blocking flag accordingly. Prevents scrolling if in landscape mode.
   * Devices with width > height and height < 420px are considered "blocked".
   */
  checkLandscape(): void {
    this.isLandscapeBlocked = window.innerWidth > window.innerHeight && window.innerHeight < 420;
    // No-Scroll toggeln:
    if (this.isLandscapeBlocked) {
      document.documentElement.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }
  }

  /**
   * Constructor.
   * Loads the user's saved language from localStorage (default: 'de' for German)
   * and initializes ngx-translate with fallback and active language.
   * 
   * @param translate - ngx-translate service for i18n support
   */
  constructor(private translate: TranslateService) {
    const saved = localStorage.getItem('lang') || 'de';   // Default: DE
    this.translate.setDefaultLang('de');
    this.translate.use(saved);
  }
}