import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WellnessPlanSummary } from '../../models/doctor.models';

@Component({
  selector: 'app-wellness-plans-breakdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wellness-plans-breakdown.html',
  styleUrls: ['../modal-base.css', './wellness-plans-breakdown.css']
})
export class WellnessPlansBreakdownComponent {
  @Input() data: WellnessPlanSummary | null = null;
  @Output() close = new EventEmitter<void>();
  closeModal(): void { this.close.emit(); }
}