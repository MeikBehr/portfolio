import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {

  constructor(public translate: TranslateService) {}

  scrollToAboutMe(event?: Event): void {
    event?.preventDefault();
    setTimeout(() => {
      document.getElementById('aboutMe')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }

}
