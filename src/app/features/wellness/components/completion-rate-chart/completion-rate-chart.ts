import { Component, OnInit } from '@angular/core';
import { WellnessService } from '../../services/wellness.service';
import { CompletionRateItem } from '../../models/dashboard.dto'; // <-- Fixed import
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common'; // <-- For *ngIf
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms'; // <-- For ngModel

@Component({
  selector: 'app-completion-rate-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule,
    MatCardModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    FormsModule,
  ],
  templateUrl: './completion-rate-chart.html',
  styleUrls: ['./completion-rate-chart.scss'],
})
export class CompletionRateChartComponent implements OnInit {
  chartData: any[] = []; // This will be in the format ngx-charts expects
  isLoading = true;
  currentView: 'daily' | 'weekly' | 'monthly' = 'weekly'; // Default view

  // Chart options
  legend: boolean = false;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Completion %';
  autoScale: boolean = true;
  gradient: boolean = true; // This creates the area fill gradient

  // Color scheme to match your theme (Blue/Purple)
  colorScheme: Color = {
    name: 'progressChart',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3f51b5'], // A nice blue
  };

  constructor(private wellnessService: WellnessService) { }

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.isLoading = true;
    this.wellnessService.getCompletionRates(this.currentView).subscribe({
      next: (data: CompletionRateItem[]) => {
        // We must wrap the data in the format ngx-charts expects
        this.chartData = [
          {
            name: 'Completion',
            series: data,
          },
        ];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading chart data', err);
        this.isLoading = false;
      },
    });
  }

  // Called when the user clicks a new view
  onViewChange(view: 'daily' | 'weekly' | 'monthly'): void {
    this.currentView = view;
    this.loadChartData();
  }

  // Adds a '%' sign to the Y-axis labels
  yAxisTickFormat(value: any): string {
    return `${value}%`;
  }
}
