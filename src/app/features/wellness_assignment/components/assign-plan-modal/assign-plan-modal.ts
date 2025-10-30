// Imports remain the same
import { Component, Inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WellnessService } from '../../services/wellness';
import { AssignPlanRequest, PlanDetailDto } from '../../models/wellness-plan.model';

interface DialogData {
  patientId: number;
  patientName: string;
}

interface TemplatePlan {
  id: string; 
  name: string;
  category: string;
  goal: string;
  instructions: string;
  benefits: string;
  safety: string;
  description: string;
}

// Mock Data for Templates and Dropdowns (kept outside for clarity)
const MOCK_TEMPLATES: TemplatePlan[] = [
  { id: '1', name: 'Diabetes Management Plan', category: 'Diabetes', goal: 'Control blood sugar levels...', instructions: 'Monitor blood glucose levels twice daily...', benefits: 'Improved blood sugar control...', safety: 'Consult your doctor before starting any new exercise routine.', description: 'A comprehensive plan for managing Type 2 Diabetes.' },
  { id: '2', name: 'Cardiovascular Wellness Plan', category: 'Cardiovascular', goal: 'Improve heart health...', instructions: 'Follow a low-sodium diet (DASH diet)...', benefits: 'Lower blood pressure...', safety: 'Stop exercising if you feel chest pain.', description: 'Focuses on lifestyle changes for heart health.' },
];

const CATEGORIES = ['Physical', 'Mental Health', 'Nutrition', 'Diabetes', 'Cardiovascular', 'Respiratory'];
const FREQUENCY_UNITS = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
const DETAIL_TYPES: PlanDetailDto['detail_type'][] = ['Instruction', 'Benefits', 'Safety', 'Description'];


@Component({
  selector: 'app-assign-plan-modal',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, 
    MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, 
    MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule, MatTabsModule, 
    MatProgressSpinnerModule, DatePipe
  ],
  templateUrl: './assign-plan-modal.html', // Delegated
  styleUrls: ['./assign-plan-modal.scss'] // Delegated
})
export class AssignPlanModalComponent {
  planTypeSelected = signal<'template' | 'scratch' | null>(null);
  selectedTemplate = signal<TemplatePlan | null>(null);
  isSubmitting = signal(false);

  templates: TemplatePlan[] = MOCK_TEMPLATES;
  categories: string[] = CATEGORIES;
  frequencyUnits: string[] = FREQUENCY_UNITS;
  detailTypes = DETAIL_TYPES;

  planForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AssignPlanModalComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private wellnessService: WellnessService
  ) {
    this.planForm = this.fb.group({
      // Plan Selection (Template)
      PlanId: [null], 
      // Plan Details (Custom/Modified Template)
      PlanName: [''],
      Category: ['', Validators.required],
      ImageUrl: [''],
      Goal: [''],
      // Schedule Details (Common)
      FrequencyCount: [1, Validators.required],
      FrequencyUnit: ['Daily', Validators.required],
      StartDate: [new Date(), Validators.required],
      EndDate: [this.addMonths(new Date(), 3), Validators.required],
      // Details
      DetailsModified: [false],
      Instruction: ['Enter detailed instructions for the patient to follow...', Validators.required],
      Benefits: [''],
      Safety: [''],
      Description: [''],
    });

    this.planForm.get('DetailsModified')?.disable();
  }

  addMonths(date: Date, months: number): Date {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  }

  selectPlanType(type: 'template' | 'scratch'): void {
    this.planTypeSelected.set(type);
    this.selectedTemplate.set(null); 
    this.planForm.reset(this.planForm.value); 
    this.planForm.get('Category')?.setValue(this.categories[0]); // Set a default category
    this.planForm.get('FrequencyUnit')?.setValue(this.frequencyUnits[0]); // Set a default unit
    this.planForm.get('StartDate')?.setValue(new Date());
    this.planForm.get('EndDate')?.setValue(this.addMonths(new Date(), 3));

    if (type === 'template') {
      this.planForm.get('PlanId')?.setValidators(Validators.required);
      this.planForm.get('DetailsModified')?.enable();
      this.planForm.get('DetailsModified')?.setValue(false);
      this.disableCustomFields(true); 
      this.disableDetailControls(true); 
      this.planForm.get('PlanName')?.clearValidators();
      this.planForm.get('Goal')?.clearValidators();
    } else { // 'scratch'
      this.planForm.get('PlanId')?.clearValidators();
      this.planForm.get('DetailsModified')?.disable();
      this.planForm.get('DetailsModified')?.setValue(true);
      this.disableCustomFields(false);
      this.disableDetailControls(false);
      this.planForm.get('PlanName')?.setValidators(Validators.required);
      this.planForm.get('Goal')?.setValidators(Validators.required);
    }
    this.planForm.get('PlanId')?.updateValueAndValidity();
    this.planForm.get('PlanName')?.updateValueAndValidity();
    this.planForm.get('Goal')?.updateValueAndValidity();
  }

  onTemplateSelect(): void {
    const planId = this.planForm.get('PlanId')?.value;
    const template = this.templates.find(t => t.id === planId) || null;
    this.selectedTemplate.set(template);

    if (template) {
      this.planForm.patchValue({
        PlanName: template.name,
        Category: template.category,
        Goal: template.goal,
        Instruction: template.instructions,
        Benefits: template.benefits,
        Safety: template.safety,
        Description: template.description,
        DetailsModified: false
      });
      this.disableCustomFields(true);
      this.disableDetailControls(true);
    }
  }

  onDetailsModifiedToggle(modified: boolean): void {
    this.disableDetailControls(!modified);
    if (!modified && this.selectedTemplate()) {
        this.planForm.patchValue({
            Instruction: this.selectedTemplate()!.instructions,
            Benefits: this.selectedTemplate()!.benefits,
            Safety: this.selectedTemplate()!.safety,
            Description: this.selectedTemplate()!.description,
        });
    }
  }

  disableCustomFields(disable: boolean): void {
    const controls = ['PlanName', 'Category', 'ImageUrl', 'Goal'];
    controls.forEach(controlName => {
        const control = this.planForm.get(controlName);
        if (control) {
            disable ? control.disable() : control.enable();
            control.updateValueAndValidity();
        }
    });
  }

  disableDetailControls(disable: boolean): void {
  this.detailTypes.forEach(detailType => {
    // Use the function to get the safe string key for form.get()
    const controlName = this.getDetailControlName(detailType);
    const control = this.planForm.get(controlName); 

    if (control) {
      disable ? control.disable() : control.enable();
      control.updateValueAndValidity();
    }
  });
}

  getDetailControlName(type: string): string {
    // Ensure a string is always returned; control keys can be string | number | symbol,
    // so coerce to string to satisfy the declared return type.
    return String(type);
  }

  buildPlanDetails(isModified: boolean, planId: string | null = null): PlanDetailDto[] {
    if (!isModified) {
      return []; 
    }
    
    const details: PlanDetailDto[] = [];
    const formValue = this.planForm.getRawValue();

    this.detailTypes.forEach(type => {
      const content = formValue[type] as string;
      if (content) {
        details.push({
          detail_type: type,
          content: content,
          PlanID: planId || '1'
        });
      }
    });
    return details;
  }

  submitPlan(): void {
    if (this.planForm.invalid) {
      this.planForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const formValue = this.planForm.getRawValue();
    const isTemplate = this.planTypeSelected() === 'template';
    const isModified = formValue.DetailsModified;
    const patientIdStr = this.data.patientId.toString(); 

    const planRequest: AssignPlanRequest = {
      PatientId: patientIdStr,
      DoctorId: '1', 
      Category: formValue.Category,
      FrequencyCount: formValue.FrequencyCount,
      FrequencyUnit: formValue.FrequencyUnit,
      StartDate: formValue.StartDate.toISOString(),
      EndDate: formValue.EndDate.toISOString(),
      DetailsModified: isModified,
      Details: this.buildPlanDetails(isModified, formValue.PlanId)
    };

    if (isTemplate) {
      (planRequest as any).PlanId = formValue.PlanId;
      if (isModified) {
        (planRequest as any).PlanName = formValue.PlanName;
        (planRequest as any).ImageUrl = formValue.ImageUrl;
        (planRequest as any).Goal = formValue.Goal;
      }
    } else { // Scratch
      (planRequest as any).PlanName = formValue.PlanName;
      (planRequest as any).ImageUrl = formValue.ImageUrl || 'N/A';
      (planRequest as any).Goal = formValue.Goal;
      planRequest.Details = this.buildPlanDetails(true); 
    }

    this.wellnessService.assignWellnessPlan(planRequest).subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Plan assignment failed:', err);
        this.isSubmitting.set(false);
        alert(`Error assigning plan: ${err.message || 'Check console for details'}`);
        this.dialogRef.close(false); 
      },
      complete: () => {
        this.isSubmitting.set(false);
      }
    });
  }
}