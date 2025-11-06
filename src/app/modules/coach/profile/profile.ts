import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  @Input() showCloseButton: boolean = true;

  userRole: 'admin' | 'coach' | 'employee' = 'coach';

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

  toggleProfilePanel(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
  }
}
