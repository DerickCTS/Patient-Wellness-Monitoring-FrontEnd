// src/app/feature/appointment-patient/components/book-appointment-modal/book-appointment-modal.component.ts

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth';
import {
  SpecializationListDto,
  DoctorSlotDto,
  SlotDto,
  BookAppointmentDto,
} from '../../models/appointment.models';
import { AppointmentService } from '../../services/appointment';

// --- STANDALONE IMPORTS ---
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; // We need this for ngModel
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faClose,
  faQuestionCircle,
  faCalendar,
  faClock,
  faIdBadge,
  faStar,
  faCheckCircle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { SpecializationGuideComponent } from '../specialization-guide/specialization-guide';

// Helper types for managing state
type ModalStep = '1_SelectSpec' | '2_SelectSlot' | '3_Confirm';

interface SelectedSlot {
  doctor: DoctorSlotDto;
  slot: SlotDto;
}

@Component({
  selector: 'app-book-appointment-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    SpecializationGuideComponent,
    DatePipe,
  ],
  templateUrl: './book-appointment-modal.html',
  styleUrls: ['./book-appointment-modal.scss'],
})
export class BookAppointmentModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>(); // Emit 'true' on success

  // Modal State
  currentStep: ModalStep = '1_SelectSpec';
  showSpecGuide = false;
  
  // Step 1 Data
  specializations$: Observable<SpecializationListDto> = of([]);
  selectedSpecialization: string | null = null;
  reasonForVisit: string = '';

  // Step 2 Data
  isLoadingSlots = false;
  doctorSlots: DoctorSlotDto[] = [];
  mostExperienced: number = 0;
  selectedSlot: SelectedSlot | null = null;

  // Step 3 Data
  isBooking = false;
  bookingError: string | null = null;
  
  // Icons
  faClose = faClose;
  faQuestion = faQuestionCircle;
  faCalendar = faCalendar;
  faClock = faClock;
  faIdBadge = faIdBadge;
  faStar = faStar;
  faCheck = faCheckCircle;
  faInfoCircle = faInfoCircle;

  constructor(
    private appointmentService: AppointmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Load specializations for the dropdown
    this.specializations$ = this.appointmentService.getSpecializations();
  }

  // --- Step 1: Logic ---
  onStep1Next(): void {
    if (!this.selectedSpecialization || !this.reasonForVisit) {
      return;
    }
    this.isLoadingSlots = true;
    this.currentStep = '2_SelectSlot';
    
    // Call API to get slots
    this.appointmentService.getDoctorSlots(this.selectedSpecialization)
      .pipe(finalize(() => this.isLoadingSlots = false))
      .subscribe(slots => {
        // Sort by experience [cite: 114]
        this.doctorSlots = slots.sort((a, b) => b.experienceYears - a.experienceYears);
        // Find the most experienced [cite: 115]
        this.mostExperienced = this.doctorSlots.length > 0 ? this.doctorSlots[0].experienceYears : 0;
      });
  }

  // --- Step 2: Logic ---
  selectSlot(doctor: DoctorSlotDto, slot: SlotDto): void {
    this.selectedSlot = { doctor, slot };
  }

  onStep2Next(): void {
    if (!this.selectedSlot) return;
    this.currentStep = '3_Confirm';
  }

  onStep2Change(): void {
    this.currentStep = '1_SelectSpec';
    this.selectedSlot = null;
    this.doctorSlots = [];
  }

  // --- Step 3: Logic ---
  onStep3Confirm(): void {
    this.isBooking = true;
    this.bookingError = null;
    
    // const patientId = this.authService.getPatientId();
    const patientId = '1';
    if (!patientId) {
      this.bookingError = "Error: Patient ID not found. Please log in again.";
      this.isBooking = false;
      return;
    }

    const payload: BookAppointmentDto = {
      PatientID: patientId,
      DoctorID: this.selectedSlot!.doctor.doctorID.toString(),
      SlotId: this.selectedSlot!.slot.slotID,
      Reason: this.reasonForVisit,
    };
    
    // Call API to book
    this.appointmentService.bookAppointment(payload)
      .pipe(finalize(() => this.isBooking = false))
      .subscribe({
        next: (response) => {
          // Success! [cite: 152]
          this.closeModal.emit(true); // Emit true for success
        },
        error: (err) => {
          // Show error message [cite: 155, 157]
          this.bookingError = err.error?.message || 'The selected slot is invalid or already booked.';
        }
      });
  }

  onStep3Back(): void {
    this.currentStep = '2_SelectSlot';
    this.bookingError = null;
  }
  
  // --- Global ---
  onCloseModal(): void {
    this.closeModal.emit(false); // Emit false for simple close
  }
}