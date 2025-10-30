import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { PatientRegisterDto } from '../../models/auth.models';

// --- ADD THESE IMPORTS ---
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-patient-register-form',
  templateUrl: './patient-register-form.html',
  styleUrls: ['./patient-register-form.scss'],

  // --- ADD THIS 'imports' ARRAY ---
  standalone: true,
  imports: [
    MatNativeDateModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
})
export class PatientRegisterFormComponent {
  registerForm: FormGroup;
  isLoading = false;
  hidePassword = true;

  // Dropdown options
  genders = ['Male', 'Female', 'Other'];
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group(
      {
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        DateOfBirth: [null, Validators.required],
        Gender: [null, Validators.required],
        BloodGroup: [null, Validators.required],
        ContactNumber: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        Address: ['', Validators.required],
        EmergencyContactName: ['', Validators.required],
        EmergencyContactNumber: ['', Validators.required],
        Password: ['', [Validators.required, Validators.minLength(6)]],
        ConfirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('Password')?.value;
    const confirmPassword = form.get('ConfirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.isLoading) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // Format the date before sending
    const formValue = this.registerForm.value;
    const payload: PatientRegisterDto = {
      ...formValue,
      DateOfBirth: new Date(formValue.DateOfBirth)
        .toISOString()
        .split('T')[0], // Format as 'YYYY-MM-DD'
    };

    this.authService.registerPatient(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        // The service shows the snackbar
        // The parent component will handle navigation
      },
      error: (err) => {
        this.isLoading = false;
        // The service shows the error
      },
    });
  }
}