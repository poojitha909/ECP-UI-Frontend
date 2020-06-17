import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core';

@Component({
  selector: 'app-user-welcome-view',
  templateUrl: './user-welcome-view.component.html',
  styleUrls: ['./user-welcome-view.component.scss']
})
export class UserWelcomeViewComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
