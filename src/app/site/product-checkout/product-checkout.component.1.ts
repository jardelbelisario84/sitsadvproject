import { Component, OnInit, NgZone, AfterContentInit } from '@angular/core';

import { CheckoutService } from './checkout.service';

import scriptjs from 'scriptjs/src/script'
import { PaymentHttp } from 'src/app/service/payment-http';


declare var PagSeguroDirectPayment: any;
declare var $window: any;

@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.css']
})
export class ProductCheckoutComponent implements OnInit, AfterContentInit {


  paymentMethod = 'BOLETO';
  paymentMethods: Array<any> = [];


  creditCard = {
    num: '',
    cvv: '',
    monthExp: '',
    yearExp: '',
    brand: '',
    token: ''
  };

  constructor(
    public checkoutService: CheckoutService,
    public paymentHttp: PaymentHttp,
    public zone: NgZone) { }



  ngOnInit() {
    this.checkoutService.startSession()
      .subscribe(data => {
        console.log(data);
        console.log(this.initSession(data));
      })
  }

  ngAfterContentInit() {

  }



  initSession(data) {
    PagSeguroDirectPayment.setSessionId(data.id);
  }

  getPaymentMethods() {
    PagSeguroDirectPayment.getPaymentMethods({
      amount: 100,
      success: (response) => {
        this.zone.run(() => {
          let paymentMethods = response.paymentMethods;
          this.paymentMethods = Object.keys(paymentMethods).map((key) => paymentMethods[key]);

        });
      }
    });
  }

  gerarBoleto() {
    let data = {
      sendHash: PagSeguroDirectPayment.getSenderHash(),

    };


    // PagSeguroDirectPayment.onSenderHashReady((response) => {
    //   data['sendHash'] = response.senderHash; //Hash estará disponível nesta variável.
    // });

    this.paymentHttp.geraBoleto(data)
      .subscribe(
        (response) => {
        console.log('deu certo')
        console.log(response);
        // window.open(response, '_blank');
      });
      


  }



  

  makePayment() {
    let data = {
      items: [],
      hash: PagSeguroDirectPayment.getSenderHash(),
      method: this.paymentMethod,
      total: 457
    };

    // let doPayment = () => {
    //   this.paymentHttp.doPayment(data).subscribe(() => {
    //     console.log('deu certo')
    //   });
    // };
    // if (this.paymentMethod == 'CREDIT_CARD') {
    //   this.prepareCreditCard().then(() => {
    //     (<any>data).token = this.creditCard.token;
    //     doPayment();
    //   }, (error) => console.log(error));
    //   return;
    // }

    // doPayment();
  }

  prepareCreditCard(): Promise<any> {
    return this.getCreditCardBrand().then(() => {
      return this.getCreditCardToken();
    });
  }

  getCreditCardBrand(): Promise<any> {
    return new Promise((resolve, reject) => {
      PagSeguroDirectPayment.getBrand({
        cardBin: this.creditCard.num.substring(0, 6),
        success: (response) => {
          this.zone.run(() => {
            this.creditCard.brand = response.brand.name;
            console.log(response);
            resolve({ brand: response.brand.name });
          });
        },
        error(error) {
          reject(error)
        }
      });
    });
  }

  getCreditCardToken(): Promise<any> {
    return new Promise((resolve, reject) => {
      PagSeguroDirectPayment.createCardToken({
        cardNumber: this.creditCard.num,
        brand: this.creditCard.brand,
        cvv: this.creditCard.cvv,
        expirationMonth: this.creditCard.monthExp,
        expirationYear: this.creditCard.yearExp,
        success: (response) => {
          this.zone.run(() => {
            this.creditCard.token = response.card.token;
            resolve({ token: response.card.token });
            console.log(response);
          });
        },
        error(error) {
          reject(error)
        }
      })
    });
  }

}
