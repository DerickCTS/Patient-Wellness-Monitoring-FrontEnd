// src/app/features/patient-dashboard/components/active-prescriptions-list/active-prescriptions-list.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PrescriptionDto } from '../../../../core/models/dashboard.models';

@Component({
  selector: 'app-active-prescriptions-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './active-prescriptions-list.component.html',
  styleUrls: ['./active-prescriptions-list.component.scss'],
})
export class ActivePrescriptionsListComponent {
  @Input({ required: true }) prescriptions: PrescriptionDto[] = [];

  // Helper to calculate days remaining using EndDate from the DTO
  getDaysRemaining(endDateString: string): string {
    const endDate = new Date(endDateString);
    const today = new Date();
    endDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = endDate.getTime() - today.getTime();
    // Use Math.round instead of Math.ceil for more conventional remaining days count
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); 

    if (diffDays > 0) {
      return `${diffDays} days left`;
    } else if (diffDays === 0) {
      return 'Ends Today';
    } else {
      return `${Math.abs(diffDays)} days overdue`;
    }
  }
}