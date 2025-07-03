import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOverlayMobileComponent } from './menu-overlay-mobile.component';

describe('MenuOverlayMobileComponent', () => {
  let component: MenuOverlayMobileComponent;
  let fixture: ComponentFixture<MenuOverlayMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuOverlayMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuOverlayMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
