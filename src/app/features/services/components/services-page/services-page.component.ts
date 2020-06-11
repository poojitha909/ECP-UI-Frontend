import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SeoService } from 'src/app/core/services/seo.service';
import { SEO } from 'src/app/core/interfaces';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent implements OnInit, AfterViewInit {

  constructor(private seoService: SeoService) {

    // Generate meta tag 
    const config: SEO = {
      title: `Services`,
      keywords: 'products,services,events,dscussions',
      description: 'An online presence for elders to find reliable products and services. And engage in Events and Discussions',
      author: `Social alpha`,
      image: `${window.location.origin}/assets/imgaes/landing-img/Services-320.png`,
    }

    this.seoService.generateTags(config);

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }
}
