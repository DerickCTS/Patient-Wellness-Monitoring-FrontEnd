// Enums for clarity and type safety
export enum AppointmentStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

// Data model for a Doctor (used within an Appointment)
export interface Doctor {
  id: number;
  name: string;
  qualifications: string; // e.g., MD, FACP, FAAOS
  specialization: string;
  experienceYears: number;
}

// Data model for an Appointment slot (for booking)
export interface TimeSlot {
  date: string; // ISO date string or formatted string e.g., 'Oct 15, 2025'
  time: string; // e.g., '10:00 AM'
}

// Main Data Model for an Appointment
export interface Appointment {
  id: number;
  patientId: number;
  doctor: Doctor;
  status: AppointmentStatus;
  date: string; // e.g., 'Oct 15, 2025'
  time: string; // e.g., '2:30 PM'
  reason: string; // The reason for visit / chief complaint
  requestedOn: string; // Date the request was submitted
  rejectionReason?: string; // Only present if status is Rejected
}

// Data model for the Appointment Booking Form payload
export interface AppointmentForm {
  patientId: number;
  doctorId: number | null;
  specialization: string;
  date: string;
  time: string;
  reason: string;
}
