import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { OfficeCardComponent } from './components/office-card/office-card.component';


@NgModule({
  declarations: [
    OfficeCardComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [OfficeCardComponent]
})
export class SharedModule { }
