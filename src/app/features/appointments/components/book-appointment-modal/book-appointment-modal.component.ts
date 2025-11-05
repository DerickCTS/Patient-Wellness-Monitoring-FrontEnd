import { Component, EventEmitter, Output, inject, signal, computed, WritableSignal, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Doctor, AppointmentForm, TimeSlot } from '../../models/appointment.models';
import { AppointmentService } from '../../services/appointment.service';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-book-appointment-modal',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule   
  ],
  templateUrl: './book-appointment-modal.component.html',
  styleUrl: './book-appointment-modal.component.css'
})
export class BookAppointmentModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  
  private appointmentService = inject(AppointmentService);
  
  // MOCK CURRENT USER ID
  private currentPatientId: number = 1; // <-- FIX: Mock patient ID

  // --- Modal State ---
  currentStep = 1;
  minDate: string = ''; 
  isSubmitting = signal(false); 

  // --- Form State (Using Signals) ---
  initialFormData: Omit<AppointmentForm, 'patientId'> = { // patientId will be added on submit
    specialization: '',
    reason: '',
    date: '', 
    time: '',
    doctorId: null 
  };
  
  formData: WritableSignal<Omit<AppointmentForm, 'patientId'>> = signal(this.initialFormData);
  submissionError = signal<string | null>(null);

  // --- Data & Filtering ---
  specializations: string[] = ['Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'General Medicine', 'Orthopedics'];
  
  doctors$: Observable<Doctor[]>; 
  slots$: Observable<TimeSlot[]>;   
  
  isLoadingDoctors = signal(false);
  isLoadingSlots = signal(false);

  selectedDoctor = computed(() => {
    return this.appointmentService.getDoctorById(this.formData().doctorId);
  });

  constructor() {
    this.doctors$ = of([]); 
    this.slots$ = of([]);   
  }

  ngOnInit(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.updateFormData('date', this.minDate); 
  }

  // --- Form Logic ---
  handleInputChange(key: keyof Omit<AppointmentForm, 'patientId'>, value: any) {
    this.updateFormData(key, value);
  }

  updateFormData(key: keyof Omit<AppointmentForm, 'patientId'>, value: any) {
    this.formData.update(data => ({ ...data, [key]: value }));

    if (key === 'specialization' || key === 'date') {
      this.formData.update(data => ({ ...data, doctorId: null, time: '' }));
      if (this.currentStep === 2) { 
        this.fetchDoctors();
      }
    }
  }

  // --- Navigation Logic ---
  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
    if (this.currentStep === 2) {
      this.fetchDoctors(); 
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  
  selectDoctor(doctor: Doctor) {
    this.updateFormData('doctorId', doctor.id); 
    this.fetchSlots(doctor.id); 
  }

  selectSlot(slot: TimeSlot) {
    this.updateFormData('date', slot.date);
    this.updateFormData('time', slot.time);
  }

  // --- API/Data Fetching ---
  fetchDoctors() {
    this.isLoadingDoctors.set(true);
    this.doctors$ = this.appointmentService.getDoctorsBySpecialization(this.formData().specialization).pipe(
      finalize(() => this.isLoadingDoctors.set(false))
    );
  }
  
  fetchSlots(doctorId: number) { 
    this.isLoadingSlots.set(true);
    this.slots$ = this.appointmentService.getSlotsForDoctor(doctorId, this.formData().date).pipe(
      finalize(() => this.isLoadingSlots.set(false))
    );
  }
  
  confirmBooking() {
    if (!this.formData().doctorId) {
      this.submissionError.set("No doctor selected.");
      return;
    }
    
    this.isSubmitting.set(true);
    this.submissionError.set(null);
    
    // FIX: Construct the full payload including the patientId
    const payload: AppointmentForm = {
      ...this.formData(),
      patientId: this.currentPatientId, // Add the mock patient ID
      doctorId: this.formData().doctorId! // We know this is not null from the check above
    };
    
    this.appointmentService.bookAppointment(payload)
      .pipe(
        catchError((err) => {
          this.isSubmitting.set(false);
          this.submissionError.set('Booking failed. Please try again.');
          console.error('Booking error:', err);
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.isSubmitting.set(false);
          console.log('Appointment successfully booked!', response);
          this.closeModal.emit(); 
        }
      });
  }

  openSpecializationGuide() {
    console.log('Opening Specialization Guide...');
  }
}