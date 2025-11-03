import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayManager } from './form-array-manager';

describe('FormArrayManager', () => {
  let component: FormArrayManager;
  let fixture: ComponentFixture<FormArrayManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormArrayManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormArrayManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
