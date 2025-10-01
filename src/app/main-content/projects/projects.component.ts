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
  @ViewChildren('card1, card2, card3') cards!: QueryList<ElementRef>;
  titleInView = true;
  varietyInView = true;
  cardsInView = [true,true,true];


  ngAfterViewInit() {
    if (this.titleRow) {
      const obsTitle = new IntersectionObserver(
        ([entry]) => {
          this.titleInView = entry.isIntersecting;
        },
        { threshold: 0.25 
        }
      );
    obsTitle.observe(this.titleRow.nativeElement);
    }
    if (this.variety) {
      const obsTitle = new IntersectionObserver(
        ([entry]) => {
          this.varietyInView = entry.isIntersecting;
        },
        { threshold: 0.25 
        }
      );
    obsTitle.observe(this.titleRow.nativeElement);
    }


    this.cards.forEach((card, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          this.cardsInView[i] = entry.isIntersecting;
        },
        { threshold: 0.2 }
      );
      observer.observe(card.nativeElement);
    });
  }


}
