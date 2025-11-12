// src/app/features/patient-dashboard/pages/patient-dashboard/patient-dashboard.page.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Service Import
import { PatientDashboardService } from '../../services/patient-dashboard.service';
import {
  PatientDashboardData,
  UpdateProfileInputDto,
} from '../../../../core/models/dashboard.models';

// Component Imports (paths updated)
import { PatientProfileCardComponent } from '../../components/patient-profile-card/patient-profile-card.component';
import { PersonalDoctorCardComponent } from '../../components/personal-doctor-card/personal-doctor-card.component';
import { ActivePrescriptionsListComponent } from '../../components/active-prescriptions-list/active-prescriptions-list.component';
import { RecentActivitiesListComponent } from '../../components/recent-activities-list/recent-activities-list.component';
import { EditProfileModalComponent } from '../../components/edit-profile-modal/edit-profile-modal.component';

@Component({
  selector: 'app-patient-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    PatientProfileCardComponent,
    PersonalDoctorCardComponent,
    ActivePrescriptionsListComponent,
    RecentActivitiesListComponent,
    EditProfileModalComponent,
  ],
  templateUrl: './patient-dashboard.page.html',
  styleUrls: ['./patient-dashboard.page.scss'],
})
export class PatientDashboardPage implements OnInit {
  private dashboardService = inject(PatientDashboardService); // Updated Service
  private router = inject(Router);

  dashboardData: PatientDashboardData | null = null;
  isLoading = true;
  isEditModalOpen = false;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    const patientId = 3; // Hardcoded for testing
    this.dashboardService.getDashboardData(patientId).subscribe({
      next: (data) => {
        this.dashboardData = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading dashboard data:', err);
        this.isLoading = false;
      },
    });
  }

  // Handles 'Edit Profile' button click
  openEditModal(): void {
    this.isEditModalOpen = true;
  }

  // Handles modal close
  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  // Handles 'Save Changes' from the modal (API Call 2)
  saveProfile(updatedProfile: UpdateProfileInputDto): void {
    this.dashboardService.updateProfile(updatedProfile).subscribe({
      next: (res) => {
        console.log(res.message);
        this.closeEditModal();
        this.loadDashboardData(); // Refresh data
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        // In a real app, handle error message in modal
      },
    });
  }

  // Navigation handlers
  navigateToAppointments(): void {
    // Redirects to the Appointments page as requested
    this.router.navigate(['/appointments']);
  }

  navigateToMedicalHistory(): void {
    // Placeholder navigation as requested
    this.router.navigate(['/medical-history-placeholder']);
  }

  navigateToTaskDetails(taskId: number): void {
    // Placeholder navigation as requested
    this.router.navigate(['/task-details-placeholder', taskId]);
  }
}