import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkCompleteModal } from './mark-complete-modal';

describe('MarkCompleteModal', () => {
  let component: MarkCompleteModal;
  let fixture: ComponentFixture<MarkCompleteModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkCompleteModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkCompleteModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
