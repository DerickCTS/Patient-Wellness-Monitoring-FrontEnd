// src/app/feature/appointment-patient/models/appointment.models.ts

// --- API Call: GET Appointment Status Check ---
// [cite: 29]
export interface AppointmentStatusDto {
  approved: AppointmentItemDto[]; // [cite: 33]
  pending: AppointmentItemDto[];  // [cite: 53]
  rejected: AppointmentItemDto[]; // [cite: 73]
}

export interface AppointmentItemDto {
  appointmentId: number;         // [cite: 35]
  appointmentDate: string;       // [cite: 36]
  reason: string;                // [cite: 37]
  status: 'Confirmed' | 'Pending Approval' | 'Rejected'; // [cite: 38, 58, 78]
  rejectionReason: string | null; // [cite: 39]
  doctorName: string;            // [cite: 40]
  specialization: string;        // [cite: 41]
}

// --- API Call: GET Patient Appointment History ---
// 
export interface AppointmentHistoryItemDto {
  appointmentDate: string;   // [cite: 161]
  appointmentTime: string;   // [cite: 162]
  doctorName: string;        // [cite: 163]
  specialization: string;    // [cite: 164]
  reason: string;            // [cite: 165]
  status: string;            // [cite: 166]
}

// src/app/feature/appointment-patient/models/appointment.models.ts

// ... (existing DTOs)

// --- API Call: GET View Specialization ---
//
export type SpecializationListDto = string[];

// --- API Call: GET Available slots ---
//
export interface DoctorSlotDto {
  doctorID: number;           //
  name: string;               //
  specialization: string;     //
  experienceYears: number;    //
  education: string;          //
  availableSlots: SlotDto[];  //
}

export interface SlotDto {
  slotID: number;           //
  startDateTime: string;    //
  dateString: string;       //
  timeString: string;       //
}

// --- API Call: POST Book A Slot ---
//
export interface BookAppointmentDto {
  PatientID: string;
  DoctorID: string;
  SlotId: number;
  Reason: string;
}

//
export interface BookAppointmentResponseDto {
  id: number;
  message: string;
}