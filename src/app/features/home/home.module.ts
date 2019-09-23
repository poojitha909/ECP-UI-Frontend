import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { CoreModule } from 'src/app/core';
import { SharedModule } from 'src/app/shared';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SearchContainerComponent } from './components/search-container/search-container.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { PopularSearchComponent } from './components/popular-search/popular-search.component';


@NgModule({
  declarations: [
    HomePageComponent,
    SearchContainerComponent,
    SearchResultsComponent,
    PopularSearchComponent
  ],
  imports: [CommonModule, CoreModule, HomeRoutingModule, SharedModule]
})
export class HomeModule { }
