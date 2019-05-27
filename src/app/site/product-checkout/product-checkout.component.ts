import { Component, OnInit, NgZone, AfterContentInit } from '@angular/core';

import { CheckoutService } from './checkout.service';
import { PaymentHttp } from './payment-http';
import scriptjs from 'scriptjs/src/script'
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../service-local/produtos.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


declare var PagSeguroDirectPayment: any;
declare var $window: any;

@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.css']
})
export class ProductCheckoutComponent implements OnInit, AfterContentInit {


  loadingPage = false;
  linkBoleto = '';
  hideBlock = false;
  hideBlockBoleto = false;
  hideBlockCreditCard = false;

  paymentMethod = 'BOLETO';
  paymentMethods: Array<any> = [];

  escolherQntParcelas: any;

  // dadosCredicard = {
  //   nome: 'Jardel Henrique',
  //   cpf: '66523165019',
  //   nascimento: '',
  //   telefone: '99999999999',
  //   numCard: '',                            // ex: '4111111111111111'
  //   mesValidadeCard: '',                  // ex: '12',
  //   anoValidadeCard: '',                // ex: '2030',
  //   codSegCard: '',                      // ex: '123',
  //   bandCard: '',                           // preenchido dinamicamente
  //   hashCard: '',                           // preenchido dinamicamente
  //   sendHash: '',                           // preenchido dinamicamente
  //   parcelas: [],                            // preenchido dinamicamente
  //   amount: '',
  //   email: '',

  //   estado: '',
  //   cidade: '',
  //   bairro: '',
  //   cep: '',
  //   rua: '',
  //   numero: '',
  //   titleProduct: '',
  //   idProduct: '',
  // }


  // clientForm2 = this.fb.group({
  //   firstName: [' ', [Validators.required, Validators.minLength(5)]],
  //   lastName: ['', [Validators.required]],
  //   birth: [new Date(), [Validators.required]],
  //   age: [0, [Validators.required, Validators.max(150), Validators.min(0)]],
  //   email: ['', [Validators.required, Validators.email]],
  //   street: ['', [Validators.required]],
  //   city: ['', [Validators.required]],
  //   state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
  //   phone1: ['', [Validators.required]],
  //   phone2: ['', [Validators.required]],
  // });




  produto;

  constructor(
    public checkoutService: CheckoutService,
    public paymentHttp: PaymentHttp,
    public zone: NgZone,
    private route: ActivatedRoute,
    private product: ProdutosService,
    private router: Router,
    private fb: FormBuilder) { }



  clientForm = this.fb.group({

    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    cpf: ['', [Validators.required]],                                //'66523165019',
    telefone: ['', [Validators.required]],
    

    cep: ['', [Validators.required]],
    estado: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    bairro: ['', [Validators.required]],
    rua: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    complemento: ['', [Validators.required]],

    
    emailAccess: ['', [Validators.required]],
    password: ['', [Validators.required]],
    

    nomePortadorCard: ['', [Validators.required]],
    numCard:  ['', [Validators.required]],                           // ex: '4111111111111111'
    mesValidadeCard:  ['', [Validators.required]],                 // ex: '12',
    anoValidadeCard:  ['', [Validators.required]],               // ex: '2030',
    codSegCard:  ['', [Validators.required]],                     // ex: '123',
    bandCard:  ['', [Validators.required]],                          // preenchido dinamicamente
    hashCard:  ['', [Validators.required]],                          // preenchido dinamicamente
    sendHash:  ['', [Validators.required]],                          // preenchido dinamicamente
    parcelas: [[], [Validators.required]],                             // preenchido dinamicamente
    // parcelasCard:  ['', [Validators.required]],                             // preenchido dinamicamente
    amount: ['', [Validators.required]],  
    email: ['', [Validators.required]],  
    
    nascimento: ['', [Validators.required]],
    estadoCard: ['', [Validators.required]],  
    cidadeCard: ['', [Validators.required]],  
    bairroCard: ['', [Validators.required]],  
    cepCard: ['', [Validators.required]],  
    ruaCard: ['', [Validators.required]],  
    numeroCard: ['', [Validators.required]],  
    titleProduct: ['', [Validators.required]],  
    idProduct: ['', [Validators.required]],  
    
  });


  dataCredicard = this.fb.group({
    
  })


  ngOnInit() {


    this.produto = this.product.getProduto(this.route.snapshot.params['slug']);
    console.log('Produto list', this.produto);

    // this.checkoutService.startSession()
    if (!environment.production) {
      scriptjs('https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js', () => {
        this.paymentHttp.getSession()
          .subscribe(data => {
            console.log(data);
            console.log(this.initSession(data));
          })
      })
    } else {
      scriptjs('https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js', () => {
        this.paymentHttp.getSession()
          .subscribe(data => {
            console.log(data);
            console.log(this.initSession(data));
          })
      })
    }

  }

  ngAfterContentInit() {

  }



  initSession(data) {
    PagSeguroDirectPayment.setSessionId(data['id']);
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

    this.loadingPage = true;
    this.clientForm.value.sendHash = PagSeguroDirectPayment.getSenderHash();
    this.clientForm.value.amount = this.produto.price;
    this.clientForm.value.nome = 'João da Silva de Sousa'
    this.clientForm.value.estado = 'MA';
    this.clientForm.value.cidade = 'Imperatriz';
    this.clientForm.value.bairro = 'Vila Lobão';
    this.clientForm.value.cep = '65910-180';
    this.clientForm.value.rua = 'Assembleia';
    this.clientForm.value.numero = '001';
    this.clientForm.value.titleProduct = this.produto.title;
    this.clientForm.value.idProduct = this.produto.slug + '-' + Date.now();

    this.paymentHttp.geraBoleto(this.clientForm.value)
      .subscribe(
        response => {
          this.loadingPage = false;
          this.hideBlock = true;

          this.hideBlockBoleto = true;
          this.hideBlockCreditCard = false;

          console.log('Resposta do boleto: ', response);
          this.linkBoleto = response[0];
          window.scrollTo(0, 0);
          // window.open(response[0], '_blank');
        }, (error: HttpErrorResponse) => {
          this.loadingPage = false;
          console.log(error); // body
          // console.log(error.error.text); // body
        });
  }


  openLinkBoleto() {
    window.open(this.linkBoleto, '_blank');
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);

  }



  /** 
   *  BIBLIOTECA ANGULAR PAGSEGURO
   * 
   * */


  //BUSCA A BANDEIRA DO CARTÃO (EX: VISA, MASTERCARD ETC...) E DEPOIS BUSCA AS PARCELAS;
  //ESTA FUNÇÃO É CHAMADA QUANDO O INPUT QUE RECEBE O NÚMERO DO CARTÃO PERDE O FOCO;
  buscaBandeira() {

    PagSeguroDirectPayment.getBrand({
      cardBin: this.clientForm.value.numCard,
      success: response => {
        this.clientForm.value.bandCard = response.brand.name;
        // console.log('Bandeira do cartao objeto', response )
        console.log('Bandeira do cartão: ' + this.clientForm.value.bandCard);
        this.buscaParcelas();
      },
      error: response => { console.log(response); }
    });

  }


  //BUSCA AS PARCELAS NA API DO PAGSEGURO PARA O CLIENTE ESCOLHER
  buscaParcelas() {
    // console.log(this.dadosCredicard.bandCard);
    PagSeguroDirectPayment.getInstallments({
      amount: this.produto.price,              //valor total da compra (deve ser informado)
      brand: this.clientForm.value.bandCard,   //bandeira do cartão (capturado na função buscaBandeira)
      
      maxInstallmentNoInterest: 1,
      success: response => {
        this.escolherQntParcelas = response.installments[this.clientForm.value.bandCard];
        console.log('Parcelas Result: ', this.escolherQntParcelas);
      },
      error: response => { console.log(response) }
    });
  }

  //AO CLICAR NO BOTÃO PAGAR
  onSubmit(dadosCredicard) {
    this.loadingPage = true;
    //BUSCA O HASH DO COMPRADOR JUNTO A API DO PAGSEGURO
    dadosCredicard.sendHash = PagSeguroDirectPayment.getSenderHash();

    //CRIA O HASK DO CARTÃO DE CRÉDITO JUNTO A API DO PAGSEGURO
    // PagSeguroDirectPayment.createCardToken({
    //   cardNumber: dadosCredicard.numCard,
    //   cvv: dadosCredicard.codSegCard,
    //   expirationMonth: dadosCredicard.mesValidadeCard,
    //   expirationYear: dadosCredicard.anoValidadeCard,
    //   success: response => {
    //     this.zone.run(() => {
    //       dadosCredicard.hashCard = response.card.token;
    //       console.log(response);
    //       this.buscaBandeira();
    //       console.log('Dados retornados: ', dadosCredicard);
    //       // console.log("Passou cartão");
    //       //NESTE MOMENTO JÁ TEMOS TUDO QUE PRECISAMOS!
    //       //HORA DE ENVIAR OS DADOS PARA O SERVIDOR PARA CONCRETIZAR O PAGAMENTO
    //       this.enviaDadosParaServidor(dadosCredicard);
    //     });
    //   },
    //   error(res) {
    //     console.log(res)
    //   }
    // });


    console.log(this.clientForm.value);


  }


  onSubmitCardCredit() {

  }


  enviaDadosParaServidor(dados) {
    //COLOQUE AQUI O CÓDIGO PARA ENVIAR OS DADOS PARA O SERVIDOR (PHP, JAVA ETC..) PARA QUE ELE CONSUMA A API DO PAGSEGURO E CONCRETIZE A TRANSAÇÃO
    this.paymentHttp.transationCredCard(dados).subscribe(result => {
      this.loadingPage = false;
      this.hideBlock = true;
      this.hideBlockBoleto = false;
      this.hideBlockCreditCard = true;
      console.log(result)
    });
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

