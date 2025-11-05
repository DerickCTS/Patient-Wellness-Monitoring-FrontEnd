import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { Appointment, AppointmentStatus, Doctor, TimeSlot, AppointmentForm } from '../models/appointment.models';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  
  // --- MOCK DATA ---
  private mockDoctors: Doctor[] = [
    { id: 1, name: 'Dr. Michael Chen', qualifications: 'MD, FACP', specialization: 'General Medicine', experienceYears: 20 },
    { id: 2, name: 'Dr. Emily Rodriguez', qualifications: 'MD, FAAD', specialization: 'Dermatology', experienceYears: 14 },
    { id: 3, name: 'Dr. James Wilson', qualifications: 'MD, FAAOS', specialization: 'Orthopedics', experienceYears: 18 },
    { id: 4, name: 'Dr. Sarah Johnson', qualifications: 'MD, FACC', specialization: 'Cardiology', experienceYears: 12 },
    { id: 5, name: 'Dr. Patricia White', qualifications: 'MD, PhD, FAAN', specialization: 'Neurology', experienceYears: 16 },
    { id: 6, name: 'Dr. Robert Brown', qualifications: 'MD', specialization: 'General Medicine', experienceYears: 14 },
  ];
  
  private mockAppointments = signal<Appointment[]>(this.generateMockAppointments());

  // --- PUBLIC SIGNALS ---
  readonly allAppointments = this.mockAppointments.asReadonly();

  readonly approvedAppointments = computed(() =>
    this.mockAppointments().filter(a => a.status === AppointmentStatus.Approved)
  );
  readonly pendingAppointments = computed(() =>
    this.mockAppointments().filter(a => a.status === AppointmentStatus.Pending)
  );
  readonly rejectedAppointments = computed(() =>
    this.mockAppointments().filter(a => a.status === AppointmentStatus.Rejected)
  );
  readonly pastAppointments = computed(() =>
    this.mockAppointments().filter(a => a.status === AppointmentStatus.Completed)
  );

  // --- PUBLIC METHODS ---

  getDoctorById(id: number | null): Doctor | undefined {
    if (id === null) return undefined;
    return this.mockDoctors.find(d => d.id === id);
  }

  getDoctorsBySpecialization(specialization: string): Observable<Doctor[]> {
    const filtered = this.mockDoctors.filter(d => d.specialization === specialization);
    return of(filtered).pipe(delay(400)); // Simulate network delay
  }

  getSlotsForDoctor(doctorId: number, date: string): Observable<TimeSlot[]> {
    // Mock slots. In a real app, 'date' would be used in the API call.
    const mockSlots: TimeSlot[] = [
      { date: date, time: '09:00 AM' },
      { date: date, time: '09:30 AM' },
      { date: date, time: '11:00 AM' },
      { date: date, time: '02:00 PM' },
    ];
    return of(mockSlots).pipe(delay(300));
  }

  bookAppointment(payload: AppointmentForm): Observable<Appointment> {
    const doctor = this.getDoctorById(payload.doctorId);
    if (!doctor) {
      return throwError(() => new Error('Doctor not found'));
    }

    const newAppointment: Appointment = {
      id: Math.floor(Math.random() * 10000), 
      patientId: payload.patientId, // <-- FIX: Use patientId from payload
      doctor: doctor,
      status: AppointmentStatus.Pending,
      date: payload.date,
      time: payload.time,
      reason: payload.reason,
      requestedOn: new Date().toISOString(),
    };

    // Optimistically update state
    this.mockAppointments.update(arr => [newAppointment, ...arr]);

    return of(newAppointment).pipe(delay(1000)); 
  }

  // --- MOCK DATA GENERATOR ---
  private generateMockAppointments(): Appointment[] {
    const doctors = this.mockDoctors;
    // Mocking for patientId = 1
    return [
      { id: 1005, patientId: 1, doctor: doctors[0], status: AppointmentStatus.Approved, date: '2025-11-10', time: '2:30 PM', reason: 'Annual health checkup', requestedOn: '2025-11-01' },
      { id: 1004, patientId: 1, doctor: doctors[2], status: AppointmentStatus.Approved, date: '2025-11-12', time: '9:00 AM', reason: 'Knee pain assessment', requestedOn: '2025-11-02' },
      { id: 1003, patientId: 1, doctor: doctors[3], status: AppointmentStatus.Pending, date: '2025-11-15', time: '10:00 AM', reason: 'Heart checkup', requestedOn: '2025-11-03' },
      { id: 1001, patientId: 1, doctor: doctors[1], status: AppointmentStatus.Rejected, date: '2025-11-08', time: '11:00 AM', reason: 'Skin rash', requestedOn: '2025-11-01', rejectionReason: 'Doctor is unavailable on this date.' },
      { id: 5, patientId: 1, doctor: doctors[0], status: AppointmentStatus.Completed, date: '2025-10-20', time: '2:00 PM', reason: 'Flu symptoms', requestedOn: '2025-10-18' },
    ];
  }
}