// Interface for the main dashboard widgets (API 4)
export interface DashboardDto {
  wellnessScore: number;
  currentStreak: number;
  bestStreak: number;
  healthTipOfTheDay: string;
  tasksTodayCompleted: number;
  tasksTodayTotal: number;
  tasksThisWeekCompleted: number;
  tasksThisWeekTotal: number;
  activityCalendar: ActivityCalendarItem[];
}

// Interface for the calendar data (API 4 & 5)
export interface ActivityCalendarItem {
  date: string;
  completionLevel: number;
}

// Interface for the line chart (API 6 - our new one)
export interface CompletionRateItem {
  name: string;
  value: number;
}
