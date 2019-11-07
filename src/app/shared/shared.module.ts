import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailCardComponent } from './product-detail-card/product-detail-card.component';
import { ServiceDetailCardComponent } from './service-detail-card/service-detail-card.component';
import { CoreModule } from '../core';
import { ServicesListComponent } from './services-list/services-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ErrorComponent } from './error/error.component';
import { FrontendPaginationComponent } from './frontend-pagination/frontend-pagination.component';
import { KeyHandlerDirective } from './directives/key-handler.directive';
import { AboutUsComponent } from './about-us/about-us.component';
import { DefaultImageDirective } from './directives/default-image.directive';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';
import { RatingViewComponent } from './rating-view/rating-view.component';
import { AddRatingComponent } from './add-rating/add-rating.component';
import { TimeAgoPipe } from './timeago.pipe';
import { NoReviewComponent } from './no-review/no-review.component';

@NgModule({
  declarations: [ProductsListComponent, ProductDetailCardComponent, ServiceDetailCardComponent, ServicesListComponent, PaginationComponent, ErrorComponent, FrontendPaginationComponent, KeyHandlerDirective, AboutUsComponent, DefaultImageDirective, BreadcrumbComponent, AddRatingComponent, RatingViewComponent, ReviewsListComponent, TimeAgoPipe, NoReviewComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    CoreModule,
    // NgxPaginationModule
  ],
  exports: [
    ProductsListComponent, ProductDetailCardComponent, ServiceDetailCardComponent, PaginationComponent, ServicesListComponent, FrontendPaginationComponent, KeyHandlerDirective, DefaultImageDirective, BreadcrumbComponent, AddRatingComponent, RatingViewComponent, ReviewsListComponent, TimeAgoPipe, NoReviewComponent
  ]
})
export class SharedModule { }
