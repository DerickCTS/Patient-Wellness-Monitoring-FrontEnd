// src/app/features/patient-dashboard/services/patient-dashboard.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PatientDashboardData,
  UpdateProfileInputDto,
  UpdateProfileResponseDto,
} from '../../../core/models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class PatientDashboardService { // Updated Class Name
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7129/api/PatientDashboard';

  /**
   * API Call 1: Gets all dashboard data in a single call.
   * GET: https://localhost:7129/api/PatientDashboard/Data
   */
  getDashboardData(patientId: number): Observable<PatientDashboardData> {
    return this.http.get<PatientDashboardData>(`${this.baseUrl}/Data`, {
      params: { patientId: patientId.toString() }
    });
  }

  /**
   * API Call 2: Posts updated profile information.
   * POST: api/PatientDashboard/Profile
   */
  updateProfile(
    profile: UpdateProfileInputDto
  ): Observable<UpdateProfileResponseDto> {
    return this.http.post<UpdateProfileResponseDto>(
      `${this.baseUrl}/Profile`,
      profile
    );
  }
}