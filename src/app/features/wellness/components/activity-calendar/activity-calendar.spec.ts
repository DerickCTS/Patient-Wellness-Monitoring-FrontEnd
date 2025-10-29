import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCalendar } from './activity-calendar';

describe('ActivityCalendar', () => {
  let component: ActivityCalendar;
  let fixture: ComponentFixture<ActivityCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
