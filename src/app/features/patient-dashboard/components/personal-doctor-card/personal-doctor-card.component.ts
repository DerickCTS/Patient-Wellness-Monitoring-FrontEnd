// src/app/features/patient-dashboard/components/personal-doctor-card/personal-doctor-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PersonalDoctorDto } from '../../../../core/models/dashboard.models';
import { UpComingAppointmentDto } from '../../models/dashboard.models';


@Component({
  selector: 'app-personal-doctor-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './personal-doctor-card.component.html',
  styleUrls: ['./personal-doctor-card.component.scss'],
})
export class PersonalDoctorCardComponent {
  @Input({ required: true }) doctor!: PersonalDoctorDto;
  @Input({required: true}) upcomingAppointment!: UpComingAppointmentDto[];

  @Output() bookAppointmentClicked = new EventEmitter<void>();
  @Output() viewHistoryClicked = new EventEmitter<void>();

  // Mock data to enrich the UI as per the design mock
/*  mockDoctorDetails = {
    rating: 4.9,
    experience: '15+ years',
    patientCount: '1250+ patients',
    languages: 'English, Spanish',
    availabilityToday: 'Today at 3:30 PM',
    schedule: 'Monday - Friday: 9:00 AM - 5:00 PM',
    fee: '$200',
    location: 'Heart Care Center - Main Campus',
    contact: '+1 (555) 123-4567',
    qual: 'MD from Johns Hopkins, Fellowship in Interventional Cardiology',
  };*/

  getPatientDuration(): string {
    if (!this.doctor?.patientSince || new Date(this.doctor.patientSince).getFullYear() <= 1) {
      return 'N/A';
    }

    const start = new Date(this.doctor.patientSince);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (days >= 365) {
      const years = Math.floor(days / 365);
      return `${years} year${years > 1 ? 's' : ''}`;
    } else if (days >= 30) {
      const months = Math.floor(days / 30.44);
      return `${months} month${months > 1 ? 's' : ''}`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''}`;
    }
    return 'N/A';
  }
}