import { CommonModule, NgClass } from '@angular/common';
import { Component, computed } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SuggestionService } from '@app/core/services/suggestion/suggestion.service';
import { SuggestionData } from '@app/interface/SuggestionData';
@Component({
  selector: 'app-suggestion.component',
  imports: [CommonModule, FormsModule, ReactiveFormsModule,NgClass],
  templateUrl: './suggestion.component.html',
  styleUrl: './suggestion.component.scss',
})
export class SuggestionComponent {
  surveyForm!: FormGroup; // The main form
  isModalOpen = false;
  submittedSurveys = computed(() => this.surveyService.submissions());

  openModal() {
    const submissions = this.surveyService.submissions();
    this.isModalOpen = true;

    //  If previous submissions exist, load the *latest* one
    if (submissions.length > 0) {
      const lastSubmission = submissions[submissions.length - 1];

      // Clear current form array
      this.surveysArray.clear();

      // Recreate form rows for each survey in the last submission
      lastSubmission.surveys.forEach((survey) => {
        this.surveysArray.push(this.buildSurveyForm(survey));
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  constructor(
    private fb: FormBuilder,
    private surveyService: SuggestionService,
  ) {
    this.initForm();
    // this.loadPreviousSubmissions();
  }

  // init form
  private initForm(): void {
    this.surveyForm = this.fb.group({
      surveys: this.fb.array([this.buildSurveyForm()]),
    });
  }

  //  Step 2: Shortcut to access 'surveys' array
  /** Shortcut for accessing surveys array */
  get surveysArray(): FormArray {
    return this.surveyForm.get('surveys') as FormArray;
  }

  //  Step 3: Create one survey group
  private buildSurveyForm(data?: SuggestionData): FormGroup {
    // today date will be used
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getFullYear()}`;
    return this.fb.group({
      adviceGiven: [data?.adviceGiven || '', Validators.required],
      frequency: [data?.frequency || '', Validators.required],
      remarks: [data?.remarks || '', Validators.required],
      date: [data?.date || formattedDate],
    });
  }

  //  Step 4: Add a new survey
  addSurvey(): void {
    this.surveysArray.push(this.buildSurveyForm());
  }

  //  Step 5: Remove a survey by index
  removeSurvey(index: number): void {
    this.surveysArray.removeAt(index);
  }

  //  Step 6: Clear all surveys
  clearAll(): void {
    this.surveyForm = this.fb.group({
      surveys: this.fb.array([this.buildSurveyForm()]),
    });
    this.surveyService.clearAllSubmissions();
    this.closeModal();
  }

  clearAllData(): void {
    this.surveyService.clearAllSubmissions();
    this.initForm();
    this.closeModal();
  }

  getOverallCompliance(): number {
    return this.surveyService.getOverallCompliance();
  }

  //  submit
  onSubmit(): void {
    if (this.surveyForm.invalid) {
      this.surveyForm.markAllAsTouched();
      return;
    }

    const surveys = this.surveysArray.value as SuggestionData[];
    this.surveyService.addSubmission(surveys); // save directly to shared signal

    // Reset form
    this.surveyForm = this.fb.group({
      surveys: this.fb.array([this.buildSurveyForm()]),
    });
  }
}
