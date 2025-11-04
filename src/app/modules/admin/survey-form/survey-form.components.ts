import { Component } from '@angular/core';
import { COACH_GROUP, SURVEY_TYPE, TIMING_OPTION } from './mock-data';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DropdownComponent,
  SelectComponent,
  TextareaComponent,
} from '@Digital-mfg/mhi-ui-components';
import { ICONS } from '../flag/flag-mock-data';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-survey-form',
  imports: [
    SelectComponent,
    DropdownComponent,
    TextareaComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './survey-form.components.html',
  styleUrl: './survey-form.components.scss',
})
export class SurveyFormComponents {
  survey_type = SURVEY_TYPE;
  coach_group = COACH_GROUP;
  timing = TIMING_OPTION;

  searchIcon = ICONS.search;
  arrowIcon = ICONS.dropdown;
  surveyForm: FormGroup;

  isEmailEnabled = false;
  constructor(private fb: FormBuilder) {
    this.surveyForm = this.fb.group({
      surveyType: ['', [Validators.required]],
      timing: ['', [Validators.required]],
    });
  }

  onSelectChange(value: string | string[]) {
    this.surveyForm.get('surveyType')?.setValue(value);
    this.surveyForm.get('surveyType')?.markAsTouched();
  }

  onSelectChangeTiming(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.surveyForm.get('timing')?.setValue(value);
    this.surveyForm.get('timing')?.markAsTouched();
    console.log('Selected timing:', value);
  }

  toggleEmailNotification() {
    this.isEmailEnabled = !this.isEmailEnabled;
  }
}
