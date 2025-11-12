// src/app/features/patient-dashboard/components/recent-activities-list/recent-activities-list.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RecentActivityDto } from '../../../../core/models/dashboard.models';

@Component({
  selector: 'app-recent-activities-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './recent-activities-list.component.html',
  styleUrls: ['./recent-activities-list.component.scss'],
})
export class RecentActivitiesListComponent {
  @Input({ required: true }) activities: RecentActivityDto[] = [];

  @Output() viewDetailsClicked = new EventEmitter<number>();
}