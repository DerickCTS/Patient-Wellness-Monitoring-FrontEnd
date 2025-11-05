import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment, AppointmentStatus } from '../../models/appointment.models';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.css'],
})
export class AppointmentCardComponent {
  @Input({ required: true }) appointment!: Appointment;
  @Input() showActionButton: boolean = true;

  // Expose Enum to the template
  AppointmentStatus = AppointmentStatus;

  getCardClass(): string {
    switch (this.appointment.status) {
      case AppointmentStatus.Approved:
        return 'approved-card';
      case AppointmentStatus.Pending:
        return 'pending-card';
      case AppointmentStatus.Rejected:
        return 'rejected-card';
      default:
        return '';
    }
  }
}