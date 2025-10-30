import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DiseaseDto, NewDiagnosisDto } from '../../models/diagnosis.dto';
import { DiagnosisService } from '../../services/diagnosis';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-diagnosis-form',
  templateUrl: './diagnosis-form.html',
  styleUrls: ['./diagnosis-form.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
})
export class DiagnosisFormComponent implements OnInit {
  // These are "events" this component sends *out* to its parent
  @Output() diagnosisSaved = new EventEmitter<NewDiagnosisDto>();
  @Output() cancel = new EventEmitter<void>();

  diagnosisForm: FormGroup;
  diseases$!: Observable<DiseaseDto[]>;

  constructor(
    private fb: FormBuilder,
    private diagnosisService: DiagnosisService
  ) {
    // Create the form with validation
    this.diagnosisForm = this.fb.group({
      DiseaseId: [null, [Validators.required]],
      Description: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void {
    // Load the disease list for the dropdown
    this.diseases$ = this.diagnosisService.getDiseases();
  }

  onSave(): void {
    if (this.diagnosisForm.invalid) {
      this.diagnosisForm.markAllAsTouched(); // Show errors
      return;
    }

    // Send the form value up to the parent page
    this.diagnosisSaved.emit(this.diagnosisForm.value);
    this.diagnosisForm.reset();
  }

  onCancel(): void {
    this.cancel.emit();
    this.diagnosisForm.reset();
  }
}