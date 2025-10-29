import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DiagnosisService } from '../../services/diagnosis';
import { TodaysAppointmentDto } from '../../models/diagnosis.dto';
import { CommonModule } from '@angular/common'; // for *ngIf, *ngFor, async pipe
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.html',
  styleUrls: ['./appointment-list.scss'],
  standalone: true, // This should already be here
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class AppointmentListComponent implements OnInit {
  // We use the $ suffix to indicate this is an Observable
  appointments$!: Observable<TodaysAppointmentDto[]>;
  today: Date = new Date();

  constructor(
    private diagnosisService: DiagnosisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appointments$ = this.diagnosisService.getTodaysAppointments();
  }

  navigateToDiagnosis(appointmentId: number): void {
    // Navigate to the details page, e.g., 'diagnosis/1'
    this.router.navigate(['/diagnosis', appointmentId]);
  }
}