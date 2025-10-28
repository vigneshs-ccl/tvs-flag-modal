// flag-mock-data.ts
import { DropdownOption } from '@app/interface/DropdownOption';
import { DashboardCard } from '@app/interface/DashbordCard';

// multiselect mock data 
export const MULTI_SELECT_OPTIONS: DropdownOption[] = [
  { value: 'employee', label: 'Employee', selected: false },
  { value: 'coach_1', label: 'Coach 1', selected: false },
  { value: 'coach_2', label: 'Coach 2', selected: false },
  { value: 'coach_3', label: 'Coach 3', selected: false },
];

// mock card data 
export const CARD_DATA: DashboardCard[] = [
  { id: 1, title: 'D3', unit: '(ng/mL)', value: 130 },
  { id: 2, title: 'B12', unit: '(pg/mL)', value: 220 },
  { id: 3, title: 'LDL', unit: '(mg/dL)', value: 18.5 },
  { id: 4, title: 'BP', unit: '(mm/Hg)', value: 125 },
  { id: 5, title: 'Hs CRP', unit: '(mg/L)', value: 255 },
  { id: 6, title: 'HBA1C', unit: '(%)', value: 7.5 },
  { id: 7, title: 'LDL', unit: '(mg/dL)', value: 110 },
];


// icon props for the dropdown
export const ICONS = {
  search: '<img src="./assets/icons/search.svg" alt="search" width="18px" />',
  dropdown: '<img src="./assets/icons/dropdown.svg" alt="dropdown" width="16px" />',
};