import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';

// --- ADD THESE IMPORTS ---
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginRequestDto } from '../../models/auth.models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.scss'],

  // --- ADD THIS 'imports' ARRAY ---
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
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
    // We already have the role from the @Input
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.isLoading) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const payload: LoginRequestDto = {
      ...this.loginForm.value,
      Role: this.role,
    };

    this.authService.login(payload).subscribe({
      next: (res) => {
        // The service handles success and redirection
        this.isLoading = false;
      },
      error: (err) => {
        // The service handles showing the error snackbar
        this.isLoading = false;
      },
    });
  }
}