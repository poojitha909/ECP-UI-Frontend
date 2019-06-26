import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomePageComponent } from "./home-page/home-page.component";
import { CoreModule } from "src/app/core";
import {
  UiModule,
  HeaderComponent,
  LayoutComponent,
  FooterComponent
} from "src/app/ui";

@NgModule({
  declarations: [
    HomePageComponent,
    HeaderComponent,
    LayoutComponent,
    FooterComponent
  ],
  imports: [CommonModule, UiModule, HomeRoutingModule, CoreModule]
})
export class HomeModule {}
