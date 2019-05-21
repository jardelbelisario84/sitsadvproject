import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';
import { SiteMenuComponent } from '../layout/site-menu/site-menu.component';




@NgModule({
  declarations: [
    HomePageComponent,
    ProductListComponent,
    ProductCheckoutComponent,
    SiteMenuComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule
  ]
})
export class SiteModule { }