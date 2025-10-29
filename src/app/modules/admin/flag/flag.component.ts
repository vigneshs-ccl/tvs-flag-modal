import { CommonModule } from '@angular/common';
import { Component, inject, Input, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FlagService } from '@app/core/services/flag/flag.service';
import { DashboardCard } from '@app/interface/DashbordCard';
import { DropdownOption } from '@app/interface/DropdownOption';
import { FlagData } from '@app/interface/FlagData';
import {
  DateFieldComponent,
  DropdownComponent,
  ModalComponent,
  TextareaComponent,
} from '@Digital-mfg/mhi-ui-components';
import { MULTI_SELECT_OPTIONS, CARD_DATA, ICONS } from '@app/modules/admin/flag/flag-mock-data';

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
  @Input() title = '';
  @ViewChild('flagForm') flagForm!: NgForm;
  description: string = '';
  selectedCard: DashboardCard | null = null;
  selectedDate: Date | null = null;
  selectedDropdownValues: DropdownOption[] = [];
  leftColumnFlag = false;
  showTextarea = true;
  searchIcon = ICONS.search;
  arrowIcon = ICONS.dropdown;

  descriptionError: string | null = null;
  dateError: string | null = null;
  sendToError: string | null = null;

  private flagService = inject(FlagService);

  multiSelectOptions = MULTI_SELECT_OPTIONS;
  cardData = CARD_DATA;

  openModal(card: DashboardCard) {
    this.selectedCard = card;
    this.description = '';
    this.isOpen = true;

    // disable background scroll
    globalThis.document.body.style.overflow = 'hidden';
  }

  get modalTitle(): string {
    return this.selectedCard
      ? `Add Flag for ${this.selectedCard.title} ${this.selectedCard.unit}`
      : 'Add Flag';
  }

  close() {
    this.isOpen = false;
    globalThis.document.body.style.overflow = '';
    setTimeout(() => this.resetForm(), 200);
  }

  // flag
  hasFlag(cardId: number): boolean {
    const flags: FlagData[] = this.flagService.getAllFlags();
    return flags.some((f: FlagData) => f.cardId === cardId);
  }

  removeFlag(card: DashboardCard) {
    const flags: FlagData[] = this.flagService.getAllFlags();
    const flag = flags.find((f: FlagData) => f.cardId === card.id);
    if (flag) {
      this.flagService.removeFlag(flag.id);
    }
  }

  removeLeftColumnFlag() {
    this.leftColumnFlag = false;
  }

  openLeftFlagModal() {
    this.selectedCard = null; // no card
    this.isOpen = true;

    globalThis.document.body.style.overflow = 'hidden';
  }

  // date input field
  getTodayDateValue(): Date {
    return new Date();
  }

  // validations
  // ---- Validation methods ---- //
  validateDescription(): boolean {
    const trimmed = this.description.trim();
    if (!trimmed) {
      this.descriptionError =
        'Flag description is required and must be between 2 and 250 characters.';
      return false;
    }
    if (trimmed.length < 2 || trimmed.length > 250) {
      this.descriptionError =
        'Flag description is required and must be between 2 and 250 characters.';
      return false;
    }
    this.descriptionError = null;
    return true;
  }

  validateDate(): boolean {
    if (!this.selectedDate) {
      this.dateError = 'Due date is required.';
      return false;
    }
    const today = new Date();
    const selected = new Date(this.selectedDate);
    if (selected < new Date(today.toDateString())) {
      this.dateError = 'Due date cannot be in the past.';
      return false;
    }
    this.dateError = null;
    return true;
  }

  validateSendTo(): boolean {
    if (!this.selectedDropdownValues.length) {
      this.sendToError = 'Please select at least one recipient.';
      return false;
    }
    this.sendToError = null;
    return true;
  }

  // ---- Event handlers ---- //
  onInputChange(value: string) {
    this.description = value;
    this.validateDescription();
  }

  onDateChange(value: Date | null) {
    this.selectedDate = value;
    this.validateDate();
  }

  onMultiSelectChange(values: DropdownOption[]) {
    this.selectedDropdownValues = values;
    this.validateSendTo();
  }

  // ---- Submit ----
  onSubmit() {
    const isDescValid = this.validateDescription();
    const isDateValid = this.validateDate();
    const isSendValid = this.validateSendTo();

    if (!isDescValid || !isDateValid || !isSendValid) {
      this.descriptionError = !isDescValid ? this.descriptionError : null;
      this.dateError = !isDateValid ? this.dateError : null;
      this.sendToError = !isSendValid ? this.sendToError : null;
      return;
    }

    // Ensure a card is selected
    if (!this.selectedCard) {
      return;
    }

    const newFlag: Omit<FlagData, 'id'> = {
      cardId: this.selectedCard.id,
      title: this.selectedCard.title,
      unit: this.selectedCard.unit,
      value: this.selectedCard.value,
      description: this.description.trim(),
      date: this.selectedDate!,
      sendTo: this.selectedDropdownValues,
    };

    console.log('Submitting flag:', newFlag);
    this.flagService.addFlag(newFlag);

    this.resetForm();
    this.close();
  }

  // ---- Reset + Close ---- //
  resetForm() {
    this.description = '';
    this.selectedDate = null;
    this.selectedDropdownValues = [];
    this.descriptionError = null;
    this.dateError = null;
    this.sendToError = null;
    this.multiSelectOptions.forEach((opt) => (opt.selected = false));

    this.showTextarea = false;
    setTimeout(() => (this.showTextarea = true));
  }
}
