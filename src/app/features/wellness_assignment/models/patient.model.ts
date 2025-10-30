// For API Call 1: GET Patient Basic details
export interface PatientBasicDto {
  patientId: number;
  firstName: string;
  lastName: string;
  gender: string;
}

// Sub-DTOs for API Call 2
export interface DiagnosisDto {
  diseaseName: string;
  diagnosisId: number;
  doctorName: string;
  diagnosisDate: string;
}

export interface MedicationDto {
  medicationName: string;
  dosage: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface WellnessPlanSummaryDto {
  planName: string;
  frequencyCount: number;
  frequencyUnit: string;
  wellnessType: 'Custom' | 'General';
}

// For API Call 2: GET Patient Full details
export interface PatientFullDto {
  patientId: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  contactNumber: string;
  address: string;
  emergencyContact: string;
  personalizedDoctor: string;
  diagnoses: DiagnosisDto[];
  medications: MedicationDto[];
  wellnessPlans: WellnessPlanSummaryDto[];
}

// For API Call 3
export interface DiseaseDetailsDto {
  diseaseDescription: string;
  diagnosisDescription: string;
}