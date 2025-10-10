import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';



/**
 * Legal notice (imprint) page component.
 * Handles static legal info and translations.
 */
@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})

export class ImprintComponent {
  /**
  * Provides translation features to the template.
  * @param translate Angular ngx-translate service
  */
  constructor(public translate: TranslateService) {}
}