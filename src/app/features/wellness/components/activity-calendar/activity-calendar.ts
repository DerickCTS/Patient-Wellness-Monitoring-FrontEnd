import { Component, Input, OnInit } from '@angular/core';
import { ActivityCalendarItem } from '../../models/dashboard.dto'; // <-- Fixed import
import { WellnessService } from '../../services/wellness.service';
import { CommonModule } from '@angular/common'; // <-- For *ngFor
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-activity-calendar',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule
  ],
  templateUrl: './activity-calendar.html',
  styleUrls: ['./activity-calendar.scss'],
})
export class ActivityCalendarComponent implements OnInit {
  @Input() initialData: ActivityCalendarItem[] = [];
  @Input() initialYear: number = new Date().getFullYear();

  year: number = 0;
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  days: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  calendarData: (ActivityCalendarItem & { dayOfWeek: number })[] = [];
  firstDayOffsets: number[] = [];

  constructor(private wellnessService: WellnessService) { }

  ngOnInit(): void {
    this.year = this.initialYear;
    this.processData(this.initialData);
    this.calculateOffsets();
  }

  processData(data: ActivityCalendarItem[]): void {
    this.calendarData = data.map(item => ({
      ...item,
      dayOfWeek: new Date(item.date).getUTCDay()
    }));
  }

  calculateOffsets(): void {
    this.firstDayOffsets = this.months.map((_, i) => {
      // Get the day of the week for the 1st of each month
      return new Date(this.year, i, 1).getDay();
    });
  }

  // Get all items for a specific month
  getItemsForMonth(monthIndex: number): (ActivityCalendarItem & { dayOfWeek: number })[] {
    return this.calendarData.filter(item => {
      const itemMonth = new Date(item.date).getUTCMonth();
      return itemMonth === monthIndex;
    });
  }

  // Get the completion level for a specific day in a month
  getCompletionLevel(monthIndex: number, day: number): number {
    const item = this.calendarData.find(d => {
      const itemDate = new Date(d.date);
      return itemDate.getUTCMonth() === monthIndex && itemDate.getUTCDate() === day;
    });
    return item ? item.completionLevel : 0;
  }

  // Get the number of days in a given month
  getDaysInMonth(monthIndex: number): number[] {
    const days = new Date(this.year, monthIndex + 1, 0).getDate();
    return Array(days).fill(0).map((_, i) => i + 1);
  }

  // Get the CSS class for the cell color
  getCellColor(level: number): string {
    switch (level) {
      case 1: return 'level-1'; // Light Green
      case 2: return 'level-2';
      case 3: return 'level-3';
      case 4: return 'level-4'; // Dark Green
      default: return 'level-0'; // Gray
    }
  }

  // Fetch data for a different year
  changeYear(amount: number): void {
    this.year += amount;
    this.wellnessService.getActivityCalendar(this.year).subscribe(data => {
      this.processData(data);
      this.calculateOffsets();
    });
  }
}
