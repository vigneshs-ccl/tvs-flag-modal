import { DropdownOption } from '@app/interface/DropdownOption';
import { SelectOption } from '@app/interface/SelectOption';

export const OPTIONS_MULTISELECT: DropdownOption[] = [
  { value: 'Option 1', label: 'Option 1', selected: false },
  { value: 'Option 2', label: 'Option 2', selected: false },
  { value: 'Option 3', label: 'Option 3', selected: false },
  { value: 'Option 4', label: 'Option 4', selected: false },
];

export const SPECIALIZATION_OPTIONS: SelectOption[] = [
  { value: '', label: 'Select' },
  { value: 'Physical Wellbeing', label: 'Physical Wellbeing' },
  { value: 'Happiness', label: 'Happiness' },
  { value: 'Nutrition', label: 'Nutrition' },
];

export const COACH_MOCK_DATA = [
  {
    coachId: 'CCH101',
    coachName: 'Vicky',
    gender: 'Male',
    dob: '12-09-2004',
    mobile: '7010633316',
    email: 'vicky.coach@gmail.com',
  },
  {
    coachId: 'CCH102',
    coachName: 'Vinoth Kumar',
    gender: 'Male',
    dob: '23-05-1999',
    mobile: '9876543210',
    email: 'vinoth.kumar@gmail.com',
  },
  {
    coachId: 'CCH103',
    coachName: 'Priya',
    gender: 'Female',
    dob: '08-11-2001',
    mobile: '9090876543',
    email: 'priya.sharma@gmail.com',
  },
];
