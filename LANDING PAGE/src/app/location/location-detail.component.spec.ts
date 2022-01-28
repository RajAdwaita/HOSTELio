import { ComponentFixture, TestBed } from '@angular/core/testing';

import { locationComponent } from './location-detail.component';

describe('locationComponent', () => {
  let component: locationComponent;
  let fixture: ComponentFixture<locationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ locationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(locationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
