import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTrapModalFocus]'
})
export class TrapModalFocusDirective {

  constructor(private el: ElementRef) { }


  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.el.nativeElement.className.includes("uk-modal uk-open")) {
      const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const firstFocusableElement = this.el.nativeElement.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
      const focusableContent = this.el.nativeElement.querySelectorAll(focusableElements);
      const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
      if (event.key === 'Tab' || event.keyCode === 9) {

        if (event.shiftKey) { // if shift key pressed for shift + tab combination
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus(); // add focus for the last focusable element
            event.preventDefault();
          }
        } else { // if tab key is pressed
          if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
            firstFocusableElement.focus(); // add focus for the first focusable element
            event.preventDefault();
          }
        }

      }
    }
  }
}
