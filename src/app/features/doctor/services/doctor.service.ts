import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { 
  DashboardData, DoctorProfile 
} from '../models/doctor.models';

const API_URL = 'https://localhost:7129/api/doctor/dashboard'; 
const LOGGED_IN_DOCTOR_ID = 0;
const USE_MOCK_DATA = true;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private readonly doctorId: number = 1;
  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${API_URL}/stats`);
  }

  getDoctorProfile(): Observable<DoctorProfile> {
    return this.http.get<DoctorProfile>(`${API_URL}/profile`);
  }
  
}

