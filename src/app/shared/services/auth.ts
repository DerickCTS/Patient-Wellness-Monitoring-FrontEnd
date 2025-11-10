// src/app/features/auth/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, catchError, tap, throwError } from 'rxjs';
import {
  PatientRegisterDto,
  DoctorRegisterDto,
  LoginRequestDto,
  AuthSuccessDto,
  AuthErrorDto,
} from '../../features/auth/models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // IMPORTANT: Make sure this base URL is correct
  private baseUrl = 'https://localhost:7129/api/Auth';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * API Call 1: Register Patient
   */
  registerPatient(
    payload: PatientRegisterDto
  ): Observable<AuthSuccessDto> {
    return this.http
      .post<AuthSuccessDto>(`${this.baseUrl}/RegisterPatient`, payload)
      .pipe(
        tap((response) => {
          this.showSuccess(response.message);
        }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * API Call 2: Register Doctor
   */
  registerDoctor(
    payload: DoctorRegisterDto
  ): Observable<AuthSuccessDto> {
    return this.http
      .post<AuthSuccessDto>(`${this.baseUrl}/RegisterDoctor`, payload)
      .pipe(
        tap((response) => {
          this.showSuccess(response.message);
        }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * API Call 3: Login
   */
  login(payload: LoginRequestDto): Observable<AuthSuccessDto> {
    return this.http
      .post<AuthSuccessDto>(`${this.baseUrl}/login`, payload)
      .pipe(
        tap((response) => {
          console.log(response);
          this.saveRole(payload.Role);
          console.log(response);
          // Store userId based on role
          sessionStorage.setItem('userId', response.userId);
          sessionStorage.setItem('firstName', response.firstName || '');
          sessionStorage.setItem('lastName', response.lastName || '');
          sessionStorage.setItem('specialization', response.specialization || '');
          sessionStorage.setItem('imageUrl', 'https://localhost:7129' + response.imageUrl || '');

          if (payload.Role === 'Doctor') {
            this.router.navigate(['/doctor-dashboard']);
          } else if (payload.Role === 'Patient') {
            this.router.navigate(['/progress']);
          }
        }),
        catchError(this.handleError.bind(this))
      );
  }

  // --- Helper Functions ---

  private saveRole(role: 'Patient' | 'Doctor'): void {
    sessionStorage.setItem('userRole', role);
  }

  public logout(): void {
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userId');
    this.router.navigate(['/home']);
  }

  public getRole(): string {
    return sessionStorage.getItem('userRole')?? '';
  }

  public getUserName(): string {
    return sessionStorage.getItem('firstName') + ' ' + sessionStorage.getItem('lastName');
  }

  public getPatientId(): string | null {
    return sessionStorage.getItem('userId');
  }

  public isAuthenticated(): boolean {
    return !!sessionStorage.getItem('userRole');
  }

  // --- Error & Success Message Handling ---

  private handleError(error: HttpErrorResponse): Observable<never> {
    // The backend returned an error (e.g., "Email already exists")
    const errorMsg =
      (error.error as AuthErrorDto)?.message ||
      'An unknown error occurred. Please try again.';

    this.showError(errorMsg);
    return throwError(() => new Error(errorMsg));
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: 'success-snackbar', // We can style this
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: 'error-snackbar', // We can style this
    });
  }
}