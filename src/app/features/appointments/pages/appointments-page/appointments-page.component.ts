import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';
import { AppointmentCardComponent } from '../../components/appointment-card/appointment-card.component';
import { PastAppointmentsTableComponent } from '../../components/past-appointments-table/past-appointments-table.component';
import { BookAppointmentModalComponent } from '../../components/book-appointment-modal/book-appointment-modal.component';

@Component({
  selector: 'app-appointments-page',
  standalone: true,
  imports: [
    CommonModule,
    AppointmentCardComponent,
    PastAppointmentsTableComponent,
    BookAppointmentModalComponent,
  ],
  templateUrl: './appointments-page.component.html',
  styleUrls: ['./appointments-page.component.css'],
})
export class AppointmentsPageComponent {
  private appointmentService = inject(AppointmentService);

  // Expose signals to the template
  approvedAppointments = this.appointmentService.approvedAppointments;
  pendingAppointments = this.appointmentService.pendingAppointments;
  rejectedAppointments = this.appointmentService.rejectedAppointments;
  pastAppointments = this.appointmentService.pastAppointments;

  //---State for Tab Selection ---
  selectedTabIndex = signal(0); // 0: Approved, 1: Pending, 2: Rejected, 3: Past

  // State for the modal
  isModalOpen = signal(false);

  // --- Tab Selection Method ---
  selectTab(index: number): void {
    this.selectedTabIndex.set(index);
  }

  openBookAppointmentModal(): void {
    this.isModalOpen.set(true);
  }

  closeBookAppointmentModal(): void {
    this.isModalOpen.set(false);
  }
}