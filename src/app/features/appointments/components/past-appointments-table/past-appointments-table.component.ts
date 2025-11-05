import { Component, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Appointment } from '../../models/appointment.models';

@Component({
  selector: 'app-past-appointments-table',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './past-appointments-table.component.html',
  styleUrl: './past-appointments-table.component.css'
})
export class PastAppointmentsTableComponent {
  // Input property to receive past appointments
  appointments = input.required<Appointment[]>();
}