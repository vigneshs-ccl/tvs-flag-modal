import { DropdownOption } from '@app/interface/DropdownOption';

export interface CoachFormData {
  email: string;
  coachId: string;
  coachName: string;
  gender: string;
  dob: string;
  mobile: string;
  location: DropdownOption[];
  department: DropdownOption[];
  specialization: string;
  language: DropdownOption[];
  otherSpecialization?: string;
}
