export interface FlagData {
  cardId:number;
  id: number;
  title: string;
  unit: string;
  value: number;
  description: string;
  date: string;
  sendTo: string[]; // ids of selected options
}