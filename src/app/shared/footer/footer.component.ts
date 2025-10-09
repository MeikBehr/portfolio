import { Component, ViewChild, ElementRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  /** The current year, for copyright info */
  currentYear: number = new Date().getFullYear();

  /** Reference to the animated SVG group */
  @ViewChild('nameSVG', { static: false }) nameSVG!: ElementRef<SVGGElement>;

  /** State flag for triggering SVG animation */
  nameInView = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * Handles scrolling to fragment anchors after navigation.
   */
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const fragment = this.route.snapshot.fragment;
      if (fragment) {
        setTimeout(() => {
          document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      }
    });
  }

  /**
   * Navigates to a specific route.
   * @param route Route path (relative, e.g. 'impressum' or 'privacy')
   */
  navigate(route: string): void {
    this.router.navigate([route]);
  }

  /**
   * Navigates to a section anchor within a route, with smooth scroll.
   * @param targetRoute Route path
   * @param targetAnchor Element ID of target section
   * @param event Mouse or keyboard event
   */
  navigateToSection(targetRoute: string, targetAnchor: string, event: Event): void {
    event.preventDefault();
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl === `/${targetRoute}` || currentUrl === `/${targetRoute}/`) {
      this.scrollTo(targetAnchor);
    } else {
      this.router.navigate([targetRoute], { fragment: targetAnchor });
    }
  }

  /**
   * Smoothly scrolls to the given anchor ID.
   * @param targetId Element ID to scroll to
   */
  scrollTo(targetId: string): void {
    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

  /**
   * Sets up IntersectionObserver to trigger SVG animation when in view.
   */
  ngAfterViewInit(): void {
    if (this.nameSVG) {
      const obsTitle = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.nameInView = false;
            setTimeout(() => {
              this.nameInView = true;
            }, 100);
            setTimeout(() => {
              this.nameInView = false;
            }, 4000);
          } else {
            this.nameInView = false;
          }
        },
        { threshold: 0.1 }
      );
      obsTitle.observe(this.nameSVG.nativeElement);
    }
  }
}