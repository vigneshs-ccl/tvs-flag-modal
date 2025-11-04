import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyFormComponents } from './survey-form.components';

describe('SurveyFormComponents', () => {
  let component: SurveyFormComponents;
  let fixture: ComponentFixture<SurveyFormComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyFormComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyFormComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
