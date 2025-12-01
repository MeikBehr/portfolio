import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

/**
 * AtfComponent renders the "Above The Fold" (ATF) landing section,
 * including branding, hero elements and main call-to-action.
 * Contains smooth scroll utility for internal navigation.
 */
@Component({
  selector: 'app-atf',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './atf.component.html',
  styleUrls: ['./atf.component.scss']
})
export class AtfComponent {

  /**
   * Creates the ATF component and injects the Angular Router
   * for navigation and fragment-based routing.
   * @param router Angular Router service.
   */
  constructor(private router: Router) { }

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
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }

}