import { Component } from '@angular/core';
import { JdCategoryService } from './core/services';
import { SeoService } from './core/services/seo.service';
import { SEO } from './core/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecp-ui-frontend';

  constructor(private JDCategory: JdCategoryService, private seoService: SeoService) {
    this.JDCategory.fetchAllCategories();

    const config: SEO = {
      title: 'An Elderly Care Platform engineered by Social Alpha and Supported by Tata Trusts',
      keywords: 'Elderly Care, products, services, events, discussions',
      description: 'Supported by Tata Trusts',
      author: 'Social Alpa',
      image: `${window.location.origin}/assets/imgaes/landing-img/Landing-320.png`
    }
    this.seoService.generateTags(config);
  }
}
