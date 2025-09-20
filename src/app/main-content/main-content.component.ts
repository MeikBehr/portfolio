import { Component } from '@angular/core';
import { AtfComponent } from './atf/atf.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillSetComponent } from './skill-set/skill-set.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    AtfComponent,
    AboutMeComponent,
    ContactComponent,
    ProjectsComponent,
    SkillSetComponent,
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})

export class MainContentComponent {

  constructor(private route: ActivatedRoute) {}
   
  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 50);
      }
    });
    }
}
