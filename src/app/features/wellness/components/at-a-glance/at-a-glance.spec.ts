import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtAGlance } from './at-a-glance';

describe('AtAGlance', () => {
  let component: AtAGlance;
  let fixture: ComponentFixture<AtAGlance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtAGlance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtAGlance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
