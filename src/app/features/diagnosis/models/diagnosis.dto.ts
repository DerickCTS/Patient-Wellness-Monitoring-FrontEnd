// src/app/features/diagnosis/models/diagnosis.models.ts

// --- API Call 1: GET /diagnosis/today ---
export interface TodaysAppointmentDto {
  appointmentId: number;
  patientName: string;
  gender: string;
  age: number;
  appointmentTime: string;
  contactNumber: string;
  patientId: number;
  chiefComplaint: string;
}

// --- API Call 2: GET /diagnosis/appointment/{id} ---
export interface AppointmentDetailsDto {
  patientInfo: PatientInfoDto;
  existingDiagnoses: ExistingDiagnosisDto[];
  existingPrescriptions: ExistingPrescriptionDto[];
}

export interface PatientInfoDto {
  name: string;
  patientId: number;
  age: number;
  dateOfBirth: string; // or Date
  gender: string;
  contactNumber: string;
  email: string;
  address: string;
  emergencyContact: string;
  chiefComplaint: string;
}

export interface ExistingDiagnosisDto {
  diseaseName: string;
  description: string;
}

export interface ExistingPrescriptionDto {
  medicationName: string;
  dosage: string;
}

// --- API Call 3: POST /diagnosisapi/appointment/{id}/save ---
export interface SaveDiagnosisDto {
  Diagnoses: NewDiagnosisDto[];
  Prescriptions: NewPrescriptionDto[];
}

export interface NewDiagnosisDto {
  DiseaseId: number;
  Description: string;
}

export interface NewPrescriptionDto {
  MedicationName: string;
  Dosage: string;
  StartDate: string; // or Date
  EndDate: string;   // or Date
  Instructions: string | null;
  Schedules: NewScheduleDto[];
}

export interface NewScheduleDto {
  TimeOfDay: string;
  Quantity: number;
}

// --- API Call 4: GET /diagnosis/diseases ---
export interface DiseaseDto {
  diseaseId: number;
  diseaseName: string;
}