import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateScratch } from './form-create-scratch';

describe('FormCreateScratch', () => {
  let component: FormCreateScratch;
  let fixture: ComponentFixture<FormCreateScratch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateScratch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateScratch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
