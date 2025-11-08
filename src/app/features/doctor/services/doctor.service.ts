import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { 
  DashboardData, DoctorProfile, Appointment, PatientSummary, 
  AppointmentSummary, PrescriptionSummary, WellnessPlanSummary 
} from '../models/doctor.models';

const API_URL = '/api/doctor'; 
const LOGGED_IN_DOCTOR_ID = 1;
const USE_MOCK_DATA = true;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<DashboardData> {
    if (USE_MOCK_DATA) {
      return of(MOCK_DASHBOARD_DATA).pipe(delay(500));
    }
    return this.http.get<DashboardData>(`${API_URL}/${LOGGED_IN_DOCTOR_ID}/dashboard-summary`);
  }

  getDoctorProfile(): Observable<DoctorProfile> {
    if (USE_MOCK_DATA) {
      return of(MOCK_PROFILE_DATA).pipe(delay(300));
    }
    return this.http.get<DoctorProfile>(`${API_URL}/${LOGGED_IN_DOCTOR_ID}/profile`);
  }

  getPatientBreakdown(): Observable<PatientSummary> {
    if (USE_MOCK_DATA) {
      return of(MOCK_DASHBOARD_DATA.patients).pipe(delay(200));
    }
    return this.http.get<PatientSummary>(`${API_URL}/${LOGGED_IN_DOCTOR_ID}/stats/patients`);
  }

  getAppointmentsBreakdown(): Observable<AppointmentSummary> {
    if (USE_MOCK_DATA) {
      return of(MOCK_DASHBOARD_DATA.appointments).pipe(delay(200));
    }
    return this.http.get<AppointmentSummary>(`${API_URL}/${LOGGED_IN_DOCTOR_ID}/stats/appointments`);
  }
  
  getPrescriptionsBreakdown(): Observable<PrescriptionSummary> {
    if (USE_MOCK_DATA) {
      return of(MOCK_DASHBOARD_DATA.prescriptions).pipe(delay(200));
    }
    return this.http.get<PrescriptionSummary>(`${API_URL}/${LOGGED_IN_DOCTOR_ID}/stats/prescriptions`);
  }
  
  getWellnessBreakdown(): Observable<WellnessPlanSummary> {
    if (USE_MOCK_DATA) {
      return of(MOCK_DASHBOARD_DATA.wellnessPlans).pipe(delay(200));
    }
    return this.http.get<WellnessPlanSummary>(`${API_URL}/${LOGGED_IN_DOCTOR_ID}/stats/wellness`);
  }

  getAppointmentDetails(appointmentId: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${API_URL}/appointment/${appointmentId}`);
  }
  
  startConsultation(appointmentId: number): Observable<any> {
    return this.http.post(`${API_URL}/appointment/${appointmentId}/start`, {});
  }
}

const MOCK_DASHBOARD_DATA: DashboardData = {
  patients: {
    totalCount: 1247,
    percentageChange: 12.5,
    newThisMonth: 48,
    activePatients: 1189,
    inactivePatients: 58
  },
  appointments: {
    total: 18,
    scheduled: 12,
    inProgress: 2,
    completed: 4,
    pending: 6,
    remaining: 14
  },
  prescriptions: {
    totalActive: 342,
    percentageChange: 8.3,
    newThisWeek: 23,
    expiringSoon: 15
  },
  wellnessPlans: {
    totalCount: 156,
    percentageChange: 15.7,
    active: 128,
    pending: 18,
    completed: 10
  },
  todayAppointmentsList: [
    {
      appointmentId: 1001,
      patientId: 2345,
      patientName: 'Emily Rodriguez',
      patientAge: '34',
      time: '09:00 AM',
      date: '2024-01-15',
      reason: 'Annual Checkup',
      status: 'Completed',
      duration: '30 min',
      patientPhone: '+1-555-0123',
      patientEmail: 'emily.r@email.com',
      notes: 'Regular checkup completed'
    },
    {
      appointmentId: 1002,
      patientId: 2346,
      patientName: 'Michael Chen',
      patientAge: '45',
      time: '10:00 AM',
      date: '2024-01-15',
      reason: 'Follow-up Consultation',
      status: 'InProgress',
      duration: '45 min',
      patientPhone: '+1-555-0124',
      patientEmail: 'michael.c@email.com',
      notes: 'Reviewing test results'
    },
    {
      appointmentId: 1003,
      patientId: 2347,
      patientName: 'Sarah Thompson',
      patientAge: '28',
      time: '11:30 AM',
      date: '2024-01-15',
      reason: 'Cardiac Assessment',
      status: 'Scheduled',
      duration: '60 min',
      patientPhone: '+1-555-0125',
      patientEmail: 'sarah.t@email.com',
      notes: 'First time cardiac screening'
    },
    {
      appointmentId: 1004,
      patientId: 2348,
      patientName: 'James Wilson',
      patientAge: '52',
      time: '02:00 PM',
      date: '2024-01-15',
      reason: 'Blood Pressure Monitoring',
      status: 'Scheduled',
      duration: '30 min',
      patientPhone: '+1-555-0126',
      patientEmail: 'james.w@email.com',
      notes: 'Hypertension follow-up'
    },
    {
      appointmentId: 1005,
      patientId: 2349,
      patientName: 'Lisa Anderson',
      patientAge: '41',
      time: '03:00 PM',
      date: '2024-01-15',
      reason: 'Stress Test Review',
      status: 'Scheduled',
      duration: '45 min',
      patientPhone: '+1-555-0127',
      patientEmail: 'lisa.a@email.com',
      notes: 'Post-stress test consultation'
    }
  ],
  recentPrescriptions: [
    {
      prescriptionId: 5001,
      medicationName: 'Lisinopril 10mg',
      patientName: 'Robert Martinez',
      dosage: '10mg',
      frequency: 'Once daily',
      dateRange: 'Jan 10 - Feb 10',
      status: 'Active'
    },
    {
      prescriptionId: 5002,
      medicationName: 'Atorvastatin 20mg',
      patientName: 'Jennifer Lee',
      dosage: '20mg',
      frequency: 'Once daily at bedtime',
      dateRange: 'Jan 12 - Mar 12',
      status: 'Active'
    },
    {
      prescriptionId: 5003,
      medicationName: 'Metoprolol 50mg',
      patientName: 'David Brown',
      dosage: '50mg',
      frequency: 'Twice daily',
      dateRange: 'Jan 14 - Feb 14',
      status: 'Active'
    },
    {
      prescriptionId: 5004,
      medicationName: 'Aspirin 81mg',
      patientName: 'Patricia Garcia',
      dosage: '81mg',
      frequency: 'Once daily',
      dateRange: 'Jan 08 - Ongoing',
      status: 'Active'
    }
  ],
  weeklyAppointmentsChart: null,
  patientTrendsChart: null
};

const MOCK_PROFILE_DATA: DoctorProfile = {
  doctorId: 1,
  firstName: 'Sarah',
  lastName: 'Johnson',
  specialty: 'Cardiology',
  email: 'dr.sarah.johnson@hospital.com',
  contactNumber: '+1-555-0100',
  licenseNumber: 'MD-CAR-2015-8472',
  education: 'MD, Harvard Medical School',
  registeredSince: '2015-06-15',
  joined: '2015-07-01'
};
