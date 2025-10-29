import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-at-a-glance',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatProgressSpinnerModule, 
    MatIconModule
  ],
  templateUrl: './at-a-glance.html',
  styleUrls: ['./at-a-glance.scss'],
})
export class AtAGlanceComponent implements OnInit {
  @Input() wellnessScore: number = 0;
  @Input() currentStreak: number = 0;
  @Input() healthTip: string = '';
  @Input() tasksTodayCompleted: number = 0;
  @Input() tasksTodayTotal: number = 0;
  @Input() tasksThisWeekCompleted: number = 0;
  @Input() tasksThisWeekTotal: number = 0;
  @Input() bestStreak: number = 0;

  // For the circular progress bar
  progressColor: 'primary' | 'accent' | 'warn' = 'primary';

  constructor() { }

  ngOnInit(): void {
    // Change color of progress bar based on score
    if (this.wellnessScore < 40) {
      this.progressColor = 'warn'; // Red
    } else if (this.wellnessScore < 75) {
      this.progressColor = 'accent'; // Yellow/Orange
    } else {
      this.progressColor = 'primary'; // Green/Blue
    }
  }
}
