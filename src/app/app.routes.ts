import { Routes } from '@angular/router';
import { AtfComponent } from './main-content/atf/atf.component';
import { AboutMeComponent } from './main-content/about-me/about-me.component';
import { ContactComponent } from './main-content/contact/contact.component';
import { ProjectsComponent } from './main-content/projects/projects.component';
import { SkillSetComponent } from './main-content/skill-set/skill-set.component';
import { ImprintComponent } from './main-content/imprint/imprint.component';
import { PrivacyPolicyComponent } from './main-content/privacy-policy/privacy-policy.component';


export const routes: Routes = [
    { path: '', component: AtfComponent },
    { path: 'atf', component: AtfComponent},
    { path: 'about-me', component: AboutMeComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'projects', component: ProjectsComponent},
    { path: 'skill-set', component: SkillSetComponent},
    { path: 'imprint', component: ImprintComponent},
    { path: 'privacy-policy', component: PrivacyPolicyComponent}
];
