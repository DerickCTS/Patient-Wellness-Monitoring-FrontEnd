import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ActivityCalendarItem,
  CompletionRateItem,
  DashboardDto
} from '../models/dashboard.dto';

import {
  PlanAssignmentDto,
  PlanDetailsDto,
  UpdateTaskStatusDto,
} from '../models/plan.dto';

@Injectable({
  providedIn: 'root',
})
export class WellnessService {
  private baseUrl = 'https://localhost:7129/api/progress';

  constructor(private http: HttpClient) { }

  // API 1: Get Plan Task Cards
  getPlans(
    status: string,
    category: string,
    date: string
  ): Observable<PlanAssignmentDto[]> {
    let params = new HttpParams()
      .set('status', status)
      .set('category', category)
      .set('date', date);
    return this.http.get<PlanAssignmentDto[]>(`${this.baseUrl}/plans`, {
      params,
    });
  }

  // API 2: Get Card Details
  getPlanDetails(assignmentId: number): Observable<PlanDetailsDto> {
    return this.http.get<PlanDetailsDto>(
      `${this.baseUrl}/plans/${assignmentId}/details`
    );
  }

  // API 3: Update Task Status
  updateTaskStatus(
    taskLogId: number,
    payload: UpdateTaskStatusDto
  ): Observable<any> {
    return this.http.patch(
      `${this.baseUrl}/tasks/${taskLogId}/status`,
      payload
    );
  }

  // API 4: Get Dashboard Details
  getDashboard(): Observable<DashboardDto> {
    return this.http.get<DashboardDto>(`${this.baseUrl}/dashboard`);
  }

  // API 5: Get Activity Calendar for a specific year
  getActivityCalendar(year: number): Observable<ActivityCalendarItem[]> {
    return this.http.get<ActivityCalendarItem[]>(
      `${this.baseUrl}/dashboard/${year}`
    );
  }

  // API 6 (NEW): Get Completion Rate Chart Data
  getCompletionRates(
    view: 'daily' | 'weekly' | 'monthly'
  ): Observable<CompletionRateItem[]> {
    // !! --- FOR YOU --- !!
    // When your .NET endpoint is ready, uncomment the http call
    // and remove the 'of(...)' block.

    // let params = new HttpParams().set('view', view);
    // return this.http.get<CompletionRateItem[]>(
    //   `${this.baseUrl}/dashboard/completion-rate`,
    //   { params }
    // );

    // --- MOCK DATA ---
    // Using mock data so your chart displays something.
    let mockData: CompletionRateItem[] = [
      { name: 'Sep 01', value: 62 }, { name: 'Sep 07', value: 75 },
      { name: 'Sep 14', value: 68 }, { name: 'Sep 21', value: 60 },
      { name: 'Sep 28', value: 78 }, { name: 'Oct 05', value: 85 },
      { name: 'Oct 12', value: 84 }, { name: 'Oct 19', value: 82 },
      { name: 'Oct 26', value: 88 },
    ];
    if (view === 'daily') {
      mockData = [
        { name: 'Oct 20', value: 80 }, { name: 'Oct 21', value: 82 },
        { name: 'Oct 22', value: 85 }, { name: 'Oct 23', value: 78 },
        { name: 'Oct 24', value: 88 }, { name: 'Oct 25', value: 90 },
        { name: 'Oct 26', value: 88 },
      ];
    }
    if (view === 'monthly') {
      mockData = [
        { name: 'Jan', value: 40 }, { name: 'Feb', value: 45 },
        { name: 'Mar', value: 55 }, { name: 'Apr', value: 58 },
        { name: 'May', value: 62 }, { name: 'Jun', value: 68 },
        { name: 'Jul', value: 70 }, { name: 'Aug', value: 75 },
        { name: 'Sep', value: 78 }, { name: 'Oct', value: 88 },
      ];
    }
    return of(mockData); // 'of()' creates an Observable from mock data
  }
}
