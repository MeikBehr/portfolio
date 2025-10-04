import {Component, ViewChildren,ViewChild,ElementRef,QueryList} from '@angular/core';
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
  currentYear: number = new Date().getFullYear();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
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

  navigate(route: string) {
    this.router.navigate([route]);
  }

  navigateToSection(targetRoute: string, targetAnchor: string, event: Event) {
    event.preventDefault();
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl === `/${targetRoute}` || currentUrl === `/${targetRoute}/`) {
      this.scrollTo(targetAnchor, event);
    } else {
      this.router.navigate([targetRoute], { fragment: targetAnchor });
    }
  }

  scrollTo(targetId: string, event: Event): void {
    event.preventDefault();
    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }


  @ViewChild('nameSVG', { static: false }) nameSVG!: ElementRef<SVGGElement>;
  nameInView = false;

  ngAfterViewInit() {
    if (this.nameSVG) {
      const obsTitle = new IntersectionObserver(
        ([entry]) => {
          this.nameInView = entry.isIntersecting;
        },
        { threshold: 0.1 }
      );
      obsTitle.observe(this.nameSVG.nativeElement);
      
    }
  }




}
