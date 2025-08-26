import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.scss'],
})


export class SkillSetComponent {
  @ViewChild('tooltipBtn', { static: false }) tooltipBtn!: ElementRef;

  constructor(private renderer: TranslateService) {}

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
