import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentStatus, Appointment } from '../../models/appointment.models';
import { AppointmentCardComponent } from '../../components/appointment-card/appointment-card.component';
import { BookAppointmentModalComponent } from '../../components/book-appointment-modal/book-appointment-modal.component';
import { PastAppointmentsTableComponent } from '../../components/past-appointments-table/past-appointments-table.component';

// Define the available tabs
type AppointmentTab = 'Approved' | 'Pending' | 'Rejected';

@Component({
  selector: 'app-appointment-page',
  standalone: true,
  imports: [
    CommonModule, 
    AppointmentCardComponent, 
    BookAppointmentModalComponent,
    PastAppointmentsTableComponent 
  ],
  templateUrl: './appointments-page.component.html',
  styleUrl: './appointments-page.component.css'
})
export class AppointmentPageComponent {
  private appointmentService = inject(AppointmentService);
  
  // State for the tabs and modals
  currentTab = signal<AppointmentTab>('Approved');
  isBookingModalOpen = signal(false);
  
  // New signal to store the specialization to pre-fill the booking modal
  initialSpecialization = signal<string | null>(null); 

  // Computed properties for filtered appointments
  approved = this.appointmentService.approvedAppointments;
  pending = this.appointmentService.pendingAppointments;
  rejected = this.appointmentService.rejectedAppointments;
  past = this.appointmentService.pastAppointments; 
  // Map for easy access to current filtered list
  currentAppointments = computed<Appointment[]>(() => {
    switch (this.currentTab()) {
      case 'Approved': return this.approved();
      case 'Pending': return this.pending();
      case 'Rejected': return this.rejected();
      default: return [];
    }
  });

  // --- Methods ---

  selectTab(tab: AppointmentTab) {
    this.currentTab.set(tab);
  }

  /**
   * Opens the booking modal, optionally pre-filling the specialization.
   * @param specialization Optional specialization string to start the booking flow.
   */
  openBookingModal(specialization: string | null = null) {
    this.initialSpecialization.set(specialization);
    this.isBookingModalOpen.set(true);
  }

  closeBookingModal() {
    this.isBookingModalOpen.set(false);
    this.initialSpecialization.set(null); // Reset the initial specialization
  }

  handleAppointmentBooked(appointment: Appointment) {
    // The appointment service should already handle updating the list via signals.
    console.log('Successfully booked a new appointment:', appointment);
    this.closeBookingModal();
  }
  
  // Helper to get count for badges
  getAppointmentCount(status: AppointmentTab): number {
    switch (status) {
      case 'Approved': return this.approved().length;
      case 'Pending': return this.pending().length;
      case 'Rejected': return this.rejected().length;
      default: return 0;
    }
  }
}
