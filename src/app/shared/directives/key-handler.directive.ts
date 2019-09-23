import { Directive, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import * as $ from 'jquery';

export enum KEY_CODE {
  UP_ARROW = 38,
  DOWN_ARROW = 40,
  ENTER_KEY = 13
}


@Directive({
  selector: '[appKeyHandler]'
})
export class KeyHandlerDirective {

  @Output() onItemSelected: EventEmitter<string | number> = new EventEmitter();

  constructor(private el: ElementRef) { }

  keyCount: number = -1;

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    var list = this.el.nativeElement.getElementsByTagName("li");
    if (event.keyCode === KEY_CODE.UP_ARROW) {
      if (list[this.keyCount]) {
        list[this.keyCount].classList.remove('knx-active');
      }
      this.keyCount = this.keyCount > 0 ? --this.keyCount : this.keyCount;
      if (list[this.keyCount]) {
        list[this.keyCount].classList.add('knx-active');
        this.onItemSelected.emit(list[this.keyCount].innerText);
      }
    }

    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      if (list[this.keyCount]) {
        list[this.keyCount].classList.remove('knx-active');
      }
      this.keyCount = this.keyCount < list.length - 1 ? ++this.keyCount : this.keyCount;
      if (list[this.keyCount]) {
        list[this.keyCount].classList.add('knx-active');
        this.onItemSelected.emit(list[this.keyCount].innerText);
      }
    }

    // console.log(event.keyCode);
    // if (list[this.keyCount] && event.keyCode === KEY_CODE.ENTER_KEY) {
    //   this.onItemSelected.emit(this.keyCount);
    // }
    if ($('.knx-active:first').position()) {
      $(".search-list").scrollTop(0);//set to top
      $(".search-list").scrollTop($('.knx-active:first').position().top - $(".search-list").height());
    }
  }

  @HostListener('click', ['$event.target'])
  onClick(event) {
    var list = this.el.nativeElement.getElementsByTagName("li");
    if (list[this.keyCount]) {
      list[this.keyCount].classList.remove('knx-active');
    }
    // const key = list.filter(item => item.classList.include('knx-active'));
    this.onItemSelected.emit(event.getAttribute('id'));
  }

}
