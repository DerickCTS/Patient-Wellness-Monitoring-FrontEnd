import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NewPrescriptionDto } from '../../models/diagnosis.dto';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.html',
  styleUrls: ['./prescription-form.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
})
export class PrescriptionFormComponent implements OnInit {
  @Output() prescriptionSaved = new EventEmitter<NewPrescriptionDto>();
  @Output() cancel = new EventEmitter<void>();

  prescriptionForm: FormGroup;
  
  // These are the dropdown options for the schedule
  timeOfDayOptions = [
    'Morning',
    'Afternoon',
    'Evening',
    'After Meals',
    'Before Meals',
    'Night',
  ];

  constructor(private fb: FormBuilder) {
    this.prescriptionForm = this.fb.group({
      MedicationName: ['', Validators.required],
      Dosage: ['', Validators.required],
      StartDate: [null, Validators.required],
      EndDate: [null, Validators.required],
      Instructions: [null],
      // This is the special "list of forms" for schedules
      Schedules: this.fb.array([], Validators.required),
    });
  }

  ngOnInit(): void {
    // Add one schedule row by default
    this.addSchedule();
  }

  // --- FormArray Helper Methods ---

  /**
   * A getter to easily access the schedules FormArray.
   */
  get schedules(): FormArray {
    return this.prescriptionForm.get('Schedules') as FormArray;
  }

  /**
   * Creates a new FormGroup for a single schedule row.
   */
  createScheduleGroup(): FormGroup {
    return this.fb.group({
      TimeOfDay: ['Morning', Validators.required],
      Quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  /**
   * Adds a new, empty schedule row to the FormArray.
   */
  addSchedule(): void {
    if (this.schedules.length >= 5) return; // Limit to 5
    this.schedules.push(this.createScheduleGroup());
  }

  /**
   * Removes a schedule row at a specific index.
   */
  removeSchedule(index: number): void {
    this.schedules.removeAt(index);
  }

  // --- Main Form Actions ---

  onSave(): void {
    if (this.prescriptionForm.invalid) {
      this.prescriptionForm.markAllAsTouched();
      return;
    }
    
    // We need to format the dates before sending
    const formValue = this.prescriptionForm.value;
    const payload = {
      ...formValue,
      StartDate: this.formatDate(formValue.StartDate),
      EndDate: this.formatDate(formValue.EndDate),
    };

    this.prescriptionSaved.emit(payload);
    this.resetForm();
  }

  onCancel(): void {
    this.cancel.emit();
    this.resetForm();
  }
  
  private resetForm(): void {
     this.prescriptionForm.reset();
     this.schedules.clear();
     this.addSchedule(); // Add one blank schedule back
  }
  
  // Helper to format date to 'YYYY-MM-DDTHH:mm:ssZ'
  private formatDate(date: Date): string {
    if (!date) return '';
    // This gives you a UTC string like "2025-10-29T00:00:00.000Z"
    return date.toISOString();
  }
}