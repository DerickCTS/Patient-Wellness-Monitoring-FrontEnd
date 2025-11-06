// src/app/feature/appointment-patient/components/appointment-card/appointment-card.component.ts

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AppointmentItemDto } from '../../models/appointment.models';

// --- STANDALONE IMPORTS ---
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle,
  faExclamationTriangle,
  faTimesCircle,
  faStethoscope,
  faCalendar,
  faClock,
  faFileAlt,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, DatePipe],
  templateUrl: './appointment-card.html',
  styleUrls: ['./appointment-card.scss'],
})
export class AppointmentCardComponent implements OnInit, OnDestroy {
  @Input() appointment!: AppointmentItemDto;
  @Output() bookSlot = new EventEmitter<void>(); // [cite: 28]

  // Timer logic 
  timeRemaining: string = 'Calculating...';
  private timerInterval: any;

  // Icons 
  faCheck = faCheckCircle;
  faPending = faExclamationTriangle;
  faRejected = faTimesCircle;
  faStethoscope = faStethoscope;
  faCalendar = faCalendar;
  faClock = faClock;
  faFileAlt = faFileAlt;
  faInfoCircle = faInfoCircle;
  faTimesCircle = faTimesCircle;

  ngOnInit(): void {
    if (this.appointment && this.appointment.status === 'Confirmed') {
      this.startCountdown();
    }
  }

  ngOnDestroy(): void {
    // Clear interval to prevent memory leaks
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private startCountdown(): void {
    const appointmentTime = new Date(this.appointment.appointmentDate).getTime();

    this.timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = appointmentTime - now;

      if (distance < 0) {
        this.timeRemaining = 'Appointment time has arrived';
        clearInterval(this.timerInterval);
        return;
      }

      // Time calculations
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Build the display string
      let parts = [];
      if (days > 0) parts.push(`${days}d`);
      if (hours > 0) parts.push(`${hours}h`);
      if (minutes > 0) parts.push(`${minutes}m`);
      if (seconds >= 0) parts.push(`${seconds}s`);
      
      this.timeRemaining = parts.join(' ') || '0s';

    }, 1000);
  }

  onBookAnotherSlot(): void {
    this.bookSlot.emit(); // [cite: 28]
  }
}