// src/app/core/models/dashboard.models.ts

import { UpComingAppointmentDto } from "../../features/patient-dashboard/models/dashboard.models";

// --- API Call 1: GET: api/PatientDashboard/Data

export interface PatientProfileDto {
  fullName: string;
  patientId: number;
  email: string;
  contactNumber: string;
  dateOfBirth: string; // ISO Date string
  gender: string;
  address: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  registrationDate: string; // ISO Date string
}

export interface PersonalDoctorDto {
  fullName: string | null;
  specialization: string | null;
  doctorId: number;
  qualification: string | null;
  patientSince: string; // ISO Date string
  totalVisits: number;
  lastVisit: string; // ISO Date string
  //languages: string | null;
  //latestNote: string | null;
}

export interface PrescriptionDto {
  prescriptionId: number;
  medicationName: string;
  dosageAndInstructions: string;
  endDate: string; // ISO Date string
  status: string;
}

export interface RecentActivityDto {
  dueDate: string; // ISO Date string
  taskName: string;
  status: string;
}

export interface WellnessProgressDto {
  planName: string;
  goal: string;
  progressPercentage: number;
  motivationQuote: string;
}

export interface PatientDashboardData {
  patientProfile: PatientProfileDto;
  personalDoctor: PersonalDoctorDto;
  upcomingAppointments: UpComingAppointmentDto[]; // Based on your API structure
  activePrescriptions: PrescriptionDto[];
  recentActivities: RecentActivityDto[];
}

// --- API Call 2: Post Profile Input

export interface UpdateProfileInputDto {
  patientId: number;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  address: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  gender: string;
}

// --- API Call 2: Post Profile Output

export interface UpdateProfileResponseDto {
  message: string;
}

// --- API Call 3: GET Appointments (C# DTO)
export interface AppointmentSummaryDto {
  appointmentId: number;
  title: string;
  doctorName: string;
  appointmentDateTime: string; // ISO Date string
  status: string;
  description: string;
}