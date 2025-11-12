import { CommonModule } from '@angular/common';
import {
  Component,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  ElementRef,
  QueryList,
  OnDestroy
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

/**
 * Desktop variant of the Skills section.
 * Handles intersection‑based animations and the interactive tooltip
 * for the “Continually Learning” item.
 */
@Component({
  selector: 'app-skills-desktop',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './skills-desktop.component.html',
  styleUrls: ['./skills-desktop.component.scss'],
})
export class SkillsDesktopComponent implements AfterViewInit, OnDestroy {

  /** Tracks visibility of each skill SVG (for animation triggers). */
  skillsInView: boolean[] = Array(11).fill(false);

  /** Tracks visibility of headline and info rows (text animations). */
  infoInView: boolean[] = [false, false, false, false];

  /** Indicates whether the main headline is currently visible. */
  titleInView = false;

  /** Tooltip state for the “Continually Learning” icon. */
  isTooltipOpen = false;

  /** Internal timeout reference for auto‑closing the tooltip. */
  private tooltipTimeout: ReturnType<typeof setTimeout> | null = null;

  /** Click handler reference used to remove the listener later. */
  private outsideClickHandler: ((evt: Event) => void) | null = null;

  // ────────────────────────────────────────────────
  // Template references
  // ────────────────────────────────────────────────
  @ViewChildren('skill1, skill2, skill3, skill4, skill5, skill6, skill7, skill8, skill9, skill10, skill11')
  private skillSvgs!: QueryList<ElementRef>;

  @ViewChild('titleRow', { static: false })
  private titleRow!: ElementRef;

  @ViewChildren('row1, row2, row3, row4')
  private infoRows!: QueryList<ElementRef>;

  constructor(private readonly translate: TranslateService) {}

  /**
   * Initializes IntersectionObservers for skill icons,
   * text blocks, and the headline once the view is ready.
   */
  ngAfterViewInit(): void {
    this.observeSkillIcons();
    this.observeTitle();
    this.observeInfoRows();
  }

  /** Clean up listeners and timers to avoid memory leaks. */
  ngOnDestroy(): void {
    this.closeTooltip();
  }

  // ────────────────────────────────────────────────
  // Intersection Observer logic
  // ────────────────────────────────────────────────

  /** Sets up observers for all skill SVGs. */
  private observeSkillIcons(): void {
    this.skillSvgs.forEach((svg, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => (this.skillsInView[i] = entry.isIntersecting),
        { threshold: 0.2 }
      );
      observer.observe(svg.nativeElement);
    });
  }

  /** Sets up observer for the headline. */
  private observeTitle(): void {
    if (!this.titleRow) return;

    const observer = new IntersectionObserver(
      ([entry]) => (this.titleInView = entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(this.titleRow.nativeElement);
  }

  /** Sets up observers for the info text rows. */
  private observeInfoRows(): void {
    this.infoRows.forEach((row, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => (this.infoInView[i] = entry.isIntersecting),
        { threshold: 0.2 }
      );
      observer.observe(row.nativeElement);
    });
  }

  // ────────────────────────────────────────────────
  // Tooltip logic
  // ────────────────────────────────────────────────

  /** Opens the tooltip manually. */
  openTooltip(): void {
    this.isTooltipOpen = true;
  }

  /** Toggles the tooltip on user interaction. */
  toggleTooltip(event: Event): void {
    event.stopPropagation();
    this.isTooltipOpen = !this.isTooltipOpen;
  }

  onTooltipIconClick(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if (this.isTooltipOpen) {
      this.closeTooltip();
      return;
    }

    this.openTooltipAndRegisterClose();
  }

  private openTooltipAndRegisterClose(): void {
    this.isTooltipOpen = true;
    this.addOutsideClickListener();
    this.setAutoCloseTimeout();
  }

  private addOutsideClickListener(): void {
    this.outsideClickHandler = (evt: Event) => {
      const target = evt.target as HTMLElement;
      if (
        !target.closest('.skills-grid__item--continually') &&
        !target.closest('.skills-tooltip')
      ) {
        this.closeTooltip();
      }
    };
    document.addEventListener('click', this.outsideClickHandler);
  }

  private setAutoCloseTimeout(): void {
    this.tooltipTimeout = setTimeout(() => {
      this.closeTooltip();
      this.focusEmptyGridItem();
    }, 2000);
  }

  private focusEmptyGridItem(): void {
    const emptyGridItem = document.querySelector(
      '.skills-grid__item--empty'
    ) as HTMLElement | null;
    emptyGridItem?.focus();
  }

  /** Closes the tooltip and removes all related listeners/timeouts. */
  closeTooltip(): void {
    this.isTooltipOpen = false;

    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
      this.tooltipTimeout = null;
    }

    if (this.outsideClickHandler) {
      document.removeEventListener('click', this.outsideClickHandler);
      this.outsideClickHandler = null;
    }
  }
}