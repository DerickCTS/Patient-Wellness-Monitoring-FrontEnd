import { Component, input, OnInit, computed, effect, signal, OnDestroy } from '@angular/core';
import { Appointment, AppointmentStatus } from '../../models/appointment.models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './appointment-card.component.html',
  styleUrl: './appointment-card.component.css',
})
export class AppointmentCardComponent implements OnInit, OnDestroy {
  // Inputs
  appointment = input.required<Appointment>();

  // Expose Enum to Template
  AppointmentStatus = AppointmentStatus;

  // State
  private intervalId: any;
  private currentTime = signal(new Date());

  // Public methods/signals accessible to the template (FIX: visibility changed from private)
  public timeRemaining = computed(() => {
    const appointmentDateTime = new Date(this.appointment().date + ' ' + this.appointment().time);
    const diffMs = appointmentDateTime.getTime() - this.currentTime().getTime();
    return Math.max(0, diffMs); // return 0 if time has passed
  });

  public timerDisplay = computed(() => {
    const ms = this.timeRemaining();

    if (ms === 0) {
      return '00:00:00';
    }

    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    const pad = (num: number) => num.toString().padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  });

  constructor() {
    // Effect to update the timer every second if the appointment is approved
    effect(() => {
      if (this.appointment().status == AppointmentStatus.Approved) {
        // Ensure interval is running
        if (!this.intervalId) {
          this.startTimer();
        }
      } else {
        // Ensure interval is stopped if status changes
        this.stopTimer();
      }
    });
  }

  ngOnInit() {
    // Initial check (usually handled by the effect, but good to have)
    if (this.appointment().status ===  AppointmentStatus.Approved) {
      this.startTimer();
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  private startTimer(): void {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.currentTime.set(new Date());
      }, 1000);
    }
  }

  private stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  onBookAnotherSlot(): void {
    // FIX: Emit an event to handle modal opening in parent component
    console.log('Book Another Slot requested for rejected appointment.');
    // In a full implementation, you would emit an output here:
    // this.bookSlot.emit(this.appointment());
  }
}
