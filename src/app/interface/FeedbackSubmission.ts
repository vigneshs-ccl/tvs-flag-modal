import { SuggestionData } from '@app/interface/SuggestionData';

export interface FeedbackSubmission {
  id: string;
  date: string;
  surveys: SuggestionData[];
  rating: number; //  per-modal rating
  feedback: string; //  per-modal feedback
}