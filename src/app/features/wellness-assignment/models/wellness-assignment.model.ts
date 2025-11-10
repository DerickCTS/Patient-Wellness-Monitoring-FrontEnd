// src/app/features/wellness/models/wellness.models.ts

// --- API Call 1: GET /Doctor/patient/search ---
export interface PatientSearchResultDto {
  patientId: number;
  firstName: string;
  lastName: string;
  gender: string;
  profileImage: string;
  bloodGroup: string;
}

// --- API Call 2: GET /doctor/patients/{id} ---
export interface PatientFullDetailsDto {
  patientId: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  contactNumber: string;
  address: string;
  emergencyContactNumber: string;
  emergencyContactName: string;
  personalizedDoctor: string;
  diagnoses: DiagnosisHistoryItemDto[];
  wellnessPlans: AssignedWellnessPlanDto[]; // <-- This uses the interface below
  profileImage: string;
}

export interface DiagnosisHistoryItemDto {
  diseaseName: string;
  diagnosisId: number;
  doctorName: string;
  diagnosisDate: string;
}

export interface AssignedWellnessPlanDto {
  planId: number; // <--- THIS IS THE FIX YOU MADE
  planName: string;
  goal: string;
  status: string;
  planImage: string;
  category: string;
  wellnessType: string;
}

// --- API Call 3: GET /doctor/{diagnosisId}/details ---
export interface DiagnosisDetailsDto {
  diagnosedBy: string;
  diseaseDescription: string;
  diagnosisDescription: string;
  medicationDetails: MedicationDetailDto[];
}

export interface MedicationDetailDto {
  medicationName: string;
  dosage: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

// --- API Call 4 & 6: GET /progressapi/plans/{id}/details ---
// This is the new model for our popup
export interface PlanDetailsDto {
  imageUrl: string;
  planName: string;
  goal: string;
  assignedByDoctorName: string;
  frequency: string;
  description: string;
  instructions: string[];
  benefits: string[];
  safetyPrecautions: string[];
}

// src/app/features/wellness/models/wellness.models.ts

// --- API Call 5: GET /WellnessPlan/templates ---
export interface WellnessTemplateDto {
  planId: number;
  planName: string;
  goal: string;
  imageUrl: string;
}

// --- API Call 6: GET /progressapi/plans/{id}/details ---
// We already defined 'PlanDetailsDto' for this in Part 3.

// --- API Call 7 (Template): POST /WellnessPlan/assign ---
export interface AssignTemplatePlanDto {
  PlanId: string;
  PatientId: string;
  DoctorId: string;
  Category: string; // We'll need a dropdown for this
  FrequencyCount: number;
  FrequencyUnit: string; // And this
  StartDate: string; // 'YYYY-MM-DDTHH:mm:ss'
  EndDate: string; // 'YYYY-MM-DDTHH:mm:ss'
  Details: PlanDetailItemDto[];
  DetailsModified: boolean;
}

// --- API Call 7 (Scratch): POST /WellnessPlan/assign ---
export interface AssignScratchPlanDto {
  PatientId: string;
  DoctorId: string;
  Category: string;
  PlanName: string;
  ImageUrl: string; // This comes from API 8
  Goal: string;
  FrequencyCount: number;
  FrequencyUnit: string;
  StartDate: string;
  EndDate: string;
  Details: PlanDetailItemDto[];
}

export interface PlanDetailItemDto {
  detail_type: 'Instruction' | 'Safety' | 'Benefits' | 'Description'; // Description is a guess, based on your UI
  content: string;
}

// --- API Call 8 (New): POST /WellnessPlan/upload-image ---
export interface ImageUploadResponseDto {
  imageUrl: string; // e.g., "/images/custom/new-plan-xyz.png"
}