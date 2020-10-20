import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SeoService } from 'src/app/core/services/seo.service';
import { SEO } from 'src/app/core/interfaces';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit {
  constructor(private seoService: SeoService) {

    // Generate meta tag 
    const config: SEO = {
      title: 'Home - SEENAGE LIFE',
      keywords: 'products, services, events, discussions',
      description: 'Supported by Tata Trusts',
      author: 'Social alpha',
      image: `${window.location.origin}/assets/imgaes/landing-img/Landing-320.png`
    }
    this.seoService.generateTags(config);
  }

  ngOnInit() { }

  ngAfterViewInit() {

  }
}
