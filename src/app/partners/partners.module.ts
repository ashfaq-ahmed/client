import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CommonModule } from '@angular/common';

import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './partners.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PartnersComponent
  ],
  imports: [
    CommonModule,
    LeafletModule,
    SharedModule,
    ReactiveFormsModule,
    PartnersRoutingModule
  ]
})
export class PartnersModule { }
