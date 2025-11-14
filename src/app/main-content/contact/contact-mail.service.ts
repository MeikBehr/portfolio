import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

/**
 * Defines the expected response format from the PHP mail backend.
 */
export interface MailResponse {
  success: boolean;
}

/**
 * Service responsible for sending contact form data to the PHP backend.
 * Uses JSON via POST and returns a typed observable.
 */
@Injectable({ providedIn: 'root' })
export class ContactMailService {

  /** Endpoint to the PHP backend mail handler */
  private readonly endpoint = '/php/sendMail.php';

  constructor(private http: HttpClient) {}

  /**
   * Sends the contact form data to the backend.
   *
   * @param data - Contact form payload containing name, email, message, and optional honeypot.
   * @returns Observable<MailResponse> - Emits backend success state.
   */
  sendMail(data: {
    name: string;
    email: string;
    message: string;
    website?: string;
  }): Observable<MailResponse> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<MailResponse>(this.endpoint, data, { headers }).pipe(
      catchError((error) => {
        // Pass error to the component but keep service clean
        return throwError(() => error);
      })
    );
  }
}
