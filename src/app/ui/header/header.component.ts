import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('homeLink', { static: false }) homeLink: ElementRef;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit() {

    console.log(this.router.url);
  }

  ngAfterViewInit() {
    if (this.router.url == '/user') {
      // this.homeLink.nativeElement.classList.remove('uk-active');
      setTimeout(() => { this.homeLink.nativeElement.classList.remove('uk-active') }, 50);
    }
  }

  navigateUser() {
    this.router.navigateByUrl("/user");
  }

  logout() {
    this.auth.logout().subscribe(response => console.log(response));
  }
}
