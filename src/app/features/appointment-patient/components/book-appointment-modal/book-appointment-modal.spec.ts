import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAppointmentModal } from './book-appointment-modal';

describe('BookAppointmentModal', () => {
  let component: BookAppointmentModal;
  let fixture: ComponentFixture<BookAppointmentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookAppointmentModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAppointmentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
