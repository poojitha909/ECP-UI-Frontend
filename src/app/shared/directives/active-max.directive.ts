import { Directive, Input, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[activeMax]'
})
export class ActiveMaxDirective implements AfterViewInit {
  @Input() max: boolean;
  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    if (this.max) {
      this.el.nativeElement.classList.add("uk-active");
      console.log(this.max);
      console.log(this.el)
    }
  }

}
