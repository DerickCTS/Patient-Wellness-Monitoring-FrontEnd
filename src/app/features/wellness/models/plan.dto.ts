// Interface for the card list (API 1)
export interface PlanAssignmentDto {
  assignmentId: number;
  imageUrl: string;
  planName: string;
  category: string;
  status: 'Pending' | 'Completed' | 'Inactive';
  dueDate: string;
  taskLogId: number;
}

// Interface for the details modal (API 2)
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

// Interface for updating status (API 3)
export interface UpdateTaskStatusDto {
  isComplete: boolean;
  patientNotes: string;
}
