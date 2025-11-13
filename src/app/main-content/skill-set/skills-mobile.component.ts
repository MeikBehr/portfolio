import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

@Component({
  selector: 'app-skills-mobile',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './skills-mobile.component.html',
  styleUrls: ['./skills-mobile.component.scss'],
})
export class SkillsMobileComponent implements AfterViewInit {
  // === ViewChild/ViewChildren refs ===
  @ViewChild('titleMobileRow') titleMobileRow!: ElementRef;
  @ViewChildren('mobSkill1, mobSkill2, mobSkill3, mobSkill4, mobSkill5, mobSkill6, mobSkill7, mobSkill8, mobSkill9, mobSkill10, mobSkill11') mobSkillSvgs!: QueryList<ElementRef>;
  @ViewChildren('mobSkill3_1, mobSkill3_2, mobSkill3_3, mobSkill3_4, mobSkill3_5, mobSkill3_6, mobSkill3_7, mobSkill3_8, mobSkill3_9, mobSkill3_10, mobSkill3_11') mobSkill3Svgs!: QueryList<ElementRef>;
  @ViewChildren('mobileRow1, mobileRow2, mobileRow3, mobileRow4') infoMobileRows!: QueryList<ElementRef>;

  // === Animation/State Arrays ===
  infoMobileView = [false, false, false, false];
  titleMobileInView = false;
  mobSkillsInView = Array(11).fill(false);
  mobSkillsInView3 = Array(11).fill(false);

  // === Tooltip State ===
  isTooltipOpen = false;
  private tooltipTimeout: ReturnType<typeof setTimeout> | null = null;
  private outsideClickHandler: ((evt: Event) => void) | null = null;

  constructor(private translate: TranslateService) {}

  /**
   * After view init: set up intersection observers for skill icons and content rows.
   */
  ngAfterViewInit(): void {
    this.observeSkillSvgs(this.mobSkillSvgs, this.mobSkillsInView);
    this.observeSkillSvgs(this.mobSkill3Svgs, this.mobSkillsInView3);
    this.observeTitleRow();
    this.observeInfoRows();
  }

  /**
   * Sets up intersection observers for a QueryList of SVG elements and updates the target array.
   * @param svgs QueryList of ElementRef for skill icons
   * @param inViewArr Boolean array reflecting intersection state
   */
  private observeSkillSvgs(svgs: QueryList<ElementRef>, inViewArr: boolean[]): void {
    svgs.forEach((svg, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => inViewArr[i] = entry.isIntersecting,
        { threshold: 0.2 }
      );
      observer.observe(svg.nativeElement);
    });
  }

  /**
   * Sets up an intersection observer for the title row.
   */
  private observeTitleRow(): void {
    if (this.titleMobileRow) {
      const observer = new IntersectionObserver(
        ([entry]) => this.titleMobileInView = entry.isIntersecting,
        { threshold: 0.2 }
      );
      observer.observe(this.titleMobileRow.nativeElement);
    }
  }

  /**
   * Sets up intersection observers for the info rows below the grid.
   */
  private observeInfoRows(): void {
    this.infoMobileRows.forEach((row, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => this.infoMobileView[i] = entry.isIntersecting,
        { threshold: 0.2 }
      );
      observer.observe(row.nativeElement);
    });
  }

  /**
   * Opens the tooltip popover.
   */
  openTooltip(): void {
    this.isTooltipOpen = true;
  }

  /**
   * Toggles the tooltip popover (used for click/tap).
   * @param event Event
   */
  toggleTooltip(event: Event): void {
    event.stopPropagation();
    this.isTooltipOpen = !this.isTooltipOpen;
  }

  /**
   * Handles icon click for tooltip: opens and sets up close logic (outside click, timeout, focus shift).
   * @param event MouseEvent
   */
  onTooltipIconClick(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if (this.isTooltipOpen) {
      this.closeTooltip();
      return;
    }
    this.openTooltipAndRegisterClose();
  }

  /**
   * Opens tooltip and sets up outside click listener and auto-close timeout.
   */
  private openTooltipAndRegisterClose(): void {
    this.isTooltipOpen = true;
    this.addOutsideClickListener();
    this.setAutoCloseTimeout();
  }

  /**
   * Registers a one-time outside click handler for closing the tooltip.
   */
  private addOutsideClickListener(): void {
    this.outsideClickHandler = (evt: Event) => {
      const target = evt.target as HTMLElement;
      if (
        !target.closest('.skills-grid__item--continually') &&
        !target.closest('.skills-tooltip')
      ) {
        this.closeTooltip();
      }
    };
    document.addEventListener('click', this.outsideClickHandler);
  }

  /**
   * Sets up an auto-close timeout for the tooltip.
   */
  private setAutoCloseTimeout(): void {
    this.tooltipTimeout = setTimeout(() => {
      this.closeTooltip();
      this.focusEmptyGridItem();
    }, 2000);
  }

  /**
   * Shifts focus to the (hidden) empty grid item after tooltip closes.
   */
  private focusEmptyGridItem(): void {
    const emptyGridItem = document.querySelector('.skills-grid__item--empty') as HTMLElement | null;
    if (emptyGridItem) {
      emptyGridItem.focus();
    }
  }

  /**
   * Closes the tooltip, clears listeners and timeouts.
   */
  closeTooltip(): void {
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