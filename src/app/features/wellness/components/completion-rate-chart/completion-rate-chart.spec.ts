import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionRateChart } from './completion-rate-chart';

describe('CompletionRateChart', () => {
  let component: CompletionRateChart;
  let fixture: ComponentFixture<CompletionRateChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletionRateChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletionRateChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
