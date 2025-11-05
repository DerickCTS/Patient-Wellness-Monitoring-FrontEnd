// src/app/features/wellness/services/wellness.service.ts

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignScratchPlanDto, AssignTemplatePlanDto, DiagnosisDetailsDto, ImageUploadResponseDto, PatientFullDetailsDto, PatientSearchResultDto, WellnessTemplateDto } from '../models/wellness-assignment.model';
import { AuthService } from '../../auth/services/auth'; // <-- Import Auth Service
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanDetailsDto } from '../../wellness/models/plan.dto';

@Injectable({
  providedIn: 'root',
})
export class WellnessService {
  // IMPORTANT: Make sure this base URL is correct
  private baseUrl = 'https://localhost:7129/api/Doctor';
  private planUrl = 'https://localhost:7129/api/WellnessPlan'; // <-- New URL
  private progressBaseUrl = 'https://localhost:7129/api/progress';
  // This is the full base URL for your .NET server (for images)
  private serverBaseUrl = 'https://localhost:7129';

  constructor(private http: HttpClient, private authService: AuthService,
    private snackBar: MatSnackBar ) {}

  /**
   * API Call 1: Search for patients by name or ID
   */
  searchPatients(
    searchType: 'patientName' | 'patientId',
    query: string
  ): Observable<PatientSearchResultDto[]> {
    
    // Create query parameters
    let params = new HttpParams();
    if (searchType === 'patientName') {
      params = params.set('patientName', query);
    } else {
      params = params.set('patientId', query);
    }

    return this.http.get<PatientSearchResultDto[]>(
      `${this.baseUrl}/patient/search`,
      { params }
    );
  }
  // src/app/features/wellness/services/wellness.service.ts
// ... (constructor and searchPatients methods are above this)

  /**
   * API Call 2: Get Patient Full Details
   */
  getPatientFullDetails(patientId: number): Observable<PatientFullDetailsDto> {
    return this.http.get<PatientFullDetailsDto>(
      `${this.baseUrl}/patients/${patientId}`
    );
  }

  /**
   * API Call 3: Get Diagnosis Details
   */
  getDiagnosisDetails(diagnosisId: number): Observable<DiagnosisDetailsDto> {
    // NOTE: Your API endpoint was /api/doctor/1/details
    // I am assuming the '1' was the diagnosisId.
    return this.http.get<DiagnosisDetailsDto>(
      `${this.baseUrl}/${diagnosisId}/details`
    );
  }

  /**
   * API Call 4: Get Wellness Plan Details
   * This is the one we use for the popup.
   */
  getPlanDetails(planId: number): Observable<PlanDetailsDto> {
    // Note: Your API endpoint was from a different service.
    return this.http.get<PlanDetailsDto>(
      `${this.progressBaseUrl}/plans/${planId}/details`
    );
  }
  /**
   * API Call 5: Get Wellness Plan Templates
   */
  getTemplates(): Observable<WellnessTemplateDto[]> {
    return this.http.get<WellnessTemplateDto[]>(`${this.planUrl}/templates`);
  }

  /**
   * API Call 7 (Template): Assign a plan from a template
   */
  assignTemplatePlan(
    payload: AssignTemplatePlanDto
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.planUrl}/assign`,
      payload
    );
  }

  /**
   * API Call 7 (Scratch): Assign a plan created from scratch
   */
  assignScratchPlan(
    payload: AssignScratchPlanDto
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.planUrl}/assign`,
      payload
    );
  }

  /**
   * API Call 8: Upload a new plan image
   */
  uploadPlanImage(file: File): Observable<ImageUploadResponseDto> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    // We need to create this API endpoint on your backend
    return this.http.post<ImageUploadResponseDto>(
      `${this.planUrl}/upload-image`,
      formData
    );
  }

  // --- HELPER FUNCTIONS ---

  getDoctorId(): string | null {
    return this.authService.getDoctorId();
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: 'success-snackbar',
    });
  }
  
  showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: 'error-snackbar',
    });
  }
// ... (getFullImageUrl method is below this)

  /**
   * Helper function to build the full image URL
   * We will use this in the component
   */
  getFullImageUrl(relativePath: string): string {
    if (!relativePath) {
      return ''; // or a path to a default placeholder image
    }
    // As we discussed, this joins the server URL with the relative path
    return this.serverBaseUrl + relativePath;
  }
  
  // We will add more API calls here in Part 2
}