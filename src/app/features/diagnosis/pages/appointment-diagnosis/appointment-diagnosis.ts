import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize, map, switchMap, tap } from 'rxjs';
import {
  AppointmentDetailsDto,
  NewDiagnosisDto,
  NewPrescriptionDto,
  SaveDiagnosisDto,
} from '../../models/diagnosis.dto';
import { DiagnosisService } from '../../services/diagnosis';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { DiagnosisFormComponent } from '../../components/diagnosis-form/diagnosis-form';
import { PrescriptionFormComponent } from '../../components/prescription-form/prescription-form';

@Component({
  selector: 'app-appointment-diagnosis',
  templateUrl: './appointment-diagnosis.html',
  styleUrls: ['./appointment-diagnosis.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    MatDividerModule,
    DiagnosisFormComponent,     // <-- Import the child component
    PrescriptionFormComponent,  // <-- Import the child component
  ],
})
export class AppointmentDiagnosisComponent implements OnInit {
  appointmentId!: number;
  details$!: Observable<AppointmentDetailsDto>;
  
  // Local arrays to hold the *new* items before saving
  newDiagnoses: NewDiagnosisDto[] = [];
  newPrescriptions: NewPrescriptionDto[] = [];

  // State to toggle the forms
  showDiagnosisForm = false;
  showPrescriptionForm = false;
  
  // Loading state for save button
  isSaving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private diagnosisService: DiagnosisService
  ) {}

  ngOnInit(): void {
    // 1. Get the 'id' from the URL (e.g., 'diagnosis/1')
    this.details$ = this.route.paramMap.pipe(
      map((params) => {
        const id = params.get('id');
        if (!id) {
          this.goBack();
          throw new Error('No Appointment ID found');
        }
        this.appointmentId = +id; // Convert string 'id' to a number
        return this.appointmentId;
      }),
      // 2. Use the 'id' to fetch the appointment details
      switchMap((id) =>
        this.diagnosisService.getAppointmentDetails(id)
      )
    );
  }

  // --- Diagnosis Form Methods ---
  onAddDiagnosis(diagnosis: NewDiagnosisDto): void {
    this.newDiagnoses.push(diagnosis);
    this.showDiagnosisForm = false; // Hide form after adding
  }

  onDeleteNewDiagnosis(index: number): void {
    this.newDiagnoses.splice(index, 1);
  }

  // --- Prescription Form Methods ---
  onAddPrescription(prescription: NewPrescriptionDto): void {
    this.newPrescriptions.push(prescription);
    this.showPrescriptionForm = false; // Hide form after adding
  }

  onDeleteNewPrescription(index: number): void {
    this.newPrescriptions.splice(index, 1);
  }
  
  // --- Main Page Actions ---

  onSaveDiagnosis(): void {
    if (this.isSaving) return;
    
    // Check if at least one new item was added
    if (this.newDiagnoses.length === 0 && this.newPrescriptions.length === 0) {
      // You might want to show an alert here
      console.log('No new diagnosis or prescription to save.');
      return;
    }
    
    this.isSaving = true;
    
    const payload: SaveDiagnosisDto = {
      Diagnoses: this.newDiagnoses,
      Prescriptions: this.newPrescriptions,
    };
    
    this.diagnosisService.saveDiagnosis(this.appointmentId, payload).pipe(
      tap(() => {
        // This runs on success
        console.log('Save successful!');
        // As requested, navigate back to the list page
        this.router.navigate(['/diagnosis']);
      }),
      finalize(() => {
        // This runs on success or error
        this.isSaving = false;
      })
    ).subscribe({
       error: (err) => console.error('Save failed', err)
    });
  }

  goBack(): void {
    this.router.navigate(['/diagnosis']);
  }
  
  onCancel(): void {
     // Here you could add a confirmation prompt
     // "Are you sure? All unsaved changes will be lost."
     this.goBack();
  }
}