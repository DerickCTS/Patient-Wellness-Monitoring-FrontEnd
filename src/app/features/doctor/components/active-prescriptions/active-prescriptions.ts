import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescriptionSummary } from '../../models/doctor.models';

@Component({
  selector: 'app-active-prescriptions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-prescriptions.html',
  styleUrls: ['../modal-base.css', './active-prescriptions.css']
})
export class ActivePrescriptionsComponent {
  @Input() data: PrescriptionSummary | null = null;
  @Output() close = new EventEmitter<void>();
  closeModal(): void { this.close.emit(); }
}