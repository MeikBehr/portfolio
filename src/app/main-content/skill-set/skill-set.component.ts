import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.scss'],
})


export class SkillSetComponent implements AfterViewInit {
  @ViewChild('tooltipBtn', { static: false }) tooltipBtn!: ElementRef;
  @ViewChildren('skill1, skill2, skill3, skill4, skill5, skill6, skill7, skill8, skill9, skill10, skill11') skillSvgs!: QueryList<ElementRef>;
  @ViewChildren('mobSkill1, mobSkill2, mobSkill3, mobSkill4, mobSkill5, mobSkill6, mobSkill7, mobSkill8, mobSkill9, mobSkill10, mobSkill11') mobSkillSvgs!: QueryList<ElementRef>;
  @ViewChild('titleRow', { static: false }) titleRow!: ElementRef;
  @ViewChildren('row1, row2, row3, row4') infoRows!: QueryList<ElementRef>;
  @ViewChild('titleMobileRow') titleMobileRow!: ElementRef;
  @ViewChildren('mobileRow1, mobileRow2, mobileRow3, mobileRow4') infoMobileRows!: QueryList<ElementRef>;
  infoInView = [false, false, false, false];
  infoMobileView = [false, false, false, false];
  titleInView = false;
  titleMobileInView = false;
  skillsInView = Array(11).fill(false);
  mobSkillsInView = Array(11).fill(false);



  constructor(private renderer: TranslateService) {}


  ngAfterViewInit() {
    this.skillSvgs.forEach((svg, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          this.skillsInView[i] = entry.isIntersecting;
        },
        { threshold: 0.2 }
      );
      observer.observe(svg.nativeElement);
    });

    this.mobSkillSvgs.forEach((svg, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => this.mobSkillsInView[i] = entry.isIntersecting,
        { threshold: 0.2 }
      );
      observer.observe(svg.nativeElement);
    });

    if (this.titleRow) {
      const obsTitle = new IntersectionObserver(
        ([entry]) => {this.titleInView = entry.isIntersecting;
        },
        { threshold: 0.2 }
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

    if (this.titleMobileRow) {
      const obsTitle = new IntersectionObserver(
        ([entry]) => {this.titleMobileInView = entry.isIntersecting;
        },
        { threshold: 0.2 }
      );
      obsTitle.observe(this.titleMobileRow.nativeElement);
    }

    this.infoMobileRows.forEach((row, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          this.infoMobileView[i] = entry.isIntersecting;
        },
        { threshold: 0.2 }
      );
      observer.observe(row.nativeElement);
    });    
    
  }

  isTooltipOpen = false;
  tooltipTimeout: any = null;
  private outsideClickHandler: any = null;
  isDesktop(): boolean {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }


  openTooltip() { this.isTooltipOpen = true; }

  toggleTooltip(event: Event) {
    event.stopPropagation();
    this.isTooltipOpen = !this.isTooltipOpen;
  }

  onTooltipIconClick(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

      if (this.isTooltipOpen) {
        this.closeTooltip();
        return;
      }

      this.isTooltipOpen = true;
      this.outsideClickHandler = (evt: Event) => {
        if (
          !(evt.target as HTMLElement).closest('.skills-grid__item--continually') &&
          !(evt.target as HTMLElement).closest('.skills-tooltip')
        ) {
          this.closeTooltip();
        }
      };
      document.addEventListener('click', this.outsideClickHandler);
      this.tooltipTimeout = setTimeout(() => {
        this.closeTooltip();
        const emptyGridItem = document.querySelector('.skills-grid__item--empty') as HTMLElement;
        if (emptyGridItem) {
          emptyGridItem.focus();
        }
      }, 2000);

      
    
  }

  closeTooltip() {
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
