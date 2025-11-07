import { Component } from '@angular/core';
import { AtfComponent } from './atf/atf.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillSetComponent } from './skill-set/skill-set.component';
import { ActivatedRoute } from '@angular/router';

/**
 * MainContentComponent renders the main sections of the portfolio as standalone components.
 * 
 * - Handles anchor (fragment) navigation and ensures smooth scrolling to the target section.
 * - Each section is provided with an accessible ID for WCAG-compliant anchor linking.
 */
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

  /**
   * Injects Angular's ActivatedRoute to access the fragment for anchor navigation.
   * @param route The current ActivatedRoute, used for reading the URL fragment.
   */
  constructor(private route: ActivatedRoute) {}

  /**
   * On init, subscribes to the URL fragment.
   * If a fragment is present, scrolls smoothly to the corresponding section (by id).
   */
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
