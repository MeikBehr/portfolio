import { Component, ViewChildren, ViewChild, ElementRef, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { PrivacyPolicyComponent } from '../../legal/privacy-policy/privacy-policy.component';
import { ContactMailService } from './contact-mail.service';
import { Router, RouterModule } from '@angular/router';

/**
 * The ContactComponent handles the logic for the contact form,
 * including validation, accessibility feedback, intersection-based animations,
 * and secure submission to the PHP backend.
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, PrivacyPolicyComponent, RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit {
  constructor(
    public translate: TranslateService,
    private contactMailService: ContactMailService,
    private router: Router
  ) {}

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
  nameTouched = false;
  mailTouched = false;
  msgTouched = false;

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
  private nameErrorTimeout: any;
  private mailErrorTimeout: any;
  private msgErrorTimeout: any;

  /** Animation states */
  titleInView = true;
  infoInView = [true, true, true];
  formInView = [true, true, true, true, true];

  /** Submit handler states */
  sending = false;
  sendError = '';

  /**
   * Returns true if all required fields are valid.
   */
  get allFieldsValid(): boolean {
    return !!(this.nameValid && this.mailValid && this.msgValid);
  }

  /**
   * Scrolls to the given section (by fragment or in-page anchor).
   * @param targetId Section ID or fragment.
   * @param event Mouse/keyboard event.
   */
  navigateToSection(targetId: string, event: Event): void {
    event.preventDefault();
    const currentUrl = this.router.url.split('#')[0];
    if (currentUrl === '/' || currentUrl === '/index.html') {
      this.scrollTo(targetId);
    } else {
      this.router.navigate(['/'], { fragment: targetId });
    }
  }

  /**
   * Scrolls smoothly to the given target section by ID.
   * @param targetId Section anchor ID.
   */
  scrollTo(targetId: string): void {
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }  

  // ---------------------- VALIDATION ----------------------

  /**
   * Validates the name input field and sets appropriate error messages.
   */
  validateName(): void {
    const value = this.contactName?.trim() || '';
    if (!value) {
      this.setTemporaryNameError('contact.contact_error_name_required');
      return;
    }
    const pattern = /^[A-Za-zÄÖÜäöüß\s-]{2,30}$/;
    this.setValidationResult(
      'name',
      pattern.test(value),
      'contact.contact_error_name_pattern'
    );
  }

  /**
   * Validates the email input field and sets appropriate error messages.
   */
  validateMail(): void {
    const value = this.contactMail?.trim() || '';
    if (!value) {
      this.setTemporaryMailError('contact.contact_error_mail_required');
      return;
    }
    const pattern = /^[^\s@]+@[^\s@.]+\.[a-zA-Z]{2,}$/;
    this.setValidationResult(
      'mail',
      pattern.test(value),
      'contact.contact_error_mail_pattern'
    );
  }

  /**
   * Validates the message input field and sets appropriate error messages.
   */
  validateMessage(): void {
    const value = this.contactMessage?.trim() || '';

    if (!value) {
      this.setTemporaryMsgError('contact.contact_error_msg_required');
      return;
    }

    const pattern = /^[A-Za-zÄÖÜäöüß0-9\s.,;:!?@()'"-]{5,1000}$/u;
    this.setValidationResult(
      'msg',
      pattern.test(value),
      'contact.contact_error_msg_pattern'
    );
  }

  /**
   * Temporarily sets a validation error for the name field.
   * Marks the field as touched and invalid, then automatically
   * resets the error state after 3 seconds if the input is still empty.
   *
   * @param key Translation key for the validation error message.
   */
  private setTemporaryNameError(key: string): void {
    this.nameErrorKey = key;
    this.nameValid = false;
    this.nameTouched = true;

    clearTimeout(this.nameErrorTimeout);
    this.nameErrorTimeout = setTimeout(() => {
      if (!this.contactName?.trim()) {
        this.nameErrorKey = null;
        this.nameValid = null;
        this.nameTouched = false;
      }
    }, 3000);
  }

  /**
   * Temporarily sets a validation error for the email field.
   * Marks the field as touched and invalid, then automatically
   * clears the error state after 3 seconds if no input was provided.
   *
   * @param key Translation key for the validation error message.
   */
  private setTemporaryMailError(key: string): void {
    this.mailErrorKey = key;
    this.mailValid = false;
    this.mailTouched = true;

    clearTimeout(this.mailErrorTimeout);
    this.mailErrorTimeout = setTimeout(() => {
      if (!this.contactMail?.trim()) {
        this.mailErrorKey = null;
        this.mailValid = null;
        this.mailTouched = false;
      }
    }, 3000);
  }

  /**
   * Temporarily sets a validation error for the message field.
   * Flags the field as touched and invalid and automatically
   * resets the validation state after 3 seconds if the input remains empty.
   *
   * @param key Translation key for the validation error message.
   */
  private setTemporaryMsgError(key: string): void {
    this.msgErrorKey = key;
    this.msgValid = false;
    this.msgTouched = true;

    clearTimeout(this.msgErrorTimeout);
    this.msgErrorTimeout = setTimeout(() => {
      if (!this.contactMessage?.trim()) {
        this.msgErrorKey = null;
        this.msgValid = null;
        this.msgTouched = false;
      }
    }, 3000);
  }

  /**
   * Sets the validation result for a given field.
   * @param field - The field name ('name', 'mail', or 'msg')
   * @param valid - Whether the input passes validation
   * @param errorKey - The i18n error key for invalid input
   */
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

  // ---------------------- FORM HANDLING ----------------------

  /**
   * Main submit handler for the contact form.
   * Submits form data via ContactMailService, handles loading and error states.
   */
  submitContactForm(): void {
    if (!this.allFieldsValid || !this.privacyChecked) {
      this.privacyTouched = true;
      return;
    }

    this.sending = true;
    this.sendError = '';

    this.contactMailService.sendMail({
      name: this.contactName.trim(),
      email: this.contactMail.trim(),
      message: this.contactMessage.trim(),
      website: ''
    }).subscribe({
      next: (resp) => {
        this.sending = false;
        if (resp && resp.success) {
          this.triggerSuccessOverlay();
        } else {
          this.showError('contact.send_failed');
        }
      },
      error: (err) => {
        this.sending = false;

        if (err.status === 429) {
          this.showError('contact.too_many_requests');
        } else if (err.status === 400) {
          this.showError('contact.invalid_input');
        } else {
          this.showError('contact.send_failed');
        }
      }
    });
    this.nameTouched = true;
    this.mailTouched = true;
    this.msgTouched = true;
  }

  /** Displays an error message and auto-hides it after 4 seconds */
  private showError(key: string): void {
    this.sendError = key;
    setTimeout(() => {
      this.sendError = '';
    }, 3000);
  }

  /**
   * Resets the contact form to its initial state.
   */
  private clearForm(): void {
    this.contactForm?.resetForm({
      contactName: '',
      contactMail: '',
      contactMessage: '',
      privacyChecked: false,
    });
    this.contactMessage = '';
    this.nameValid = null;
    this.mailValid = null;
    this.msgValid = null;
    this.nameErrorKey = null;
    this.mailErrorKey = null;
    this.msgErrorKey = null;
    this.inputFocused = false;
    this.mailInputFocused = false;
    this.msgInputFocused = false;
    this.privacyTouched = false;
    this.privacyErrorVisible = false;
    this.sendError = '';
  }

  /**
   * Shows the success overlay briefly, then clears the form.
   */
  private triggerSuccessOverlay(): void {
    this.showSuccessOverlay = true;
    setTimeout(() => {
      this.showSuccessOverlay = false;
      this.clearForm();
    }, 1800);
  }

  /**
   * Handles submit button click with privacy logic and double validation.
   */
  onButtonClick(): void {
    if (this.allFieldsValid && !this.privacyChecked) {
      this.showPrivacyError();
      return;
    }
    if (this.allFieldsValid && this.privacyChecked) this.submitContactForm();
  }

  /**
   * Displays a temporary privacy error message.
   */
  private showPrivacyError(): void {
    this.privacyTouched = true;
    this.privacyErrorVisible = true;
    clearTimeout(this.privacyErrorTimeout);
    this.privacyErrorTimeout = setTimeout(() => {
      this.privacyErrorVisible = false;
    }, 3000);
  }

  // ---------------------- PRIVACY MODAL ----------------------

  /**
   * Opens the privacy modal and disables background scrolling.
   */
  openPrivacyModal(): void {
    this.showPrivacyModal = true;
    document.documentElement.classList.add('no-scroll');
  }

  /**
   * Closes the privacy modal and re-enables background scrolling.
   */
  closePrivacyModal(): void {
    this.showPrivacyModal = false;
    document.documentElement.classList.remove('no-scroll');
  }

  // ---------------------- INTERSECTION OBSERVERS ----------------------

  /**
   * Initializes intersection observers for animations after the view has initialized.
   */
  ngAfterViewInit(): void {
    this.observeElement(this.titleRow, (inView) => (this.titleInView = inView));
    this.infoRows.forEach((row, i) =>
      this.observeElement(row, (inView) => (this.infoInView[i] = inView))
    );
    this.formInput.forEach((input, i) =>
      this.observeElement(input, (inView) => (this.formInView[i] = inView))
    );
  }

  /**
   * Sets up a generic IntersectionObserver for a given element and callback.
   * @param ref - The ElementRef to observe.
   * @param callback - Callback function to handle visibility.
   */
  private observeElement(ref: ElementRef | undefined, callback: (inView: boolean) => void): void {
    if (!ref) return;
    const observer = new IntersectionObserver(([entry]) => callback(entry.isIntersecting), {
      threshold: 0.1
    });
    observer.observe(ref.nativeElement);
  }
}
