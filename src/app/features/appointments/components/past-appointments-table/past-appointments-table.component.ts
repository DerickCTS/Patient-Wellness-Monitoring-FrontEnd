import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../models/appointment.models';

@Component({
  selector: 'app-past-appointments-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './past-appointments-table.component.html',
  styleUrls: ['./past-appointments-table.component.css'],
})
export class PastAppointmentsTableComponent {
  @Input({ required: true }) appointments: Appointment[] = [];

  // Table headers
  displayedColumns: string[] = ['date', 'time', 'doctor', 'specialization', 'reason', 'status'];
}