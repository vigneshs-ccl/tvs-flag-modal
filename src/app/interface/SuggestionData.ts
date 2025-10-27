// survey.model.ts
export interface SuggestionData {
  adviceGiven: string;
  frequency: string;
  remarks: string;
  date: string;
  followStatus?: 'following' | 'not-following' | '';
  compliance?: number;
}