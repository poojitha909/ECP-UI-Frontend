import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { AuthService } from 'src/app/core';
import { Router, Event, NavigationEnd } from '@angular/router';
declare var UIkit: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChildren('homeLink') private homeLink: QueryList<ElementRef>;

  constructor(public auth: AuthService, private router: Router) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.router.url.startsWith('/user') || this.router.url == '/about') {
      // this.homeLink.nativeElement.classList.remove('uk-active');
      setTimeout(() => {
        this.homeLink.forEach(
          array => {
            array.nativeElement.classList.remove('uk-active');
          }
        )
      }, 50);
    }
  }

  navigateUser() {
    this.router.navigateByUrl("/user");
  }

  logout() {
    this.auth.logout().subscribe(response => console.log(response));
  }

  closeMobileMenu() {
    UIkit.offcanvas('#mobile-menu').hide();
  }
}
