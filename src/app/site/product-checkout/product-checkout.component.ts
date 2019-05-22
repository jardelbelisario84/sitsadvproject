import { Component, OnInit, NgZone, AfterContentInit } from '@angular/core';

import { CheckoutService } from './checkout.service';
import { PaymentHttp } from './payment-http';
// import scriptjs from 'scriptjs/src/script'
import { Dados } from './dados.class';


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


  // creditCard = {
  //   num: '',
  //   cvv: '',
  //   monthExp: '',
  //   yearExp: '',
  //   brand: '',
  //   token: ''
  // };


  dadosCredicard = {
    nome: 'Jardel Henrique',
    cpf: '66523165019',
    nascimento: '',
    telefone: '99999999999',
    numCard: '4111111111111111',              // ex: '4111111111111111'
    mesValidadeCard: '12',                   // ex: '12',
    anoValidadeCard: '2030',                 // ex: '2030',
    codSegCard: '123',                      // ex: '123',
    bandCard: '',                           // preenchido dinamicamente
    hashCard: '',                           // preenchido dinamicamente
    sendHash: '',                           // preenchido dinamicamente
    parcelas: []                            // preenchido dinamicamente
  }

  public dados = new Dados();


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
    
      this.dadosCredicard.sendHash = PagSeguroDirectPayment.getSenderHash(),
  
      console.log(this.dadosCredicard.sendHash);

    // PagSeguroDirectPayment.onSenderHashReady((response) => {
    //   data['sendHash'] = response.senderHash; //Hash estará disponível nesta variável.
    // });

    this.paymentHttp.geraBoleto(this.dadosCredicard)
      .subscribe(
        (response) => {
          console.log('Resposta do boleto: ',response);
          window.open(response, '_blank');
        }, error => {
          console.log(error);
        });



  }


  // makePayment() {
  //   let data = {
  //     items: [],
  //     hash: PagSeguroDirectPayment.getSenderHash(),
  //     method: this.paymentMethod,
  //     total: 457
  //   };

  //   let doPayment = () => {
  //     this.paymentHttp.doPayment(data).subscribe(() => {
  //       console.log('deu certo')
  //     });
  //   };
  //   if (this.paymentMethod == 'CREDIT_CARD') {
  //     this.prepareCreditCard().then(() => {
  //       (<any>data).token = this.creditCard.token;
  //       doPayment();
  //     }, (error) => console.log(error));
  //     return;
  //   }

  //   doPayment();
  // }

  // prepareCreditCard(): Promise<any> {
  //   return this.getCreditCardBrand().then(() => {
  //     return this.getCreditCardToken();
  //   });
  // }

  // getCreditCardBrand(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     PagSeguroDirectPayment.getBrand({
  //       cardBin: this.creditCard.num.substring(0, 6),
  //       success: (response) => {
  //         this.zone.run(() => {
  //           this.creditCard.brand = response.brand.name;
  //           console.log(response);
  //           resolve({ brand: response.brand.name });
  //         });
  //       },
  //       error(error) {
  //         reject(error)
  //       }
  //     });
  //   });
  // }

  // getCreditCardToken(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     PagSeguroDirectPayment.createCardToken({
  //       cardNumber: this.creditCard.num,
  //       brand: this.creditCard.brand,
  //       cvv: this.creditCard.cvv,
  //       expirationMonth: this.creditCard.monthExp,
  //       expirationYear: this.creditCard.yearExp,
  //       success: (response) => {
  //         this.zone.run(() => {
  //           this.creditCard.token = response.card.token;
  //           resolve({ token: response.card.token });
  //           console.log(response);
  //         });
  //       },
  //       error(error) {
  //         reject(error)
  //       }
  //     })
  //   });
  // }





  /** 
   *  BIBLIOTECA ANGULAR PAGSEGURO
   * 
   * */


  //BUSCA A BANDEIRA DO CARTÃO (EX: VISA, MASTERCARD ETC...) E DEPOIS BUSCA AS PARCELAS;
  //ESTA FUNÇÃO É CHAMADA QUANDO O INPUT QUE RECEBE O NÚMERO DO CARTÃO PERDE O FOCO;
  buscaBandeira() {

    PagSeguroDirectPayment.getBrand({
      cardBin: this.dadosCredicard.numCard,
      success: response => {


        this.dadosCredicard.bandCard = response.brand.name;
        console.log('Bandeira do cartão: ' + this.dadosCredicard.bandCard);
        this.buscaParcelas();

      },
      error: response => { console.log(response); }
    });

  }


  //BUSCA AS PARCELAS NA API DO PAGSEGURO PARA O CLIENTE ESCOLHER
  buscaParcelas() {

    // console.log(this.dadosCredicard.bandCard);

    PagSeguroDirectPayment.getInstallments({

      amount: '497',              //valor total da compra (deve ser informado)
      brand: this.dadosCredicard.bandCard, //bandeira do cartão (capturado na função buscaBandeira)
      maxInstallmentNoInterest: 3,
      success: response => {
        console.log('parcelas: ', response );

        this.dadosCredicard.parcelas = response.installments[this.dadosCredicard.bandCard];
        console.log('parcelas result: ', this.dadosCredicard.parcelas );


      },
      error: response => { console.log(response) }
    });

  }

  //AO CLICAR NO BOTÃO PAGAR
  onSubmit(dadosCredicard) {

    //BUSCA O HASH DO COMPRADOR JUNTO A API DO PAGSEGURO
    dadosCredicard.sendHash = PagSeguroDirectPayment.getSenderHash();

    //CRIA O HASK DO CARTÃO DE CRÉDITO JUNTO A API DO PAGSEGURO
    PagSeguroDirectPayment.createCardToken({

      cardNumber: dadosCredicard.numCard,
      cvv: dadosCredicard.codSegCard,
      expirationMonth: dadosCredicard.mesValidadeCard,
      expirationYear: dadosCredicard.anoValidadeCard,

      success: response => {

        dadosCredicard.hashCard = response.card.token;
        
        this.buscaBandeira();

        console.log('Dados retornados: ',  dadosCredicard);
        // console.log("Passou cartão");

        //NESTE MOMENTO JÁ TEMOS TUDO QUE PRECISAMOS!
        //HORA DE ENVIAR OS DADOS PARA O SERVIDOR PARA CONCRETIZAR O PAGAMENTO
        this.enviaDadosParaServidor(dadosCredicard);

      },
      error: response => { 
        console.log(response) 
      }

    });

  }

  enviaDadosParaServidor(dados) {
    //COLOQUE AQUI O CÓDIGO PARA ENVIAR OS DADOS PARA O SERVIDOR (PHP, JAVA ETC..) PARA QUE ELE CONSUMA A API DO PAGSEGURO E CONCRETIZE A TRANSAÇÃO
    this.paymentHttp.transationCredCard(dados).subscribe(result => console.log(result));
  }




}

/*
}
  PARA USAR O CHECKOUT TRANSPARENTE DO PAGSEGURO, É NECESSÁRIO CARREGAR UM ARQUIVO JS EXTERNO (pagseguro.directpayment.js).
  AQUI NÓS USAMOS UM SCRIPT PARA QUE ESSE JS SEJA CARREGADO SOMENTE NA HORA QUE ESTE COMPONENTE FOR CHAMADO (EVITANDO CARREGAR O JS DO PAGSEGURO
  TODA VEZ QUE O COMPONENTE FOR CHAMADO). PORÉM, SE VOCÊ PREFERIR, O JS PODE SER CARREGADO NO INDEX.HTML (FICA AO SEU CRITÉRIO).
  O SCRIPT, QUE FICA NA FUNÇÃO carregaJavascriptPagseguro(), CRIA UMA TAG DO TIPO SCRIPT NO HEAD DA PÁGINA E SETA O ARQUIVO JS PARA EVITAR QUE O JS SEJA
  CARREGADO TODA HORA QUE O COMPONENTE FOR CHAMADO. TAMBÉM CRIAMOS UM SERVIÇO GLOBAL QUE ARMAZENA UMA VARIÁVEL BOOLEANA PARA INFICAR SE O JS JÁ
  FOI CARREGADO OU NÃO. UMA VEZ CARREGADO, O JS NÃO SERÁ CARREGADO NOVAMENTE.
*/

