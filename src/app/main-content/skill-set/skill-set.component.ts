import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsDesktopComponent } from './skills-desktop.component';
import { SkillsMobileComponent } from './skills-mobile.component';

/**
 * Renders either the desktop or mobile skills view based on current viewport width.
 * Keeps the state in sync on window resize.
 */
@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [CommonModule, SkillsDesktopComponent, SkillsMobileComponent],
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.scss'],
})
export class SkillSetComponent {
  /** True when viewport width is greater than 950px (desktop breakpoint). */
  isDesktop = window.innerWidth > 950; // default ensures first render without user interaction

  constructor(private cdr: ChangeDetectorRef) {
    // Keep responsive state updated on resize
    window.addEventListener('resize', this.checkIsDesktop.bind(this));
  }

  /**
   * Updates the responsive flag and triggers change detection if the value changed.
   * Ensures the correct variant (desktop/mobile) is rendered.
   */
  checkIsDesktop(): void {
    const next = window.innerWidth > 950;
    if (this.isDesktop !== next) {
      this.isDesktop = next;
      this.cdr.detectChanges();
    }
  }
}