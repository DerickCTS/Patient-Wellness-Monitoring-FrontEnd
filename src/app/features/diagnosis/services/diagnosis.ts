// src/app/features/diagnosis/services/diagnosis.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TodaysAppointmentDto,
  AppointmentDetailsDto,
  SaveDiagnosisDto,
  DiseaseDto,
} from '../models/diagnosis.dto';

@Injectable({
  providedIn: 'root',
})
export class DiagnosisService {
  // IMPORTANT: Make sure this base URL is correct for your backend
  private baseUrl = 'https://localhost:7129/api/diagnosis';

  constructor(private http: HttpClient) {}

  /**
   * API Call 1: Get Today's Appointments
   */
  getTodaysAppointments(): Observable<TodaysAppointmentDto[]> {
    return this.http.get<TodaysAppointmentDto[]>(`${this.baseUrl}/today`);
  }

  /**
   * API Call 2: Get Appointment Details
   */
  getAppointmentDetails(appointmentId: number): Observable<AppointmentDetailsDto> {
    return this.http.get<AppointmentDetailsDto>(
      `${this.baseUrl}/appointment/${appointmentId}`
    );
  }

  /**
   * API Call 4: Get List of Diseases
   */
  getDiseases(): Observable<DiseaseDto[]> {
    return this.http.get<DiseaseDto[]>(`${this.baseUrl}/diseases`);
  }

  /**
   * API Call 3: Save Appointment Diagnosis
   */
  saveDiagnosis(
    appointmentId: number,
    payload: SaveDiagnosisDto
  ): Observable<{ message: string }> {
    // Note: The URL was different in your prompt.
    // POST http://localhost:5287/api/diagnosisapi/appointment/6/save
    // I am using the 'appointmentId' variable instead of a hardcoded '6'
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/appointment/${appointmentId}/save`,
      payload
    );
  }
}