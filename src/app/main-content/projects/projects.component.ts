import {Component, ViewChildren,ViewChild,ElementRef,QueryList} from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  constructor(public translate: TranslateService) {}

  @ViewChild('titleRow') titleRow!: ElementRef;
  @ViewChild('variety') variety!: ElementRef;
  @ViewChild('varietyMobile') varietyMobile!: ElementRef;
  @ViewChild('headerMobile') headerMobile!: ElementRef;
  @ViewChildren('card1, card2, card3') cards!: QueryList<ElementRef>;
  titleInView = true;
  varietyInView = true;
  varietyMobileInView = true;
  headerMobileInView = true;
  cardsInView = [true,true,true];


  ngAfterViewInit() {
    if (this.titleRow) {
      const obsTitle = new IntersectionObserver(
        ([entry]) => {
          this.titleInView = entry.isIntersecting;
        },
        { threshold: 0.20}
      );
    obsTitle.observe(this.titleRow.nativeElement);
    }

    if (this.variety) {
      const obsTitle = new IntersectionObserver(
        ([entry]) => {
          this.varietyInView = entry.isIntersecting;
        },
        { threshold: 0.20 }
      );
    obsTitle.observe(this.variety.nativeElement);
    }

    if (this.headerMobile) {
      const obsTitle = new IntersectionObserver(
        ([entry]) => {
          this.headerMobileInView = entry.isIntersecting;
        },
        { threshold: 0.05 }
      );
    obsTitle.observe(this.headerMobile.nativeElement);
    }

    if (this.varietyMobile) {
      const obsTitle = new IntersectionObserver(
        ([entry]) => {
          this.varietyMobileInView = entry.isIntersecting;
        },
        { threshold: 0.05 }
      );
    obsTitle.observe(this.varietyMobile.nativeElement);
    }


    this.cards.forEach((card, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          this.cardsInView[i] = entry.isIntersecting;
        },
        { threshold: 0.025 }
      );
      observer.observe(card.nativeElement);
    });
  }



}
