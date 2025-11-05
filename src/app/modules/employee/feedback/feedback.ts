import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalComponent, TextareaComponent } from '@Digital-mfg/mhi-ui-components';

@Component({
  selector: 'app-feedback',
  imports: [ModalComponent, CommonModule,TextareaComponent],
  templateUrl: './feedback.html',
  styleUrl: './feedback.scss',
})
export class Feedback {
  @Input() isOpen = false;
  @Input() title = 'Physical Wellbeing Coaching History';
  rating = 0;
  hoverIndex = 0;
  description: string = '';

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
}
