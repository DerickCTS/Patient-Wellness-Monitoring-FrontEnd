// src/app/feature/appointment-patient/services/appointment.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../shared/services/auth';
import {
  AppointmentStatusDto,
  AppointmentHistoryItemDto,
  SpecializationListDto, // <-- Add
  DoctorSlotDto,          // <-- Add
  BookAppointmentDto,     // <-- Add
  BookAppointmentResponseDto, // <-- Add
} from '../models/appointment.models';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private baseUrl = 'https://localhost:7129/api/appointment';
  private patientId: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    // We get the logged-in patient's ID from the AuthService
    // This assumes your AuthService has a 'getPatientId()' method
    this.patientId = this.authService.getPatientId() || '1'; 
  }

  /**
   * API Call: GET Appointment Status Check
   * [cite: 29]
   */
  getAppointmentStatus(): Observable<AppointmentStatusDto> {
    return this.http.get<AppointmentStatusDto>(
      `${this.baseUrl}/patient/${this.patientId}/status` // 
    );
  }

  /**
   * API: GET Patient Appointment History
   * 
   */
  getAppointmentHistory(): Observable<AppointmentHistoryItemDto[]> {
    return this.http.get<AppointmentHistoryItemDto[]>(
      `${this.baseUrl}/patient/${this.patientId}/history` // 
    );
  }

  /**
   * API: GET View Specialization
   * [cite: 103]
   */
  getSpecializations(): Observable<SpecializationListDto> {
    return this.http.get<SpecializationListDto>(
      `${this.baseUrl}/specializations`
    );
  }

  /**
   * API: GET Available slots for a specialization
   * [cite: 116]
   */
  getDoctorSlots(specialization: string): Observable<DoctorSlotDto[]> {
    return this.http.get<DoctorSlotDto[]>(
      `${this.baseUrl}/doctors/slots/specialization/${specialization}`
    );
  }

  /**
   * API: POST Book A Slot
   * [cite: 142]
   */
  bookAppointment(
    payload: BookAppointmentDto
  ): Observable<BookAppointmentResponseDto> {
    return this.http.post<BookAppointmentResponseDto>(
      `${this.baseUrl}/book`,
      payload
    );
  }
}

// We will add the APIs for the modal in Part 2