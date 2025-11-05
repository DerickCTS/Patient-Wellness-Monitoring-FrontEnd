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
  LoginSuccessDto,
  AuthErrorDto,
} from '../models/auth.models';

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
          this.showSuccess(response.message);
          // --- Store the user's role on successful login ---
          this.saveRole(payload.Role);
          
          // --- Redirect to a dashboard (we'll create this later) ---
          // For now, redirecting to your existing /diagnosis page
          if (payload.Role === 'Doctor') {
            this.router.navigate(['/diagnosis']);
          } else {
            // We need to create a patient dashboard, for now, progress
            this.router.navigate(['/progress']);
          }

        }),
        catchError(this.handleError.bind(this))
      );
  }

  // src/app/features/auth/services/auth.service.ts

// ... (inside the AuthService class)

// This is the method we will call
public getDoctorId(): string | null {
  // In your real service, you will get this from
  // the JSON response you saved during login.
  // For now, I will hardcode '1' for testing.
  return '1'; // <<< --- !! REPLACE THIS WITH YOUR REAL LOGIC !!

  // Your real logic might be:
  // const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  // return user.doctorId || null;
}
  // --- Helper Functions ---

  private saveRole(role: 'Patient' | 'Doctor'): void {
    localStorage.setItem('userRole', role);
  }

  // You can call this from your logout button later
  public logout(): void {
    localStorage.removeItem('userRole');
    this.router.navigate(['/auth']); // Navigate to login page
  }

  public getRole(): string | null {
    return localStorage.getItem('userRole');
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


//------------------
// src/app/features/auth/services/auth.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Observable, catchError, tap, throwError } of 'rxjs';
// import {
//   PatientRegisterDto,
//   DoctorRegisterDto,
//   LoginRequestDto,
//   AuthSuccessDto,
//   LoginSuccessDto, // <-- Import the new DTO
//   AuthErrorDto,
// } from '../models/auth.models';

// // Key for storing user data in localStorage
// const USER_SESSION_KEY = 'userSession';

// // Interface for the data we will store
// interface UserSession {
//   role: 'Patient' | 'Doctor';
//   id: number; // This will be either patientId or doctorId
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private baseUrl = 'https://localhost:7129/api/Auth';

//   constructor(
//     private http: HttpClient,
//     private snackBar: MatSnackBar,
//   private router: Router
//   ) {}

//   /**
//    * API Call 1: Register Patient
//    */
//   registerPatient(
//     payload: PatientRegisterDto
//   ): Observable<AuthSuccessDto> {
//     return this.http
//       .post<AuthSuccessDto>(`${this.baseUrl}/RegisterPatient`, payload)
//       .pipe(
//         tap((response) => this.showSuccess(response.message)),
//         catchError(this.handleError.bind(this))
//       );
//   }

//   /**
//    * API Call 2: Register Doctor
//    */
//   registerDoctor(
//     payload: DoctorRegisterDto
//   ): Observable<AuthSuccessDto> {
//     return this.http
//       .post<AuthSuccessDto>(`${this.baseUrl}/RegisterDoctor`, payload)
//       .pipe(
//         tap((response) => this.showSuccess(response.message)),
//         catchError(this.handleError.bind(this))
//       );
//   }

//   /**
//    * API Call 3: Login
//    * --- THIS IS THE UPDATED METHOD ---
//    */
//   login(payload: LoginRequestDto): Observable<LoginSuccessDto> {
//     return this.http
//       .post<LoginSuccessDto>(`${this.baseUrl}/login`, payload)
//       .pipe(
//         tap((response) => {
//           this.showSuccess(response.message);

//           // Determine the ID from the response
//           const id = payload.Role === 'Doctor' ? response.doctorId : response.patientId;

//           if (!id) {
//             console.error('Login response did not include an ID!');
//             this.showError('Login failed: User ID not found in response.');
//             return;
//           }

//           // --- Save the user session ---
//           this.saveUserSession({ role: payload.Role, id: id });

//           // --- Redirect based on role ---
//           if (payload.Role === 'Doctor') {
//             this.router.navigate(['/wellness']); // Or '/diagnosis'
//           } else {
//             this.router.navigate(['/progress']); // Or a patient dashboard
//           }
//         }),
//         catchError(this.handleError.bind(this))
//       );
//   }

//   // --- Session & Helper Functions (UPDATED) ---

//   private saveUserSession(session: UserSession): void {
//     // We stringify the object to store it
//     localStorage.setItem(USER_SESSION_KEY, JSON.stringify(session));
//   }

//   private getSession(): UserSession | null {
//     const session = localStorage.getItem(USER_SESSION_KEY);
//     if (!session) {
//       return null;
//     }
//     return JSON.parse(session) as UserSession;
//   }

//   public logout(): void {
//     localStorage.removeItem(USER_SESSION_KEY);
//     this.router.navigate(['/auth']);
//   }

//   /**
//    * This is the REAL getDoctorId method that WellnessService will use.
//    */
//   public getDoctorId(): string | null {
//     const session = this.getSession();
//     if (session && session.role === 'Doctor') {
//       return session.id.toString();
//     }
//     return null;
//   }
  
//   /**
//    * We'll add this for when you build the patient modules.
//    */
//   public getPatientId(): string | null {
//     const session = this.getSession();
//     if (session && session.role === 'Patient') {
//       return session.id.toString();
//     }
//     return null;
//   }

//   public getRole(): string | null {
//     return this.getSession()?.role || null;
//   }

//   // --- Error & Success Message Handling ---

//   private handleError(error: HttpErrorResponse): Observable<never> {
//     const errorMsg =
//       (error.error as AuthErrorDto)?.message ||
//       'An unknown error occurred. Please try again.';

//     this.showError(errorMsg);
//     return throwError(() => new Error(errorMsg));
//   }

//   private showSuccess(message: string): void {
//     this.snackBar.open(message, 'Close', {
//       duration: 3000,
//       panelClass: 'success-snackbar',
//     });
//   }

//   private showError(message: string): void {
//     this.snackBar.open(message, 'Close', {
//       duration: 5000,
//       panelClass: 'error-snackbar',
//     });
//   }
// }