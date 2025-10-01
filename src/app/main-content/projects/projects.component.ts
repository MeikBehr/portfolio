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
    @ViewChildren('row1, row2') infoRows!: QueryList<ElementRef>;
    titleInView = true;
    infoInView = [true];    


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

    this.infoRows.forEach((row, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          this.infoInView[i] = entry.isIntersecting;
        },
        { threshold: 0.2 }
      );
      observer.observe(row.nativeElement);
    });
  }


}
