export interface PlanDetailDto {
  detail_type: 'Instruction' | 'Benefits' | 'Safety' | 'Description';
  content: string;
  PlanID: string; // The backend uses this field, so we include it.
}

// Base interface for the POST request body
export interface AssignPlanRequest {
  PatientId: string;
  DoctorId: string; // Assuming a fixed or globally available DoctorId for this flow
  Category: string;
  FrequencyCount: number;
  FrequencyUnit: string;
  StartDate: string;
  EndDate: string;
  Details: PlanDetailDto[];
  DetailsModified: boolean;
}

// For Assigning from Template (API Call 4 & 5)
export interface AssignTemplatePlanRequest extends AssignPlanRequest {
  PlanId: string;
  // PlanName, ImageUrl, Goal are not in the unmodified template payload,
  // but let's make them optional for flexibility.
  PlanName?: string;
  ImageUrl?: string;
  Goal?: string;
}

// For Assigning from Scratch (API Call 6)
export interface AssignCustomPlanRequest extends AssignPlanRequest {
  PlanName: string;
  ImageUrl: string;
  Goal: string;
  // PlanId is not needed for scratch
  PlanId?: string;
}

export interface ApiResponse {
  message: string;
}