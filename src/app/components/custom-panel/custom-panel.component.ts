import { CommonModule, NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-custom-panel',
  imports: [NgClass,CommonModule],
  templateUrl: './custom-panel.component.html',
  styleUrls: ['./custom-panel.component.scss'],
})
export class CustomPanelComponent {
  @Input() position: string = 'end-0 mt-2'; // allows positioning (e.g., right, left)
  @Input() showCloseButton: boolean = true;

  isOpen = false;

  constructor(private eRef: ElementRef) {}

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  // Close when clicking outside
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
