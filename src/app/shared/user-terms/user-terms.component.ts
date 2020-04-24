import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-user-terms',
  templateUrl: './user-terms.component.html',
  styleUrls: ['./user-terms.component.scss']
})
export class UserTermsComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    document.getElementById("termsHeader").focus();
  }

}
