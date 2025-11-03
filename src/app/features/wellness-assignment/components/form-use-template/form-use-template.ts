// src/app/features/wellness/components/form-use-template/form-use-template.component.ts

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, finalize, of } from 'rxjs';
import {
  AssignTemplatePlanDto,
  PlanDetailsDto,
  PlanDetailItemDto,
  WellnessTemplateDto,
} from '../../models/wellness.models';
import { WellnessService } from '../../services/wellness.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

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
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormArrayManagerComponent } from '../form-array-manager/form-array-manager.component'; // Import our helper

@Component({
  selector: 'app-form-use-template',
  templateUrl: './form-use-template.component.html',
  styleUrls: ['./form-use-template.component.scss'],
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
    MatCardModule,
    MatSlideToggleModule,
    FormArrayManagerComponent, // Use our helper
  ],
})
export class FormUseTemplateComponent implements OnInit {
  @Input() patientId!: string;
  @Input() doctorId!: string;
  @Output() planAssigned = new EventEmitter<void>();

  // Templates
  templates$!: Observable<WellnessTemplateDto[]>;
  isLoadingTemplates = true;

  // Form
  form!: FormGroup;
  selectedTemplate: WellnessTemplateDto | null = null;
  selectedTemplateDetails: PlanDetailsDto | null = null;
  isLoadingDetails = false;
  isSaving = false;
  detailsModified = false;

  // Dropdown options
  categories = ['Diet', 'Exercise', 'Mindfulness', 'Recovery', 'General'];
  units = ['Daily', 'Weekly', 'Monthly'];

  constructor(private fb: FormBuilder, public wellnessService: WellnessService) {}

  ngOnInit(): void {
    // Load all templates on init
    this.templates$ = this.wellnessService.getTemplates().pipe(
      finalize(() => (this.isLoadingTemplates = false))
    );
  }

  // --- Getters for FormArrays ---
  get instructions() { return this.form.get('Instructions') as FormArray; }
  get benefits() { return this.form.get('Benefits') as FormArray; }
  get safety() { return this.form.get('Safety') as FormArray; }

  // --- FormArray Add/Remove Methods (for when editing) ---
  addItem(array: FormArray): void {
    array.push(this.fb.control('', Validators.required));
  }
  removeItem(array: FormArray, index: number): void {
    if (array.length > 1) {
      array.removeAt(index);
    }
  }

  // --- Step 1: Select a Template ---
  onTemplateSelected(template: WellnessTemplateDto): void {
    this.selectedTemplate = template;
    this.isLoadingDetails = true;

    // Call API 6 to get the full details
    this.wellnessService.getPlanDetails(template.planId).subscribe((details) => {
      this.selectedTemplateDetails = details;
      this.buildFormFromTemplate(details);
      this.isLoadingDetails = false;
    });
  }

  // --- Step 2: Build the form ---
  buildFormFromTemplate(details: PlanDetailsDto): void {
    this.form = this.fb.group({
      Category: [null, Validators.required],
      FrequencyCount: [1, [Validators.required, Validators.min(1)]],
      FrequencyUnit: [null, Validators.required],
      StartDate: [null, Validators.required],
      EndDate: [null, Validators.required],
      
      // These are pre-filled and disabled by default
      Description: [{ value: details.description, disabled: true }, Validators.required],
      Instructions: this.fb.array(
        details.instructions.map((i) => this.fb.control({ value: i, disabled: true }, Validators.required))
      ),
      Benefits: this.fb.array(
        details.benefits.map((b) => this.fb.control({ value: b, disabled: true }, Validators.required))
      ),
      Safety: this.fb.array(
        details.safetyPrecautions.map((s) => this.fb.control({ value: s, disabled: true }, Validators.required))
      ),
    });
    this.detailsModified = false;
  }

  // --- Step 3: Handle Editing ---
  toggleEdit(event: MatSlideToggleChange): void {
    this.detailsModified = event.checked;
    if (event.checked) {
      // Enable all the detail fields
      this.form.get('Description')?.enable();
      this.instructions.enable();
      this.benefits.enable();
      this.safety.enable();
    } else {
      // Disable them
      this.form.get('Description')?.disable();
      this.instructions.disable();
      this.benefits.disable();
      this.safety.disable();
    }
  }

  // --- Step 4: Submit ---
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSaving = true;

    // --- Build the DTO ---
    const fv = this.form.getRawValue(); // .getRawValue() includes disabled fields
    
    const details: PlanDetailItemDto[] = [
      { detail_type: 'Description', content: fv.Description },
      ...fv.Instructions.map((c: string) => ({ detail_type: 'Instruction', content: c })),
      ...fv.Benefits.map((c: string) => ({ detail_type: 'Benefits', content: c })),
      ...fv.Safety.map((c: string) => ({ detail_type: 'Safety', content: c })),
    ];
    
    const payload: AssignTemplatePlanDto = {
      PlanId: this.selectedTemplate!.planId.toString(),
      PatientId: this.patientId,
      DoctorId: this.doctorId,
      Category: fv.Category,
      FrequencyCount: fv.FrequencyCount,
      FrequencyUnit: fv.FrequencyUnit,
      StartDate: new Date(fv.StartDate).toISOString(),
      EndDate: new Date(fv.EndDate).toISOString(),
      Details: details,
      DetailsModified: this.detailsModified,
    };

    this.wellnessService.assignTemplatePlan(payload).pipe(
      finalize(() => this.isSaving = false)
    ).subscribe({
      next: (res) => {
        this.wellnessService.showSuccess(res.message);
        this.planAssigned.emit(); // Tell the modal to close
      },
      error: (err) => this.wellnessService.showError('Failed to assign plan.')
    });
  }

  // --- Navigation ---
  goBackToTemplates(): void {
    this.selectedTemplate = null;
    this.selectedTemplateDetails = null;
    this.form.reset();
  }
}