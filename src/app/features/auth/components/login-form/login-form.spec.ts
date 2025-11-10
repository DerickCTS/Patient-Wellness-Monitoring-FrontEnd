import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth';
// Import only core modules:
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRequestDto } from '../../models/auth.models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.scss'],
  standalone: true,
  // Only CommonModule and ReactiveFormsModule are needed for pure HTML/CSS forms
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class LoginFormComponent implements OnInit {
  // This component will receive the role from its parent
  @Input() role!: 'Patient' | 'Doctor';
  loginForm: FormGroup;
  isLoading = false;
  hidePassword = true; // For the password toggle

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    // Initialization logic
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.isLoading) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const payload: LoginRequestDto = {
      ...this.loginForm.value,
      Role: this.role, // Pass the role received via @Input
    };

    this.authService.login(payload).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.isLoading = false;
        // Navigation logic goes here
      },
      error: (error) => {
        console.error('Login failed', error);
        this.isLoading = false;
      },
    });
  }
}