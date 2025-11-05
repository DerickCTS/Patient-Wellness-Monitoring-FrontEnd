import { Signal } from "@angular/core";

// export enum AppointmentStatus = 'approved' | 'pending' | 'rejected' | 'completed';

export enum AppointmentStatus {
  Approved,
  Pending,
  Rejected,
  Completed
}

export interface Doctor {
  id: number; 
  name: string;
  specialization: string;
  qualifications: string;
  experienceYears: number;
}

export interface TimeSlot {
  date: string; // ISO Date String (e.g., '2025-11-20')
  time: string; // Time String (e.g., '10:00 AM')
  isAvailable: boolean;
}

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number | null;
  doctorName: string;
  specialty: string;
  date: string; // ISO date string
  time: string; // Time string (e.g., "10:00 AM")
  reason: string;
  status: AppointmentStatus;
  doctor: Doctor;
  requestedOn: String;
  rejectionReason: string | null; 
}

export interface AppointmentForm {
  patientId: number;
  doctorId: number | null; 
  specialization: string;
  date: string;
  time: string;
  reason: string;
}

export interface AppointmentServiceState {
  approvedAppointments: Signal<Appointment[]>;
  pendingAppointments: Signal<Appointment[]>;
  rejectedAppointments: Signal<Appointment[]>;
  pastAppointments: Signal<Appointment[]>;
}
