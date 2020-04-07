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
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { FeaturedServicesComponent } from './featured-services/featured-services.component';
import { FeaturedAskExpertsComponent } from './featured-ask-experts/featured-ask-experts.component';
import { FeaturedDiscussionsComponent } from './featured-discussions/featured-discussions.component';
import { FeaturedEventsComponent } from './featured-events/featured-events.component';
import { EllipsisPipe } from './ellipsis.pipe';
import { StripHtmlPipe } from './striphtml.pipe';
import { ServiceSearchCardComponent } from './service-search-card/service-search-card.component';
import { ProductSearchCardComponent } from './product-search-card/product-search-card.component';
import { DicussionSummaryCardComponent } from './dicussion-summary-card/dicussion-summary-card.component';
import { EventSummaryCardComponent } from './event-summary-card/event-summary-card.component';
import { AskExpertSummaryCardComponent } from './ask-expert-summary-card/ask-expert-summary-card.component';
import { ActiveMaxDirective } from './directives/active-max.directive';
import { FeaturedMyQuestionsComponent } from './featured-my-questions/featured-my-questions.component';
import { MyQuestionsSummaryCardComponent } from './my-questions-summary-card/my-questions-summary-card.component';
import { UserTermsComponent } from './user-terms/user-terms.component';
import { UserPolicyComponent } from './user-policy/user-policy.component';
import { ServiceCategoriesComponent } from './service-categories/service-categories.component';
import { ServicesResultComponent } from './services-result/services-result.component';
import { ProductResultsComponent } from './product-results/product-results.component';
import { ProductNoRecordComponent } from './product-no-record/product-no-record.component';
import { DiscussionResultsComponent } from './discussion-results/discussion-results.component';
import { EventResultsComponent } from './event-results/event-results.component';
import { NoDiscussionResultsComponent } from './no-discussion-results/no-discussion-results.component';
import { NoEventResultsComponent } from './no-event-results/no-event-results.component';

import { QuestionNoRecordComponent } from './question-no-record/question-no-record.component';
import { AskQuestionExpertsComponent } from './ask-question-experts/ask-question-experts.component';
import { AskQuestionMyQuesComponent } from './ask-question-myques/ask-question-myques.component';
import { ExpertAllQuestionComponent } from './expert-all-question/expert-all-question.component';
import { QuestionDetailCardComponent } from './question-detail-card/question-detail-card.component';
import { ExpertDetailCardComponent } from './expert-detail-card/expert-detail-card.component';
import { ExpertNoRecordComponent } from './expert-no-record/expert-no-record.component';
import { QuestionExpertNoRecordComponent } from './question-expert-no-record/question-expert-no-record.component';
import { NoRecordsComponent } from './no-records/no-records.component';
import { EventNoRecordComponent } from './event-no-record/event-no-record.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailCardComponent,
    ServiceDetailCardComponent,
    ServicesListComponent,
    PaginationComponent,
    ErrorComponent,
    FrontendPaginationComponent,
    KeyHandlerDirective,
    AboutUsComponent,
    DefaultImageDirective,
    BreadcrumbComponent,
    AddRatingComponent,
    RatingViewComponent,
    ReviewsListComponent,
    TimeAgoPipe,
    EllipsisPipe,
    StripHtmlPipe,
    NoReviewComponent,
    FeaturedProductsComponent,
    FeaturedServicesComponent,
    FeaturedAskExpertsComponent,
    FeaturedDiscussionsComponent,
    FeaturedEventsComponent,
    ServiceSearchCardComponent,
    ProductSearchCardComponent,
    DicussionSummaryCardComponent,
    EventSummaryCardComponent,
    AskExpertSummaryCardComponent,
    ActiveMaxDirective,
    FeaturedMyQuestionsComponent,
    MyQuestionsSummaryCardComponent,
    UserTermsComponent,
    UserPolicyComponent,
    ServiceCategoriesComponent,
    ServicesResultComponent,
    ProductResultsComponent,
    ProductNoRecordComponent,
    DiscussionResultsComponent,
    EventResultsComponent,
    NoDiscussionResultsComponent,
    NoEventResultsComponent,
    QuestionNoRecordComponent,
    AskQuestionExpertsComponent,
    AskQuestionMyQuesComponent,
    ExpertAllQuestionComponent,
    QuestionDetailCardComponent,
    ExpertDetailCardComponent,
    ExpertNoRecordComponent,
    QuestionExpertNoRecordComponent,
    NoRecordsComponent,
    EventNoRecordComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    CoreModule,
    // NgxPaginationModule
  ],
  exports: [
    ProductsListComponent,
    ProductDetailCardComponent,
    ServiceDetailCardComponent,
    PaginationComponent,
    ServicesListComponent,
    FrontendPaginationComponent,
    KeyHandlerDirective,
    DefaultImageDirective,
    BreadcrumbComponent,
    AddRatingComponent,
    RatingViewComponent,
    ReviewsListComponent,
    TimeAgoPipe,
    EllipsisPipe,
    StripHtmlPipe,
    NoReviewComponent,
    FeaturedProductsComponent,
    FeaturedServicesComponent,
    FeaturedAskExpertsComponent,
    FeaturedDiscussionsComponent,
    FeaturedEventsComponent,
    ServiceSearchCardComponent,
    ProductSearchCardComponent,
    DicussionSummaryCardComponent,
    EventSummaryCardComponent,
    AskExpertSummaryCardComponent,
    ActiveMaxDirective,
    FeaturedMyQuestionsComponent,
    MyQuestionsSummaryCardComponent,
    ServicesResultComponent,
    // ServiceCategoriesComponent
    ProductResultsComponent,
    ProductNoRecordComponent,
    DiscussionResultsComponent,
    EventResultsComponent,
    QuestionNoRecordComponent,
    AskQuestionExpertsComponent,
    AskQuestionMyQuesComponent,
    ExpertAllQuestionComponent,
    QuestionDetailCardComponent,
    ExpertDetailCardComponent,
    ExpertNoRecordComponent,
    QuestionExpertNoRecordComponent,
    NoRecordsComponent,
    EventNoRecordComponent
  ]
})
export class SharedModule { }
