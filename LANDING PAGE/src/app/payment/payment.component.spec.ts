import { ComponentFixture, TestBed } from '@angular/core/testing';

import { paymentComponent } from './payment.component';

describe('paymentComponent', () => {
  let component: paymentComponent;
  let fixture: ComponentFixture<paymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ paymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(paymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
