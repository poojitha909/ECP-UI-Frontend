import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[imageHandler]',
  host: {
    '(error)': 'updateUrl()',
    '[src]': 'src'
  }
})
export class DefaultImageDirective {
  @Input() src: string;

  constructor() {
  }

  updateUrl() {
    this.src = 'assets/images/default-thumbnail.png';
  }

}
