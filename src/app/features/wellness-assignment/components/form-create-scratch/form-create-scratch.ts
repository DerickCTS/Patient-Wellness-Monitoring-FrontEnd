// src/app/features/wellness/components/form-create-scratch/form-create-scratch.component.ts

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WellnessService } from '../../services/wellness.service';
import { AssignScratchPlanDto, PlanDetailItemDto } from '../../models/wellness.models';
import { finalize } from 'rxjs';

// --- STANDALONE IMPORTS ---
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormArrayManagerComponent } from '../form-array-manager/form-array-manager.component';

@Component({
  selector: 'app-form-create-scratch',
  templateUrl: './form-create-scratch.component.html',
  styleUrls: ['./form-create-scratch.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule,
    MatDatepickerModule,
    FormArrayManagerComponent, // <-- ADD IT HERE
  ],
})
export class FormCreateScratchComponent implements OnInit {
  @Input() patientId!: string;
  @Input() doctorId!: string;
  @Output() planAssigned = new EventEmitter<void>();

  form: FormGroup;
  isSaving = false;
  isUploading = false;
  
  // Dropdown options
  categories = ['Diet', 'Exercise', 'Mindfulness', 'Recovery', 'General'];
  units = ['Daily', 'Weekly', 'Monthly'];

  constructor(private fb: FormBuilder, private wellnessService: WellnessService) {
    this.form = this.fb.group({
      PlanName: ['', Validators.required],
      Goal: ['', Validators.required],
      ImageUrl: ['', Validators.required], // This will be set by the uploader
      Category: [null, Validators.required],
      FrequencyCount: [1, [Validators.required, Validators.min(1)]],
      FrequencyUnit: [null, Validators.required],
      StartDate: [null, Validators.required],
      EndDate: [null, Validators.required],
      Description: ['', Validators.required],
      Instructions: this.fb.array([this.fb.control('', Validators.required)]),
      Benefits: this.fb.array([this.fb.control('', Validators.required)]),
      Safety: this.fb.array([this.fb.control('', Validators.required)]),
    });
  }

  ngOnInit(): void {}

  // --- Getters for FormArrays ---
  get instructions() { return this.form.get('Instructions') as FormArray; }
  get benefits() { return this.form.get('Benefits') as FormArray; }
  get safety() { return this.form.get('Safety') as FormArray; }

  // --- FormArray Add/Remove Methods ---
  addItem(array: FormArray): void {
    array.push(this.fb.control('', Validators.required));
  }
  removeItem(array: FormArray, index: number): void {
    if (array.length > 1) {
      array.removeAt(index);
    }
  }

  // --- API 8: Image Upload ---
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    
    this.isUploading = true;
    this.wellnessService.uploadPlanImage(file).pipe(
      finalize(() => this.isUploading = false)
    ).subscribe({
      next: (res) => {
        // Set the returned URL on our form
        this.form.get('ImageUrl')?.setValue(res.imageUrl);
        this.wellnessService.showSuccess('Image uploaded!');
      },
      error: (err) => this.wellnessService.showError('Image upload failed.')
    });
  }

  // --- API 7: Submit Form ---
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSaving = true;

    // --- Build the DTO ---
    const fv = this.form.value;
    const details: PlanDetailItemDto[] = [
      { detail_type: 'Description', content: fv.Description },
      ...fv.Instructions.map((c: string) => ({ detail_type: 'Instruction', content: c })),
      ...fv.Benefits.map((c: string) => ({ detail_type: 'Benefits', content: c })),
      ...fv.Safety.map((c: string) => ({ detail_type: 'Safety', content: c })),
    ];
    
    const payload: AssignScratchPlanDto = {
      PatientId: this.patientId,
      DoctorId: this.doctorId,
      Category: fv.Category,
      PlanName: fv.PlanName,
      ImageUrl: fv.ImageUrl,
      Goal: fv.Goal,
      FrequencyCount: fv.FrequencyCount,
      FrequencyUnit: fv.FrequencyUnit,
      StartDate: new Date(fv.StartDate).toISOString(),
      EndDate: new Date(fv.EndDate).toISOString(),
      Details: details,
    };

    this.wellnessService.assignScratchPlan(payload).pipe(
      finalize(() => this.isSaving = false)
    ).subscribe({
      next: (res) => {
        this.wellnessService.showSuccess(res.message);
        this.planAssigned.emit(); // Tell the modal to close
      },
      error: (err) => this.wellnessService.showError('Failed to assign plan.')
    });
  }
}