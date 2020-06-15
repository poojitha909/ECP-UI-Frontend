import { Injectable, Inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SEO } from '../interfaces';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Title }     from '@angular/platform-browser';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  config: any;
  constructor(
    private meta: Meta,
    private titleService: Title,
    private configServ: ConfigurationService,
    @Inject(DOCUMENT) private dom
  ) { 
    this.configServ.loadConfigurations().subscribe( (c) => {
      this.config = c;
    })
  }


  generateTags(seoConfig: SEO) {
    this.meta.updateTag({ name: 'keywords', content: seoConfig.keywords });
    this.meta.updateTag({ name: 'description', content: seoConfig.description });
    this.meta.updateTag({ name: 'image', content: seoConfig.image })
    this.meta.updateTag({ name: 'author', content: seoConfig.author });
    this.meta.updateTag({ name: 'title', content: seoConfig.title });
    this.titleService.setTitle( seoConfig.title );

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: 'Joy of Age by Tata Trusts' });
    this.meta.updateTag({ name: 'twitter:title', content: seoConfig.title });
    this.meta.updateTag({ name: 'twitter:description', content: seoConfig.description });
    this.meta.updateTag({ name: 'twitter:image', content: seoConfig.image });

    this.meta.updateTag({ property: 'fb:app_id', content: this.config.facebook.clientId });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({
      property: 'og:site_name', content: `Joy of Age by Tata Trusts`
    });
    this.meta.updateTag({ property: 'og:title', content: seoConfig.title });
    this.meta.updateTag({ property: 'og:description', content: seoConfig.description });
    this.meta.updateTag({ property: 'og:image', content: seoConfig.image });
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
