import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,

  ],
  exports: [
    FormsModule,
    NgbModule,
    FontAwesomeModule,

  ]
})
export class CoreModule {
  constructor() {
    library.add(fas);
  }
}
