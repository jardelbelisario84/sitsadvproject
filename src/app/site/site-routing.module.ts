import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCheckoutComponent } from './product-checkout/product-checkout.component';

const routes: Routes = [

  {path: '', component: HomePageComponent},
  {path: 'produtos/:slug', component: ProductListComponent},
  {path: 'produtos/:slug/checkout',  component: ProductCheckoutComponent}


  // {path: '', component: HomePageComponent},
  // {path: 'produtos/:slug', component: ProductListComponent},
  // {path: 'produtos/:slug/checkout', loadChildren: '../product-checkout/product-checkout.module#ProductCheckoutModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
