import { Component, OnInit } from '@angular/core';
import { WellnessService } from '../../services/wellness.service';
import { DashboardDto } from '../../models/dashboard.dto';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // <-- For *ngIf, | async
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AtAGlanceComponent } from '../at-a-glance/at-a-glance';
import { ActivityCalendarComponent } from '../activity-calendar/activity-calendar';
import { CompletionRateChartComponent } from '../completion-rate-chart/completion-rate-chart';

@Component({
  selector: 'app-dashboard-tab',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    AtAGlanceComponent,
    ActivityCalendarComponent,
    CompletionRateChartComponent,
  ],
  templateUrl: './dashboard-tab.html',
  styleUrls: ['./dashboard-tab.scss'],
})
export class DashboardTabComponent implements OnInit {
  // We will fetch all dashboard data here and pass it down to child components
  dashboardData$!: Observable<DashboardDto>;
  currentYear = new Date().getFullYear();

  constructor(private wellnessService: WellnessService) { }

  ngOnInit(): void {
    // Load the main dashboard data (API 4)
    this.dashboardData$ = this.wellnessService.getDashboard();
  }

  // This function will be triggered by the calendar component when the year changes
  onYearChange(year: number): void {
    this.currentYear = year;
    // We can't just update the 'activityCalendar' part of the dashboardData$
    // So we'll just let the calendar component handle its own data fetching for now.
    // This is a simpler approach for your timeline.
  }
}
