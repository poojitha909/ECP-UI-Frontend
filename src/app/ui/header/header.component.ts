import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  navigateUser() {
    if (this.auth.isAuthenticate) {
      this.router.navigateByUrl("/");
    } else {
      this.router.navigateByUrl("/user/signin");
    }

  }
}
