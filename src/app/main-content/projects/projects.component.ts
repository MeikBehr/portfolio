import { Component } from '@angular/core';
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

  scrollToAboutMe(event?: Event): void {
    event?.preventDefault();
    setTimeout(() => {
      document.getElementById('aboutMe')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

}
