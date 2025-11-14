import { TestBed } from '@angular/core/testing';

import { ContactMailService } from './contact-mail.service';

describe('ContactMailService', () => {
  let service: ContactMailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactMailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
