import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyRequestHistoryComponent } from './emergency-request-history.component';

describe('EmergencyRequestHistoryComponent', () => {
  let component: EmergencyRequestHistoryComponent;
  let fixture: ComponentFixture<EmergencyRequestHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyRequestHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyRequestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
