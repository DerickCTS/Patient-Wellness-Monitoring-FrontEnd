import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PatientBasicDto } from '../../models/patient.model';

@Component({
  selector: 'app-patient-summary-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './patient-summary-card.html',
  styleUrls: ['./patient-summary-card.scss']
})
export class PatientSummaryCardComponent {
  @Input({ required: true }) patient!: PatientBasicDto;
}