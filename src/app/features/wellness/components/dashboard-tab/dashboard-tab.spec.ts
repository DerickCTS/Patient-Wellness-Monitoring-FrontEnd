import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTab } from './dashboard-tab';

describe('DashboardTab', () => {
  let component: DashboardTab;
  let fixture: ComponentFixture<DashboardTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
