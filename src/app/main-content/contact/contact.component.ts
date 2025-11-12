import {
  Component,
  ViewChildren,
  ViewChild,
  ElementRef,
  QueryList,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { PrivacyPolicyComponent } from '../../legal/privacy-policy/privacy-policy.component';

/**
 * ContactComponent handles the contact form logic,
 * including validation, accessibility feedback, 
 * and intersection-based animations.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, PrivacyPolicyComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {

  constructor(public translate: TranslateService) {}

  /** Template references */
  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('contactForm') contactForm!: NgForm;
  @ViewChild('titleRow') titleRow!: ElementRef;
  @ViewChildren('row1, row2, row3') infoRows!: QueryList<ElementRef>;
  @ViewChildren('form1, form2, form3, form4, form5') formInput!: QueryList<ElementRef>;

  /** Form data */
  contactName = '';
  contactMail = '';
  contactMessage = '';
  privacyChecked = false;

  /** Validation flags */
  nameValid: boolean | null = null;
  mailValid: boolean | null = null;
  msgValid: boolean | null = null;
  inputFocused = false;
  mailInputFocused = false;
  msgInputFocused = false;

  /** Error keys for translation */
  nameErrorKey: string | null = null;
  mailErrorKey: string | null = null;
  msgErrorKey: string | null = null;

  /** Privacy and feedback states */
  privacyTouched = false;
  privacyErrorVisible = false;
  private privacyErrorTimeout: any;
  showSuccessOverlay = false;
  showPrivacyModal = false;

  /** Animation states */
  titleInView = true;
  infoInView = [true, true, true];
  formInView = [true, true, true, true, true];

  /** Computed form validity */
  get allFieldsValid(): boolean {
    return !!(this.nameValid && this.mailValid && this.msgValid);
  }

  // ---------------------- VALIDATION ----------------------

  /** Validates name input */
  validateName(): void {
    if (!this.contactName?.trim()) {
      this.setNameError('contact.contact_error_name_required');
      return;
    }
    const pattern = /^[A-Za-zÄÖÜäöüß\s-]{2,30}$/;
    this.setValidationResult('name', pattern.test(this.contactName.trim()), 'contact.contact_error_name_pattern');
  }

  /** Validates mail input */
  validateMail(): void {
    if (!this.contactMail?.trim()) {
      this.setMailError('contact.contact_error_mail_required');
      return;
    }
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    this.setValidationResult('mail', pattern.test(this.contactMail.trim()), 'contact.contact_error_mail_pattern');
  }

  /** Validates message input */
  validateMessage(): void {
    if (!this.contactMessage?.trim()) {
      this.setMsgError('contact.contact_error_msg_required');
      return;
    }
    const pattern = /^[A-Za-zÄÖÜäöüß0-9\s.,;:!?@()'"-]{5,1000}$/u;
    this.setValidationResult('msg', pattern.test(this.contactMessage.trim()), 'contact.contact_error_msg_pattern');
  }

  // ---------------------- HELPER METHODS ----------------------

  /** Generic handler for validation outcomes */
  private setValidationResult(field: 'name' | 'mail' | 'msg', valid: boolean, errorKey: string): void {
    const stateKey = `${field}Valid` as keyof this;
    const errorField = `${field}ErrorKey` as keyof this;

    if (!valid) {
      this[errorField] = errorKey as any;
      this[stateKey] = false as any;
      return;
    }
    this[errorField] = null as any;
    this[stateKey] = true as any;
  }

  private setNameError(key: string): void { this.nameErrorKey = key; this.nameValid = false; }
  private setMailError(key: string): void { this.mailErrorKey = key; this.mailValid = false; }
  private setMsgError(key: string): void { this.msgErrorKey = key; this.msgValid = false; }

  // ---------------------- FORM HANDLING ----------------------

  /** Main submit handler */
  submitContactForm(): void {
    if (!this.allFieldsValid || !this.privacyChecked) {
      this.privacyTouched = true;
      return;
    }
    this.triggerSuccessOverlay();
  }

  /** Clears form after submit */
  private clearForm(): void {
    this.contactForm?.resetForm();
  }

  /** Shows success overlay briefly */
  private triggerSuccessOverlay(): void {
    this.showSuccessOverlay = true;
    setTimeout(() => {
      this.showSuccessOverlay = false;
      this.clearForm();
    }, 1800);
  }

  /** Handles the submit button click with privacy logic */
  onButtonClick(): void {
    if (this.allFieldsValid && !this.privacyChecked) {
      this.showPrivacyError();
      return;
    }
    if (this.allFieldsValid && this.privacyChecked) this.submitContactForm();
  }

  /** Displays a temporary privacy error */
  private showPrivacyError(): void {
    this.privacyTouched = true;
    this.privacyErrorVisible = true;
    clearTimeout(this.privacyErrorTimeout);
    this.privacyErrorTimeout = setTimeout(() => {
      this.privacyErrorVisible = false;
    }, 3000);
  }

  // ---------------------- PRIVACY MODAL ----------------------

  /** Opens the privacy modal and prevents background scroll */
  openPrivacyModal(): void {
    this.showPrivacyModal = true;
    document.documentElement.classList.add('no-scroll');
  }

  /** Closes the privacy modal and restores scroll */
  closePrivacyModal(): void {
    this.showPrivacyModal = false;
    document.documentElement.classList.remove('no-scroll');
  }

  // ---------------------- INTERSECTION OBSERVERS ----------------------

  /** Initializes intersection observers for animations */
  ngAfterViewInit(): void {
    this.observeElement(this.titleRow, (inView) => (this.titleInView = inView));
    this.infoRows.forEach((row, i) =>
      this.observeElement(row, (inView) => (this.infoInView[i] = inView))
    );
    this.formInput.forEach((input, i) =>
      this.observeElement(input, (inView) => (this.formInView[i] = inView))
    );
  }

  /** Generic IntersectionObserver setup */
  private observeElement(ref: ElementRef | undefined, callback: (inView: boolean) => void): void {
    if (!ref) return;
    const observer = new IntersectionObserver(([entry]) => callback(entry.isIntersecting), {
      threshold: 0.1
    });
    observer.observe(ref.nativeElement);
  }
}