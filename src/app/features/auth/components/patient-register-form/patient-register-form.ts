import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth';
import { PatientRegisterDto } from '../../models/auth.models';
// Removed all Mat imports for pure HTML compatibility
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-register-form',
  templateUrl: './patient-register-form.html',
  styleUrls: ['./patient-register-form.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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
        // Set initial value to a string or empty string for type='date' in HTML
        DateOfBirth: ['', Validators.required], 
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
      // Use a static method reference for the validator
      { validators: PatientRegisterFormComponent.passwordMatchValidator }
    );
  }

  // ✅ CRITICAL FIX: Robust, static Custom Password Validator
  static passwordMatchValidator(form: FormGroup): { [key: string]: any } | null {
    const passwordControl = form.get('Password');
    const confirmPasswordControl = form.get('ConfirmPassword');

    // Return null if controls are missing or not fully ready (let required validators handle it)
    if (!passwordControl || !confirmPasswordControl || !passwordControl.value || !confirmPasswordControl.value) {
      // Ensure the 'mismatch' error is explicitly cleared if a value disappears
      if (confirmPasswordControl?.hasError('mismatch')) {
        confirmPasswordControl.setErrors(null);
      }
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      // Add 'mismatch' error to the ConfirmPassword control
      confirmPasswordControl.setErrors({ ...confirmPasswordControl.errors, mismatch: true });
      return { mismatch: true }; 
    } else {
      // Clear the 'mismatch' error from the control when they match
      if (confirmPasswordControl.hasError('mismatch')) {
        const errors = { ...confirmPasswordControl.errors };
        delete errors['mismatch'];
        confirmPasswordControl.setErrors(Object.keys(errors).length ? errors : null);
      }
      return null;
    }
  }

  onSubmit(): void {
    // 1. Force visual check and exit if still invalid
    if (this.registerForm.invalid || this.isLoading) {
      // Ensure all fields show their errors
      this.registerForm.markAllAsTouched();
      console.log('Form is invalid. Cannot submit.', this.registerForm);
      return;
    }

    this.isLoading = true;
    
    // 2. Prepare Payload
    const formValue = this.registerForm.value;
    const payload: PatientRegisterDto = {
      // Use spread operator to quickly copy all fields
      ...formValue,
      // Format DateOfBirth to YYYY-MM-DD string format expected by APIs
      DateOfBirth: new Date(formValue.DateOfBirth).toISOString().split('T')[0],
      Role: 'Patient', 
    };

    // 3. Service Call (This is where the account is created)
    console.log('Attempting to register Patient with payload:', payload);

    this.authService.registerPatient(payload).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('✅ Registration successful for patient:', response);
        alert('Patient Account Created Successfully! Check the console for the API response.');
      },
      error: (error) => {
        this.isLoading = false;
        console.error('❌ Registration failed:', error);
        alert('Registration failed. Check the console for API error details.');
      },
    });
  }
}