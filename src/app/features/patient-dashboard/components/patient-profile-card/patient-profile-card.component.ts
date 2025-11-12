// src/app/features/patient-dashboard/components/patient-profile-card/patient-profile-card.component.ts
import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PatientProfileDto } from '../../../../core/models/dashboard.models';

@Component({
  selector: 'app-patient-profile-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './patient-profile-card.component.html',
  styleUrls: ['./patient-profile-card.component.scss'],
})
export class PatientProfileCardComponent {
  _profile = signal<PatientProfileDto | null>(null);
  
  @Input({ required: true }) set profile(data: PatientProfileDto) {
    this._profile.set(data);
  }
  @Output() editProfileClicked = new EventEmitter<void>();

  // Helper to calculate age (simplified)
  age = computed(() => {
    const dob = this._profile()?.dateOfBirth;
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return `${age} years old`;
  });

  // Helper for initials
  initials = computed(() => {
    const name = this._profile()?.fullName;
    if (!name) return '??';
    const parts = name.split(' ');
    return parts.map(p => p[0]).join('').toUpperCase().substring(0, 2);
  });
}