import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-atf',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './atf.component.html',
  styleUrls: ['./atf.component.scss']
})
export class AtfComponent {
  scrollTo(targetId: string, event: Event){
    event.preventDefault();
    document.getElementById(targetId)
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}
