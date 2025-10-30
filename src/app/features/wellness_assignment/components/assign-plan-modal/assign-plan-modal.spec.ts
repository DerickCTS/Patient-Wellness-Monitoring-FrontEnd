import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPlanModal } from './assign-plan-modal';

describe('AssignPlanModal', () => {
  let component: AssignPlanModal;
  let fixture: ComponentFixture<AssignPlanModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignPlanModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignPlanModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
