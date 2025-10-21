import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

/**
 * PrivacyPolicyComponent
 * 
 * Displays the privacy policy in the current language.
 * Uses ngx-translate for i18n support.
 */
@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent {

  /** Holds the current language code (e.g. 'de' or 'en'). */
  currentLang: string;

  /**
   * Initializes the component with the active or default language.
   * @param translate The translation service instance.
   */
  constructor(private translate: TranslateService) {
    this.currentLang = translate.currentLang || translate.getDefaultLang() || 'de';
  }
}