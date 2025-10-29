import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanDetailsModal } from './plan-details-modal';

describe('PlanDetailsModal', () => {
  let component: PlanDetailsModal;
  let fixture: ComponentFixture<PlanDetailsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanDetailsModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanDetailsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
