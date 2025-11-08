import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientSummary } from '../../models/doctor.models';

@Component({
  selector: 'app-patient-breakdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-breakdown.html',
  styleUrls: ['../modal-base.css', './patient-breakdown.css']
})
export class PatientBreakdownComponent {
  @Input() data: PatientSummary | null = null;
  @Output() close = new EventEmitter<void>();
  closeModal(): void { this.close.emit(); }
}