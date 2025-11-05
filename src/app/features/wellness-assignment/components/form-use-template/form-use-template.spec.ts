import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUseTemplate } from './form-use-template';

describe('FormUseTemplate', () => {
  let component: FormUseTemplate;
  let fixture: ComponentFixture<FormUseTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUseTemplate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormUseTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
