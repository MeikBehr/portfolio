
import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  constructor(public translate: TranslateService) {}



}


/*
Legacy validation logic from JOIN project – for reference only)


"/**
 * Validates the password based on specified criteria and sets a custom validity message.
 */
/*
function validatePassword() {
    const passwordElement = document.getElementById('password');
    const password = passwordElement.value;
    const requirements = [
        { regex: /(?=.*[A-Z])/, message: 'Mindestens ein Großbuchstabe.\n' },
        { regex: /(?=.*[a-z])/, message: 'Mindestens ein Kleinbuchstabe.\n' },
        { regex: /(?=.*\d)/, message: 'Mindestens eine Zahl.\n' },
        { regex: /(?=.*[@#$!%*?&])/, message: 'Mindestens ein Sonderzeichen (@$!%*?&).\n' },
        { test: password.length >= 8, message: 'Mindestens 8 Zeichen lang.\n' }
    ];
    const errorMessage = requirements.reduce((msg, req) => 
        msg + ((req.regex && !req.regex.test(password)) || (req.test === false) ? req.message : ''), '');
    passwordElement.setCustomValidity(errorMessage);
}
*/


/**
 * Validates the email address based on specified criteria and sets a custom validity message.
 */
/*
function validateEmail() {
    const emailElement = document.getElementById('email');
    const email = emailElement.value;
    const validations = [
        { condition: email.indexOf('@') < 1, message: 'Die E-Mail-Adresse muss ein @-Symbol enthalten.\n' },
        { condition: email.lastIndexOf('.') <= email.indexOf('@') + 1, message: 'Die E-Mail-Adresse muss einen Punkt (.) nach dem @-Symbol enthalten.\n' },
        { condition: email.lastIndexOf('.') === email.length - 1, message: 'Die E-Mail-Adresse darf nicht mit einem Punkt (.) enden.\n' },
        { condition: !/^[a-zA-Z0-9._%+-]+@/.test(email), message: 'Der lokale Teil der E-Mail-Adresse enthält ungültige Zeichen.\n' },
        { condition: !/[a-zA-Z]{2,}$/.test(email.split('.').pop()), message: 'Die Top-Level-Domain muss mindestens zwei Buchstaben lang sein.\n' }
    ];
    const errorMessage = validations.reduce((msg, val) => val.condition ? msg + val.message : msg, '');
    emailElement.setCustomValidity(errorMessage);
}"
*/