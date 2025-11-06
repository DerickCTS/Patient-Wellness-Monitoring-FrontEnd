import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Dummy DTO structure for compilation context. In a real app, this would be imported.
interface Schedule {
  TimeOfDay: string;
  Quantity: number;
}

interface NewPrescriptionDto {
  MedicationName: string;
  Dosage: string;
  StartDate: string;
  EndDate: string;
  Instructions: string | null;
  Schedules: Schedule[];
}

// Angular Material imports are kept but not strictly necessary for the current plain HTML template
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
  styleUrls: ['./prescription-form.scss'], // Assuming this file exists for styling
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
      StartDate: [this.formatDate(new Date()), Validators.required], // Initialize with today's date for dev ease
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
    // Allows adding up to 5 schedules
    if (this.schedules.length >= 5) return;
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
    console.log('Attempting to save prescription...');

    // Check if the form is valid and mark controls as touched to display errors
    if (this.prescriptionForm.invalid) {
      console.log('Form is invalid. Validation errors:', this.prescriptionForm.errors);
      this.prescriptionForm.markAllAsTouched();
      return;
    }

    // We need to format the dates before sending
    const formValue = this.prescriptionForm.value;
    const payload: NewPrescriptionDto = {
      ...formValue,
      // Ensure dates are formatted to a common standard (e.g., ISO string)
      StartDate: this.formatDate(formValue.StartDate),
      EndDate: this.formatDate(formValue.EndDate),
    };

    console.log('Form is valid, emitting data:', payload);

    // This is the line that signals to the parent component that data is ready
    this.prescriptionSaved.emit(payload);

    this.resetForm();
  }

  onCancel(): void {
    this.cancel.emit();
    this.resetForm();
  }

  private resetForm(): void {
    // Reset the form values
    this.prescriptionForm.reset();
    // Clear all schedule array controls
    this.schedules.clear();
    // Add one blank schedule back for default view
    this.addSchedule();
  }

  /**
   * Helper to format Date objects from the date input into a string for the DTO.
   * @param date The date object from the form control.
   * @returns An ISO 8601 string representation of the date (YYYY-MM-DD).
   */
  private formatDate(date: string | Date | null): string {
    if (!date) return '';
    // If it's a Date object (like from a date picker), convert it.
    if (date instanceof Date) {
        return date.toISOString().split('T')[0];
    }
    // If it's already a string (like from type="date" input), return it.
    return date as string;
  }
}
