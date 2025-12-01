import { Component, AfterViewInit, ViewChildren, ViewChild, ElementRef, QueryList } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

/**
 * AboutMeComponent displays the "About Me" section
 * with animated reveal effects using IntersectionObserver.
 * 
 * Accessibility and Clean Code best practices applied.
 */
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})

export class AboutMeComponent implements AfterViewInit {

  @ViewChild('titleRow') titleRow!: ElementRef;
  @ViewChild('descRow') descRow!: ElementRef;
  @ViewChildren('row1, row2, row3') infoRows!: QueryList<ElementRef>;
  @ViewChild('bgRow') bgRow!: ElementRef;

  /** Controls background blob reveal animation. */
  bgInView = true;
  /** Controls headline reveal animation. */
  titleInView = true;
  /** Controls description reveal animation. */
  descInView = true;
  /** Controls info row animations. */
  infoInView = [true, true, true];

  /**
   * Injects the translation service.
   * @param translate Used for language switching.
   */
  constructor(public translate: TranslateService) {}

  /**
   * Helper to attach IntersectionObserver to any element.
   * @param ref ElementRef to observe
   * @param threshold Intersection threshold
   * @param callback Callback when element enters/leaves view
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

  /**
   * Sets up intersection observers to trigger animations
   * when elements come into the viewport.
   */
  ngAfterViewInit(): void {
    this.setupObserver(this.bgRow, 0.25, (inView) => this.bgInView = inView);
    this.setupObserver(this.titleRow, 0.25, (inView) => this.titleInView = inView);
    this.setupObserver(this.descRow, 0.25, (inView) => this.descInView = inView);
    this.infoRows.forEach((row, i) =>
      this.setupObserver(row, 0.25, (inView) => this.infoInView[i] = inView)
    );
  }

  /**
   * Smooth scrolls to the About Me section.
   * @param event Optional event to prevent default anchor behavior.
   */
  scrollToAboutMe(event?: Event): void {
    event?.preventDefault();
    setTimeout(() => {
      document.getElementById('aboutMe')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }
}