import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { CoreModule } from 'src/app/core';
import { UiModule, HeaderComponent, LayoutComponent, FooterComponent } from 'src/app/ui';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchContainerComponent } from './components/search-container/search-container.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { PopularSearchComponent } from './components/popular-search/popular-search.component';


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
export class HomeModule { }
