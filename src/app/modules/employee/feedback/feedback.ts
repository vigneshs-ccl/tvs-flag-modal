import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalComponent, SelectComponent, TextareaComponent } from '@Digital-mfg/mhi-ui-components';

@Component({
  selector: 'app-feedback',
  imports: [ModalComponent, CommonModule, TextareaComponent, SelectComponent],
  templateUrl: './feedback.html',
  styleUrl: './feedback.scss',
})
export class Feedback {
  @Input() isOpen = false;
  @Input() title = 'Physical Wellbeing Coaching History';
  rating = 0;
  hoverIndex = 0;
  description: string = '';
  selectedOption: string = 'Select';

  feedback_status_options = [
    { label: 'Select Progress', value: '' },
    { label: 'I am Following', value: 'following' },
    { label: 'I am not Following', value: 'not_following' },
  ];

  onSelectChange(value: string | string[]) {
    console.log('Selected:', value);
  }
  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  // star rating functions
  setRating(index: number) {
    this.rating = index;
  }

  setHover(index: number) {
    this.hoverIndex = index;
  }

  clearHover() {
    this.hoverIndex = 0;
  }

  onInputChange(value: string) {
    this.description = value;
    console.log(this.description);
  }

  selectOption(option: string): void {
    this.selectedOption = option;
  }
}
