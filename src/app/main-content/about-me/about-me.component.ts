import {Component,AfterViewInit,ViewChildren,ViewChild,ElementRef,QueryList} from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

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
  
  bgInView = true;
  titleInView = true;
  descInView = true;
  infoInView = [true, true, true];

  constructor(public translate: TranslateService) {}


  ngAfterViewInit() {
    if (this.bgRow) {
      const obsBg = new IntersectionObserver(
        ([entry]) => {
          this.bgInView = entry.isIntersecting;
        },
        { threshold: 0.15 }
      );
      obsBg.observe(this.bgRow.nativeElement);
    }
    if (this.titleRow) {
      const obsTitle = new IntersectionObserver(
        ([entry]) => {
          this.titleInView = entry.isIntersecting;
        },
        { threshold: 0.20 
        }
      );
    obsTitle.observe(this.titleRow.nativeElement);
    }

    if (this.descRow) {
      const obsDesc = new IntersectionObserver(
        ([entry]) => {
          this.descInView = entry.isIntersecting;
        },
        { threshold: 0.20 }
      );
      obsDesc.observe(this.descRow.nativeElement);
    }

    this.infoRows.forEach((row, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          this.infoInView[i] = entry.isIntersecting;
        },
        { threshold: 0.20 }
      );
      observer.observe(row.nativeElement);
    });
  }

  scrollToAboutMe(event?: Event): void {
    event?.preventDefault();
    setTimeout(() => {
      document.getElementById('aboutMe')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }
}
