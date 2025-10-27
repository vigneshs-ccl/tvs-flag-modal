import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FlagService } from '@app/core/services/flag/flag.service';
import { DashboardCard } from '@app/interface/DashbordCard';
import { DropdownOption } from '@app/interface/DropdownOption';
import {
  DateFieldComponent,
  DropdownComponent,
  ModalComponent,
  TextareaComponent,
} from '@Digital-mfg/mhi-ui-components';

@Component({
  selector: 'app-flag.component',
  imports: [
    ModalComponent,
    CommonModule,
    FormsModule,
    TextareaComponent,
    DateFieldComponent,
    DropdownComponent,
  ],
  templateUrl: './flag.component.html',
  styleUrl: './flag.component.scss',
})
export class FlagComponent {
  @Input() isOpen = false;
  @Input() title = 'Add Flag';
  selectedCard: DashboardCard | null = null;
  selectedDate: Date | null = null;
  selectedDropdownValues: DropdownOption[] = [];
  searchIcon: string = '<img src="./assets/icons/search.svg" alt="search" widht="18px"/>';

  arrowIcon: string = '<img src="./assets/icons/dropdown.svg" alt="search" width="16px" />';
  private flagService = inject(FlagService);

  multiSelectOptions: DropdownOption[] = [
    { value: 'employee_name', label: 'Employee name', selected: false },
    { value: 'coach_1', label: 'Coach 1', selected: false },
    { value: 'coach_2', label: 'Coach 2', selected: false },
    { value: 'coach_3', label: 'Coach 3', selected: false },
  ];

  cardData: DashboardCard[] = [
    {
      id: 1,
      title: 'D3',
      unit: '(ng/mL)',
      value: 130,
    },
    {
      id: 2,
      title: 'B12',
      unit: '(pg/mL)',
      value: 220,
    },
    {
      id: 3,
      title: 'LDL',
      unit: '(mg/dL)',
      value: 18.5,
    },
    {
      id: 4,
      title: 'BP',
      unit: '(mm/Hg)',
      value: 125,
    },
    {
      id: 5,
      title: 'Hs CRP',
      unit: '(mg/L)',
      value: 255,
    },
    {
      id: 6,
      title: 'HBA1C',
      unit: '(%)',
      value: 7.5,
    },
    {
      id: 7,
      title: 'LDL',
      unit: '(mg/dL)',
      value: 110,
    },
  ];

  openModal(card: DashboardCard) {
    this.selectedCard = card;
    this.isOpen = true;
  }

  get modalTitle(): string {
    return this.selectedCard
      ? `Add Flag for ${this.selectedCard.title} ${this.selectedCard.unit}`
      : 'Add Flag';
  }

  close() {
    this.isOpen = false;
  }

  onSubmit(form: NgForm) {
    console.log('submitted', form);
    console.log('Form submitted with selected dropdown values:', this.selectedDropdownValues);
    console.log('hellp');
  }

  // flag
  hasFlag(cardId: number): boolean {
    const flags = this.flagService.flags();
    return flags.some((f) => f.cardId === cardId);
  }

  removeFlag(card: DashboardCard) {
    const flag = this.flagService.flags().find((f) => f.cardId === card.id);
    if (!flag) return;
    this.flagService.removeFlag(flag.id);
  }

  onInput(value: string) {
    console.log('Textarea input:', value);
  }

  // date input field
  getTodayDateValue(): Date {
    return new Date();
  }

  onDateChange(newDate: Date | null): void {
    this.selectedDate = newDate;
    console.log('Selected date:', this.selectedDate);
  }

  // multiselect
  onMultiSelectChange(selected: DropdownOption[]): void {
    this.selectedDropdownValues = selected;
    console.log('Selected dropdown options:', this.selectedDropdownValues);
  }
}
