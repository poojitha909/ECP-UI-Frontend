import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { CoreModule } from 'src/app/core';
import { UiModule, HeaderComponent, LayoutComponent, FooterComponent } from 'src/app/ui';
import { SearchContainerComponent } from './home-page/components/search-container/search-container.component';
import { SearchResultsComponent } from './home-page/components/search-results/search-results.component';
import { PopularSearchComponent } from './home-page/components/popular-search/popular-search.component';

@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent,
    LayoutComponent,
    FooterComponent,
    SearchContainerComponent,
    SearchResultsComponent,
    PopularSearchComponent
  ],
  imports: [CommonModule, UiModule, HomeRoutingModule, CoreModule]
})
export class HomeModule {}
