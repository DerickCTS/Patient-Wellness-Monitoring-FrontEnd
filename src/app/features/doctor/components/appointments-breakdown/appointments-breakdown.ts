import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentSummary } from '../../models/doctor.models';

@Component({
  selector: 'app-appointments-breakdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments-breakdown.html',
  styleUrls: ['../modal-base.css', './appointments-breakdown.css']
})
export class AppointmentsBreakdownComponent {
  @Input() data: AppointmentSummary | null = null;
  @Input() type: 'appointments' | 'completed' = 'appointments';
  @Output() close = new EventEmitter<void>();
  closeModal(): void { this.close.emit(); }
}