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
  
  bgInView = false;
  titleInView = false;
  descInView = false;
  infoInView = [false, false, false];

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
          // if (entry.isIntersecting) {
          //   this.titleInView = true;
          //   obsTitle.disconnect();
          // }
        },
        { threshold: 0.25 
        }
      );
    obsTitle.observe(this.titleRow.nativeElement);
    }

    if (this.descRow) {
      const obsDesc = new IntersectionObserver(
        ([entry]) => {
          this.descInView = entry.isIntersecting;
          // if (entry.isIntersecting) {
          //   this.descInView = true;
          //   obsDesc.disconnect();
          // }
        },
        { threshold: 0.25 }
      );
      obsDesc.observe(this.descRow.nativeElement);
    }

    this.infoRows.forEach((row, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          this.infoInView[i] = entry.isIntersecting;
          // if (entry.isIntersecting) {
          //   setTimeout(() => {
          //     this.infoInView[i] = true;
          //     observer.disconnect();
          //   }, i * 120);
          // }
        },
        { threshold: 0.2 }
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
