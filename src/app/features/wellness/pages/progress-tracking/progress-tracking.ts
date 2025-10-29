import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PlanListComponent } from '../../components/plan-list/plan-list';
import { DashboardTabComponent } from '../../components/dashboard-tab/dashboard-tab';

@Component({
  selector: 'app-progress-tracking',
  standalone: true,
  imports: [
    MatTabsModule, 
    PlanListComponent, 
    DashboardTabComponent
  ],
  templateUrl: './progress-tracking.html',
  styleUrls: ['./progress-tracking.scss'],
})
export class ProgressTracking {

}
