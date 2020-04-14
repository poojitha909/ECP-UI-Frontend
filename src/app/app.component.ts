import { Component } from '@angular/core';
import { JdCategoryService } from './core/services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecp-ui-frontend';

  constructor() {
    //Fetch service categories
  }
}
