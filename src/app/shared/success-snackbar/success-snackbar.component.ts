import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-snackbar',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './success-snackbar.component.html',
  styleUrl: './success-snackbar.component.scss'
})

export class SuccessSnackbarComponent {

  constructor(public translate: TranslateService) {}


}
