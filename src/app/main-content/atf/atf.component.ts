import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

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
   * Smoothly scrolls to the target section by id.
   * @param targetId - The id of the element to scroll to.
   * @param event - The triggering event (usually from a link/button).
   */
  scrollTo(targetId: string, event: Event): void {
    event.preventDefault();
    document.getElementById(targetId)
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}