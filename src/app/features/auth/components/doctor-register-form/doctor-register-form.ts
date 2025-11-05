import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { DoctorRegisterDto } from '../../models/auth.models';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-register-form',
  templateUrl: './doctor-register-form.html',
  styleUrls: ['./doctor-register-form.scss'],
  standalone: true,
  // Removed all Mat...Module imports
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class DoctorRegisterFormComponent {
  registerForm: FormGroup;
  isLoading = false;
  hidePassword = true;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group(
      {
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Specialization: ['', Validators.required],
        Education: ['', Validators.required],
        Email: ['', [Validators.required, Validators.email]],
        ContactNumber: ['', Validators.required],
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
    const payload: DoctorRegisterDto = this.registerForm.value;

    this.authService.registerDoctor(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
}