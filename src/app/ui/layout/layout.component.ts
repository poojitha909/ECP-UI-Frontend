import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isDetailPage: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.url.startsWith('/services/')) {
      console.log(this.router.url)
      this.isDetailPage = true;
    } else {
      this.isDetailPage = false;
    }

    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(event => {
      if (event.url.startsWith('/services/')) {
        console.log(event);
        this.isDetailPage = true;
      } else {
        this.isDetailPage = false;
      }
    });

  }
}
