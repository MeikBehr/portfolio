import { Component, AfterViewInit, ViewChildren, ViewChild, ElementRef, QueryList } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

/**
 * ProjectsComponent displays the portfolio/projects section with animated reveal effects.
 * Uses IntersectionObserver for scroll-triggered animations.
 * 
 * Accessibility (WCAG): 
 * - All major sections and cards are accessible via keyboard (tab) and screenreader.
 * - Eloquent aria-labels are applied on links for unambiguous navigation.
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit {

  /** Reference to desktop title headline. */
  @ViewChild('titleRow') titleRow!: ElementRef;
  /** Reference to desktop variety subheadline. */
  @ViewChild('variety') variety!: ElementRef;
  /** Reference to mobile variety subheadline. */
  @ViewChild('varietyMobile') varietyMobile!: ElementRef;
  /** Reference to mobile header. */
  @ViewChild('headerMobile') headerMobile!: ElementRef;
  /** References to all project card sections. */
  @ViewChildren('card1, card2, card3') cards!: QueryList<ElementRef>;

  /** Controls desktop title animation. */
  titleInView = true;
  /** Controls desktop variety animation. */
  varietyInView = true;
  /** Controls mobile variety animation. */
  varietyMobileInView = true;
  /** Controls mobile header animation. */
  headerMobileInView = true;
  /** Controls reveal animations for each project card. */
  cardsInView = [true, true, true];

  /**
   * Injects the translation service for dynamic i18n support.
   */
  constructor(public translate: TranslateService) {}

  /**
   * Initializes all IntersectionObservers for scroll-triggered animations
   * on headlines and project cards (desktop and mobile).
   */
  ngAfterViewInit(): void {
    this.setupObserver(this.titleRow, 0.20, (inView) => this.titleInView = inView);
    this.setupObserver(this.variety, 0.20, (inView) => this.varietyInView = inView);
    this.setupObserver(this.headerMobile, 0.05, (inView) => this.headerMobileInView = inView);
    this.setupObserver(this.varietyMobile, 0.05, (inView) => this.varietyMobileInView = inView);

    this.cards.forEach((card, i) =>
      this.setupObserver(card, 0.025, (inView) => this.cardsInView[i] = inView)
    );
  }

  /**
   * Helper to attach an IntersectionObserver to any element.
   * @param ref ElementRef to observe.
   * @param threshold Intersection threshold (0–1).
   * @param callback Function to call with inView state.
   */
  private setupObserver(ref: ElementRef | undefined, threshold: number, callback: (inView: boolean) => void): void {
    if (ref) {
      const observer = new IntersectionObserver(
        ([entry]) => callback(entry.isIntersecting),
        { threshold }
      );
      observer.observe(ref.nativeElement);
    }
  }
}