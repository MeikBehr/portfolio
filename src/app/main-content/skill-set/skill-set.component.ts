import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsDesktopComponent } from './skills-desktop.component';
import { SkillsMobileComponent } from './skills-mobile.component';


@Component({
  selector: 'app-skill-set',
  standalone: true,
  imports: [CommonModule, SkillsDesktopComponent, SkillsMobileComponent],
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.scss'],
})
export class SkillSetComponent {
  isDesktop = window.innerWidth > 950;

  constructor(private cdr: ChangeDetectorRef) {
    window.addEventListener('resize', this.checkIsDesktop.bind(this));
  }

  checkIsDesktop() {
    this.isDesktop = window.innerWidth > 950;
    this.cdr.detectChanges();
  }
}
