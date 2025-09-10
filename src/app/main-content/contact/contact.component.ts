
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



    contactName: string = '';
    nameErrorKey: string | null = null;
    nameValid: boolean | null = null;
    inputFocused: boolean = false;

    validateName() {
    if (!this.contactName || this.contactName.trim() === '') {
        this.nameErrorKey = 'contact.contact_error_name_required';
        this.nameValid = false;
        return;
    }

    const pattern = /^[A-Za-zÄÖÜäöüß\s-]{2,30}$/;
    if (!pattern.test(this.contactName.trim())) {
        this.nameErrorKey = 'contact.contact_error_name_pattern';
        this.nameValid = false;
        return;
    }

    this.nameErrorKey = null;
    this.nameValid = true;
    }


    contactMail: string = '';
    mailErrorKey: string | null = null;
    mailValid: boolean | null = null;
    mailInputFocused: boolean = false;

    validateMail() {
    if (!this.contactMail || this.contactMail.trim() === '') {
        this.mailErrorKey = 'contact.contact_error_mail_required';
        this.mailValid = false;
        return;
    }

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!pattern.test(this.contactMail.trim())) {
        this.mailErrorKey = 'contact.contact_error_mail_pattern';
        this.mailValid = false;
        return;
    }

    this.mailErrorKey = null;
    this.mailValid = true;
    }




    contactMessage: string = '';
    msgErrorKey: string | null = null;
    msgValid: boolean | null = null;
    msgInputFocused: boolean = false;

    validateMessage() {
    if (!this.contactMessage || this.contactMessage.trim() === '') {
        this.msgErrorKey = 'contact.contact_error_msg_required';
        this.msgValid = false;
        return;
    }

    const pattern = /^[A-Za-zÄÖÜäöüß0-9\s.,;:!?@()'"-]{5,1000}$/u;
    if (!pattern.test(this.contactMessage.trim())) {
        this.msgErrorKey = 'contact.contact_error_msg_pattern';
        this.msgValid = false;
        return;
    }

    this.msgErrorKey = null;
    this.msgValid = true;
    }

    privacyChecked: boolean = false;
    privacyTouched: boolean = false;

    get allFieldsValid() {
     return this.nameValid && this.mailValid && this.msgValid;
    }

    submitContactForm() {
        if (!this.allFieldsValid || !this.privacyChecked) {
            this.privacyTouched = true;
            return;
         }
         console.log('SENDEN!');
    }



    privacyErrorVisible: boolean = false;
    private privacyErrorTimeout: any;

    onButtonClick() {
        if (this.allFieldsValid && !this.privacyChecked) {
            this.privacyTouched = true;
            this.privacyErrorVisible = true;
            clearTimeout(this.privacyErrorTimeout);
            this.privacyErrorTimeout = setTimeout(() => {
            this.privacyErrorVisible = false;
            }, 3000);
            return;
        }

        if (this.allFieldsValid && this.privacyChecked) {
            this.submitContactForm();
        }
    }
}


