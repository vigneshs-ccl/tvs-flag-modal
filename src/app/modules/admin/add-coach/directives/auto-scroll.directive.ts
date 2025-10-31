import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[autoScrollIntoView]'
})
export class AutoScrollDirective {
  @Input() scrollContainerSelector?: string;

  constructor(private el: ElementRef) {}

  @HostListener('focus')
  onFocus(): void {
    // Delay a bit for mobile keyboard adjustment
    setTimeout(() => {
      const scrollContainer = this.scrollContainerSelector
        ? document.querySelector(this.scrollContainerSelector)
        : this.el.nativeElement.closest('.modal-body-scroll');

      if (scrollContainer) {
        const elementTop = this.el.nativeElement.offsetTop;
        (scrollContainer as HTMLElement).scrollTo({
          top: elementTop - 60, // offset for header spacing
          behavior: 'smooth',
        });
      } else {
        this.el.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300); // wait for keyboard to appear
  }
}


// scroll use it in ts file
  // scrollToInput(inputId: string): void {
  //   const inputElement = document.getElementById(inputId);
  //   if (inputElement && this.modalScroll) {
  //     const modalBody = this.modalScroll.nativeElement;
  //     const inputPosition = inputElement.offsetTop;
  //     modalBody.scrollTo({
  //       top: inputPosition - 50, // add a small offset for better visibility
  //       behavior: 'smooth',
  //     });
  //   }
  // }