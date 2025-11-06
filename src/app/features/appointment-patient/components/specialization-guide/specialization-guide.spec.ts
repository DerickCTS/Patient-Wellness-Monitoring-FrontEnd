import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationGuide } from './specialization-guide';

describe('SpecializationGuide', () => {
  let component: SpecializationGuide;
  let fixture: ComponentFixture<SpecializationGuide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecializationGuide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecializationGuide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
