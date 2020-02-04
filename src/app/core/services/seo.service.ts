import { Injectable, Inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SEO } from '../interfaces';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Title }     from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private dom
  ) { }


  generateTags(config: SEO) {
    // default values
    // config = {
    //   title: `Unilever Professional ${this.countryCode}`,
    //   keywords: 'unilever, professional, unilever professional',
    //   description: 'Making Clean and Cleaners matter out of home.',
    //   author: `Unilever Professional ${this.countryCode}`,
    //   image: `${window.location.origin}/assets/img/banners/home-banner.jpg`,
    //   ...config
    // }

    this.meta.updateTag({ name: 'keywords', content: config.keywords });
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'image', content: config.image })
    this.meta.updateTag({ name: 'author', content: config.author });
    this.meta.updateTag({ name: 'title', content: config.title });
    this.titleService.setTitle( config.title );

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: 'An Elder Spring Initiative by Tata Trusts' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'fb:app_id', content: environment.facebook.clientId });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({
      property: 'og:site_name', content: `An Elder Spring Initiative by Tata Trusts`
    });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:image:width', content: "400" });
    this.meta.updateTag({ property: 'og:image:height', content: "300" });
    this.meta.updateTag({ property: 'og:url', content: `${window.location.href}` });

    this.createCanonicalURL();
  }

  createCanonicalURL() {
    let link: HTMLLinkElement = this.dom.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.dom.head.appendChild(link);
    link.setAttribute('href', this.dom.URL);
    link.setAttribute('hreflang', 'en-us');
  }


}
