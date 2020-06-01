import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-welcome-view',
  templateUrl: './user-welcome-view.component.html',
  styleUrls: ['./user-welcome-view.component.scss']
})
export class UserWelcomeViewComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.userSource.subscribe(user => {
      if (!user) {
        this.router.navigateByUrl('/');
      }
    })
  }

}
