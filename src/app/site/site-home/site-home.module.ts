import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteHomeRoutingModule } from './site-home-routing.module';
import { HomePageComponent } from '../home-page/home-page.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    // HomePageComponent,
    // ProductListComponent,
    // MenuComponent
  ],
  imports: [
    CommonModule,
    SiteHomeRoutingModule
  ]
})
export class SiteHomeModule { }
