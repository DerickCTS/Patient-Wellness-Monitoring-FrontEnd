// --- 1. Summary Data Structures (for Stat Cards & Modals) ---

export interface PatientSummary {
  totalCount: number;
  percentageChange: number;
  newThisMonth: number;
  activePatients: number;
  inactivePatients: number;
}

export interface AppointmentSummary {
  total: number;
  scheduled: number;
  inProgress: number;
  completed: number;
  pending: number;
  remaining: number; 
}

export interface PrescriptionSummary {
  totalActive: number;
  percentageChange: number;
  newThisWeek: number;
  expiringSoon: number;
}

export interface WellnessPlanSummary {
  totalCount: number;
  percentageChange: number;
  active: number;
  pending: number;
  completed: number;
}

// --- 2. List Item Structures (Appointments, Prescription) ---

export interface Appointment {
  appointmentId: number; 
  patientId: number;
  patientName: string;
  patientAge: string; 
  time: string;
  date: string; // Added for display in panel
  reason: string;
  status: 'Scheduled' | 'InProgress' | 'Completed' | 'Pending';
  duration: string;
  patientPhone: string;
  patientEmail: string;
  notes: string;
}

export interface Prescription {
  prescriptionId: number;
  medicationName: string;
  patientName: string;
  dosage: string;
  frequency: string;
  dateRange: string;
  status: 'Active' | 'Expired' | 'New';
}

// --- 3. Full Dashboard Data Structure ---
export interface DashboardData {
  patients: PatientSummary;
  appointments: AppointmentSummary;
  prescriptions: PrescriptionSummary;
  wellnessPlans: WellnessPlanSummary;
  todayAppointmentsList: Appointment[];
  recentPrescriptions: Prescription[];
  // Placeholders for chart data
  weeklyAppointmentsChart: any; 
  patientTrendsChart: any; 
}

// --- 4. Doctor Profile (from Doctors table) ---
export interface DoctorProfile {
  doctorId: number;
  firstName: string;
  lastName: string;
  specialty: string;
  email: string;
  contactNumber: string;
  licenseNumber: string | null;
  education: string;
  registeredSince: Date | string; 
  joined: Date | string;
}