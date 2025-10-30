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
