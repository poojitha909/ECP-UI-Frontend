import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core';
import { CommunityRoutingModule } from './community-routing.module';
import { CommunityPageComponent } from './components/community-page/community-page.component';

@NgModule({
  declarations: [CommunityPageComponent],
  imports: [CommonModule, CommunityRoutingModule,CoreModule]
})
export class CommunityModule {}
