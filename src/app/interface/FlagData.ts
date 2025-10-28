import { DropdownOption } from '@app/interface/DropdownOption';

export interface FlagData {
  cardId: number;
  id: number;
  title: string;
  unit: string;
  value: number;
  description: string;
  date: Date | null;
  sendTo: DropdownOption[]; // ids of selected options
}
