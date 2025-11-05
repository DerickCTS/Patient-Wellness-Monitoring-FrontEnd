// src/app/features/auth/models/auth.models.ts

// --- API Call 1: POST /RegisterPatient ---
export interface PatientRegisterDto {
  FirstName: string;
  LastName: string;
  DateOfBirth: string; // Will be in 'YYYY-MM-DD' format
  Gender: string;
  BloodGroup: string;
  ContactNumber: string;
  Email: string;
  Address: string;
  EmergencyContactNumber: string;
  EmergencyContactName: string;
  Password: string;
  ConfirmPassword: string;
}

// --- API Call 2: POST /RegisterDoctor ---
export interface DoctorRegisterDto {
  FirstName: string;
  LastName: string;
  Specialization: string; // Per your JSON, this is a string
  Education: string;
  Email: string;
  ContactNumber: string;
  Password: string;
  ConfirmPassword: string;
}

// --- API Call 3: POST /login ---
export interface LoginRequestDto {
  Email: string;
  Password: string;
  Role: 'Patient' | 'Doctor';
}

// --- Common API Response Payloads ---
export interface AuthSuccessDto {
  message: string;
}
// --- NEW: API Response for Successful Login ---
// This is the updated response we assume you're adding
export interface LoginSuccessDto {
  message: string;
  patientId?: number; // The '?' makes it optional
  doctorId?: number;  // The '?' makes it optional
}
export interface AuthErrorDto {
  message: string;
}