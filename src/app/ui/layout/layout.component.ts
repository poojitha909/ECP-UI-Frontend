import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  // isDetailPage: boolean;
  constructor() { }

  ngOnInit() {
    // if (this.router.url.startsWith('/services/') || this.router.url.startsWith('/community/') || this.router.url.startsWith('/products/')) {
    //   console.log(this.router.url)
    //   this.isDetailPage = true;
    // } else {
    //   this.isDetailPage = false;
    // }

    // this.router.events.pipe(
    //   filter((event: any) => event instanceof NavigationEnd)
    // ).subscribe(event => {
    //   if (event.url.startsWith('/services/') || event.url.startsWith('/community/') || event.url.startsWith('/products/')) {
    //     this.isDetailPage = true;
    //   } else {
    //     this.isDetailPage = false;
    //   }
    // });

  }
}
