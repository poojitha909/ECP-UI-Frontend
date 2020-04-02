import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  showInfoFooter: boolean;

  constructor(private router: Router) {

    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(event => {
      if (event && (event.url === '/products' || event.url === '/services/all')) {
        this.showInfoFooter = true;
      } else {
        this.showInfoFooter = false;
      }
    });
  }

  ngOnInit() { }
}
