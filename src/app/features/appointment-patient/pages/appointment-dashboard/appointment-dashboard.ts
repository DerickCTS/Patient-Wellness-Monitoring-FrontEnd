// src/app/feature/appointment-patient/pages/appointment-dashboard/appointment-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment';
import {
  AppointmentHistoryItemDto,
  AppointmentStatusDto,
} from '../../models/appointment.models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// --- STANDALONE IMPORTS ---
import { CommonModule, DatePipe } from '@angular/common';
import { AppointmentCardComponent } from '../../components/appointment-card/appointment-card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faStethoscope,
  faPlus,
  faCheckCircle,
  faClock,
  faTimesCircle,
  faCalendar,
  faUserMd,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';
import { BookAppointmentModalComponent } from '../../components/book-appointment-modal/book-appointment-modal';

@Component({
  selector: 'app-appointment-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    AppointmentCardComponent,
    DatePipe,
    BookAppointmentModalComponent, // <-- 2. Add modal to imports
  ],
  templateUrl: './appointment-dashboard.html',
  styleUrls: ['./appointment-dashboard.scss'],
})
export class AppointmentDashboardComponent implements OnInit {
  // Data Observables
  statusData$!: Observable<AppointmentStatusDto>;
  historyData$!: Observable<AppointmentHistoryItemDto[]>;

  // Tab State [cite: 12]
  activeTab: 'approved' | 'pending' | 'rejected' = 'approved';

  // Counts for tabs [cite: 13, 14, 15]
  approvedCount$!: Observable<number>;
  pendingCount$!: Observable<number>;
  rejectedCount$!: Observable<number>;

  // Icons 
  faStethoscope = faStethoscope;
  faPlus = faPlus;
  faCheck = faCheckCircle;
  faPending = faClock;
  faRejected = faTimesCircle;
  faCalendar = faCalendar;
  faUserMd = faUserMd;
  faFileAlt = faFileAlt;
  faClock = faClock;

  showBookModal = false;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadData();
  }
  private loadData(): void {
    this.statusData$ = this.appointmentService.getAppointmentStatus();
    this.historyData$ = this.appointmentService.getAppointmentHistory();

    this.approvedCount$ = this.statusData$.pipe(
      map((data) => data.approved.length)
    );
    this.pendingCount$ = this.statusData$.pipe(
      map((data) => data.pending.length)
    );
    this.rejectedCount$ = this.statusData$.pipe(
      map((data) => data.rejected.length)
    );
  }

  openBookAppointmentModal(): void {
    this.showBookModal = true;
  }

  handleModalClose(isSuccess: boolean): void {
    this.showBookModal = false;
    if (isSuccess) {
      // Refresh all data on the page after successful booking
      this.loadData();
    }
  }
}