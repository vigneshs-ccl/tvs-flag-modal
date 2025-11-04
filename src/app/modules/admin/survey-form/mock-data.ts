import { SelectOption } from '@app/interface/SelectOption';
import { DropdownOption } from '@Digital-mfg/mhi-ui-components';

export const SURVEY_TYPE: SelectOption[] = [
  { value: '', label: 'Select' },
  { value: 'Stress Survey', label: 'Stress Survey' },
];

export const TIMING: SelectOption[] = [
  { value: '', label: 'Select' },
  { value: '30min', label: '30 minutes' },
  { value: '60min', label: '60 minutes' },
  { value: '3hrs', label: '3 hours' },
  { value: '1day', label: '1 day' },
];

export const TIMING_OPTION = [
  { label: '30 minutes', value: '30 minutes' },
  { label: '60 minutes', value: '60 minutes' },
  { label: '3 hours', value: '3 hours' },
  { label: '1 day', value: '1 day' },
];

export const COACH_GROUP: DropdownOption[] = [
  { value: 'Option 1', label: 'Option 1', selected: false },
  { value: 'Option 2', label: 'Option 2', selected: false },
  { value: 'Option 3', label: 'Option 3', selected: false },
  { value: 'Option 4', label: 'Option 4', selected: false },
];
