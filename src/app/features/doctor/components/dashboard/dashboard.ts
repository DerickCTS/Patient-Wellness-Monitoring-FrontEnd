import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { DashboardData, Appointment } from '../../models/doctor.models';
import { ProfileComponent } from '../profile/profile';
import { PatientBreakdownComponent } from '../patient-breakdown/patient-breakdown';
import { AppointmentsBreakdownComponent } from '../appointments-breakdown/appointments-breakdown';
import { ActivePrescriptionsComponent } from '../active-prescriptions/active-prescriptions';
import { WellnessPlansBreakdownComponent } from '../wellness-plans-breakdown/wellness-plans-breakdown';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProfileComponent,
    PatientBreakdownComponent,
    AppointmentsBreakdownComponent,
    ActivePrescriptionsComponent,
    WellnessPlansBreakdownComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  
  // Set the type to be optional (fixes TS2532 - Object is possibly 'undefined')
  dashboardData?: DashboardData; 
  selectedTab: string = 'Overview'; 
  
  // Assuming these properties exist to control modals/panels
  isPatientModalOpen: boolean = false;
  isAppointmentsModalOpen: boolean = false;
  isCompletedTodayModalOpen: boolean = false;
  isPrescriptionsModalOpen: boolean = false;
  isWellnessModalOpen: boolean = false;
  
  patientBreakdown: any;
  appointmentsBreakdown: any;
  prescriptionsBreakdown: any;
  wellnessBreakdown: any;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    // Example: Load data on initialization
    this.doctorService.getDashboardData().subscribe(data => {
      this.dashboardData = data;
    });
  }

  // 🔑 FIX: Safely retrieves the patient name from the first appointment. 
  // This avoids the 'possibly undefined' error on the array.
  getFirstAppointmentPatientName(): string {
    const list = this.dashboardData?.todayAppointmentsList;
    return (list && list.length > 0) ? list[0].patientName : '';
  }

  // 🔑 FIX: Handles complex string manipulation (Initials). 
  // This resolves the NG5002 Parser Error from using arrow functions in HTML.
  getPatientInitials(patientName: string): string {
    if (!patientName) return '';
    return patientName
      .split(' ') 
      .map(n => n.charAt(0)) 
      .join('')
      .toUpperCase();
  }

  // 🔑 FIX: Helper method for [ngClass] logic. 
  // This resolves TS2532 errors checking percentage values in the template.
  getPercentageClass(change: number | undefined): string {
    if (change === undefined) return '';
    return change >= 0 ? 'change-positive' : 'change-negative';
  }

  // Example method to toggle panels/modals
  closeAllModals() {
    this.isPatientModalOpen = false;
    this.isAppointmentsModalOpen = false;
    this.isCompletedTodayModalOpen = false;
    this.isPrescriptionsModalOpen = false;
    this.isWellnessModalOpen = false;
  }
  
  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  openModal(type: string) {
    this.closeAllModals();
    switch(type) {
      case 'patients':
        this.doctorService.getPatientBreakdown().subscribe(data => {
          this.patientBreakdown = data;
          this.isPatientModalOpen = true;
        });
        break;
      case 'appointments':
        this.doctorService.getAppointmentsBreakdown().subscribe(data => {
          this.appointmentsBreakdown = data;
          this.isAppointmentsModalOpen = true;
        });
        break;
      case 'completed':
        this.doctorService.getAppointmentsBreakdown().subscribe(data => {
          this.appointmentsBreakdown = data;
          this.isCompletedTodayModalOpen = true;
        });
        break;
      case 'prescriptions':
        this.doctorService.getPrescriptionsBreakdown().subscribe(data => {
          this.prescriptionsBreakdown = data;
          this.isPrescriptionsModalOpen = true;
        });
        break;
      case 'wellness':
        this.doctorService.getWellnessBreakdown().subscribe(data => {
          this.wellnessBreakdown = data;
          this.isWellnessModalOpen = true;
        });
        break;
    }
  }


}