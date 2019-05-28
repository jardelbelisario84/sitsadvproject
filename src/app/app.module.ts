import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutService } from './site/product-checkout/checkout.service';
import { PaymentHttp } from './service/payment-http';
import { ProdutosService } from './site/service-local/produtos.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp( environment.firebaseConfig),
    AngularFirestoreModule, 
    AngularFireDatabaseModule
    
  ],
  providers: [
    CheckoutService,
    PaymentHttp,
    ProdutosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
