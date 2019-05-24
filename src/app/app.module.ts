import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutService } from './site/product-checkout/checkout.service';
import { PaymentHttp } from './site/product-checkout/payment-http';
import { ProdutosService } from './site/service-local/produtos.service';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CheckoutService,
    PaymentHttp,
    ProdutosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
