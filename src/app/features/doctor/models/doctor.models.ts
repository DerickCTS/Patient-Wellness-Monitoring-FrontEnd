// --- 1. Summary Data Structures (for Stat Cards & Modals) ---

import { NumberValueAccessor } from "@angular/forms";

// Derick's Models
export interface Stats {
  totalPatients: number;
  todaysAppointments: number;
  activePrescriptions: number;
  totalWellnessPlans: number;
  completedToday: number;
}

export interface WeeklyAppointmentSummaryItem {
  day: string;
  approved: number;
  rejected: number;
}

export interface WeeklyScheduleSummaryItem {
  day: string;
  startTime: string;
  endTime: string;
}

export interface TodaysAppointment{
  profileUrl: string;
  patientName: string;
  patientAge: number;
  appointmentStartTime: string;
  reason: string;
  status: string;
}

export interface RecentPrescription{
  medicationName: string;
  patientName: string;
  dosage: string;
  frequency: number;
  medicationStartDate: string;
  medicationEndDate: string;
}

// --- 3. Full Dashboard Data Structure ---
export interface DashboardData {
  stats: Stats;
  weeklyAppointmentSummary: WeeklyAppointmentSummaryItem[];
  weeklyScheduleSummary: WeeklyScheduleSummaryItem[];
  todaysAppointment: TodaysAppointment[];
  recentPrescription: RecentPrescription[];
}

// --- 4. Doctor Profile (from Doctors table) ---
export interface DoctorProfile {
  doctorId: string;
  firstName: string;
  lastName: string;
  specialty: string;
  email: string;
  contactNumber: string;
  licenseNumber: string | null;
  education: string;
  joined: Date | string;
}