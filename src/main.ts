/**
 * Entry point for Angular standalone bootstrap.
 * Boots AppComponent using provided appConfig.
 * Logs bootstrap errors to console.
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
