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
  @ViewChild('navLinks', { static: false }) private navLinks: ElementRef;


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

  removeAttr() {
    setTimeout(() => {
      this.navLinks.nativeElement.childNodes.forEach(node => {
        node.firstChild.removeAttribute("aria-expanded");
      });
    }, 1);
  }

  navigateUser() {
    this.router.navigateByUrl("/user");
  }

  navigateEventsRegister(){
    this.router.navigateByUrl("/events-register")
  }
  
  logout() {
    this.auth.logout().subscribe(response => {
      this.router.url.startsWith('/user') ? this.router.navigateByUrl("/") : null;
    });
  }

  closeMobileMenu() {
    UIkit.offcanvas('#mobile-menu').hide();
  }
}
