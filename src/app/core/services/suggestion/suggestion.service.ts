import { Injectable, signal, type WritableSignal } from '@angular/core';
import { SuggestionData } from '@app/interface/SuggestionData';
import { FeedbackSubmission } from '@app/interface/FeedbackSubmission';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class SuggestionService {
  private _submissions: WritableSignal<FeedbackSubmission[]> = signal<FeedbackSubmission[]>(
    this.loadSubmissionsFromLocalStorage(),
  );
  submissions = this._submissions.asReadonly();

  constructor() {}

  addSubmission(surveys: SuggestionData[]): void {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getFullYear()}`;

    // initialize compliance for each card
    const surveysWithCompliance = surveys.map((s) => ({
      ...s,
      compliance: s.followStatus === 'following' ? 100 : 0, // initial default
    }));

    const newSubmission: FeedbackSubmission = {
      id: uuidv4(),
      date: formattedDate,
      surveys: surveysWithCompliance,
      rating: 0,
      feedback: '',
    };

    const updated = [...this._submissions(), newSubmission];
    this._submissions.set(updated);
    this.saveSubmissionsToLocalStorage(updated);
  }

  updateSubmission(updated: FeedbackSubmission): void {
    // recalc per-card compliance if followStatus changed
    updated.surveys = updated.surveys.map((s) => ({
      ...s,
      compliance: s.followStatus === 'following' ? 100 : 0,
    }));

    const updatedList = this._submissions().map((sub) => (sub.id === updated.id ? updated : sub));
    this._submissions.set(updatedList);
    this.saveSubmissionsToLocalStorage(updatedList);
  }

  private saveSubmissionsToLocalStorage(submissions: FeedbackSubmission[]): void {
    localStorage.setItem('surveySubmissions', JSON.stringify(submissions));
  }

  clearAllSubmissions(): void {
    this._submissions.set([]); // clear the signal
    localStorage.removeItem('surveySubmissions'); // clear storage
  }

  private loadSubmissionsFromLocalStorage(): FeedbackSubmission[] {
    const data = localStorage.getItem('surveySubmissions');
    try {
      return data ? (JSON.parse(data) as FeedbackSubmission[]) : [];
    } catch {
      return [];
    }
  }

  // survey.service.ts
  getFeedbackCompliance(submission: FeedbackSubmission): number {
    const total = submission.surveys.length;
    if (!total) return 0; // avoid divide by zero
    const followingCount = submission.surveys.filter((s) => s.followStatus === 'following').length;
    return Math.round((followingCount / total) * 100); // rounded %
  }

  // overall submission compliance based on per-card compliance
  getCompliance(submission: FeedbackSubmission): number {
    const total = submission.surveys.length;
    if (!total) return 0;
    const sum = submission.surveys.reduce((acc, s) => acc + (s.compliance ?? 0), 0);
    return Math.round(sum / total); // average %
  }

  getOverallCompliance(): number {
    const submissions = this._submissions();
    if (!submissions.length) return 0;

    let totalSurveys = 0;
    let totalFollowing = 0;

    submissions.forEach((submission) => {
      totalSurveys += submission.surveys.length;
      totalFollowing += submission.surveys.filter((s) => s.followStatus === 'following').length;
    });

    return totalSurveys ? Math.round((totalFollowing / totalSurveys) * 100) : 0;
  }
}
