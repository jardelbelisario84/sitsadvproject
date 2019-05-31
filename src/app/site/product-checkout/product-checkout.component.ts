import { Component, OnInit, NgZone, AfterContentInit } from '@angular/core';

import { CheckoutService } from './checkout.service';
import { PaymentHttp } from '../../service/payment-http';
import scriptjs from 'scriptjs/src/script'
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../service-local/produtos.service';
import { FormBuilder, Validators } from '@angular/forms';
import { GenericValidator } from 'src/app/shared/validacoes/generic-validator';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import * as  moment from 'moment';



declare var PagSeguroDirectPayment: any;
// declare var $window: any;

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

  produto: any;
  escolheSelect: boolean = false;
  msgError = '';

  constructor(
    public checkoutService: CheckoutService,
    public paymentHttp: PaymentHttp,
    public zone: NgZone,
    private route: ActivatedRoute,
    private product: ProdutosService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthServiceService) { }



  clientForm = this.fb.group({

    firstName: ['Jardel', [Validators.required, Validators.minLength(3)]],
    lastName: ['Henrique', [Validators.required, Validators.minLength(3)]],
    cpf: ['66523165019', [
      Validators.required,
      GenericValidator.isValidCpf(),
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(11),
      Validators.maxLength(11)]],                                //'66523165019',
    telefone: ['99988351234', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(11),
      Validators.maxLength(11)]],

    // DADOS DE ENDEREÇO
    cep: ['659000000', [Validators.required]],
    estado: ['MA', [Validators.required]],
    cidade: ['Imperatriz', [Validators.required]],
    bairro: ['Vila Lobão', [Validators.required]],
    rua: ['Assembleia', [Validators.required]],
    numero: ['001', [Validators.required]],
    complemento: ['002', [Validators.required]],

    //DADOS DE ACESSO
    emailAccess: ['email001@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],


    //DADOS REFERENTE AO CARTÃO DE CRÉDITO
    nomePortadorCard: ['Jardel Henrique', [Validators.required]],
    numCard: ['4111111111111111', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(16),
      Validators.maxLength(16)]],                           // ex: '4111111111111111'
    mesValidadeCard: ['12', [Validators.required]],                   // ex: '12',
    anoValidadeCard: ['2030', [Validators.required]],                   // ex: '2030',
    codSegCard: ['', [Validators.required]],                        // ex: '123',
    bandCard: [''],                                                 // preenchido dinamicamente
    hashCard: [''],                                                 // preenchido dinamicamente
    sendHash: [''],                                                 // preenchido dinamicamente
    parcelas: [[''], [Validators.required]],                        // preenchido dinamicamente   
    cpfCard: ['66523165019', [
      Validators.required,
      GenericValidator.isValidCpf(),
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(11),
      Validators.maxLength(11)]],
    telefoneCard: ['88888888888', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(11),
      Validators.maxLength(11)]],                  // preenchido dinamicamente
    // amount: [''],
    // id: [''],
    created_at: [''],
    updated_at: [''],

    nascimento: ['1984-09-26', [Validators.required]],
    // estadoCard: [''],
    // cidadeCard: [''],
    // bairroCard: [''],
    // cepCard: [''],
    // ruaCard: [''],
    // numeroCard: [''],
    // titleProduct: [''],
    // idProduct: [''],

    codTransactionPagSeguro: [''],



  });

  codTransactionReturn: any;

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
    window.scrollTo(0, 0);
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






  // FUNÇÃO PARA GERAR BOLETO DO PLANO
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
   *  PAGAMENDO COM CARTÃO PLANO
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
        if (this.escolherQntParcelas.length > 0) {
          this.escolheSelect = true
        } else {
          this.escolheSelect = false
        }
        console.log('Parcelas Result length: ', this.escolherQntParcelas.length);
        console.log('Parcelas Result: ', this.escolherQntParcelas);
      },
      error: response => { console.log(response) }
    });
  }

  enviaDadosParaServidor(dados) {
    //COLOQUE AQUI O CÓDIGO PARA ENVIAR OS DADOS PARA O SERVIDOR (PHP, JAVA ETC..) PARA QUE ELE CONSUMA A API DO PAGSEGURO E CONCRETIZE A TRANSAÇÃO
    //aqui ele retona o codigo geralfinal da transação
    this.paymentHttp.transationCredCard(dados)
      .subscribe(
        result => {
          this.loadingPage = false;
          this.hideBlock = true;
          this.hideBlockBoleto = false;
          this.hideBlockCreditCard = true;
          console.log('Codigo transação: ', result[0])
          console.log('Codigo transação  Cod: ', dados.codTransactionPagSeguro)
          // this.codTransactionReturn = result[0];
          return dados.codTransactionPagSeguro = result[0];
        });
  }






  //AO CLICAR NO BOTÃO PAGAR
  onSubmit() {
    this.loadingPage = true;
    //BUSCA O HASH DO COMPRADOR JUNTO A API DO PAGSEGURO
    this.clientForm.value.sendHash = PagSeguroDirectPayment.getSenderHash();
    //CRIA O HASK DO CARTÃO DE CRÉDITO JUNTO A API DO PAGSEGURO
    PagSeguroDirectPayment.createCardToken({

      cardNumber: this.clientForm.value.numCard,
      cvv: this.clientForm.value.codSegCard,
      expirationMonth: this.clientForm.value.mesValidadeCard,
      expirationYear: this.clientForm.value.anoValidadeCard,

      success: response => {

        this.zone.run(() => {

          this.clientForm.value.hashCard = response.card.token;
          console.log(response);
          this.buscaBandeira();

          this.clientForm.value.created_at = moment().format('YYYY-MM-DD');
          // this.clientForm.value.created_at = moment().format('DD/MM/YYYY, H:mm:ss');

          // console.log(moment().format('L'))
          // console.log(moment().format('DD/MM/YYYY, H:mm:ss'))

          this.clientForm.value.updated_at = moment().format('YYYY-MM-DD  H:mm:ss');
          this.authService.register(this.clientForm.value)
            .subscribe(
              (resultRegister) => {
                // this.codTransactionReturn = result[0];
                // this.authService.updateUser(resultRegister)
                console.log('Result Register', resultRegister);
                // console.log('Result Register cod', resultRegister.id);

                this.paymentHttp.transationCredCard(this.clientForm.value)
                  .subscribe(
                    result => {
                      this.loadingPage = false;
                      this.hideBlock = true;
                      this.hideBlockBoleto = false;
                      this.hideBlockCreditCard = true;
                      console.log('Codigo transação: ', result[0])
                      this.clientForm.value.codTransactionPagSeguro = result[0];
                      // console.log('Codigo transação  Cod: ', this.clientForm.value.codTransactionPagSeguro);

                      this.clientForm.value.updated_at = moment().format('YYYY-MM-DD  H:mm:ss');
                      this.authService.updateUser(resultRegister, this.clientForm.value);

                    });



              },
              (error) => {
                this.loadingPage = false;
                if (error.code == "auth/email-already-in-use") {
                  this.msgError = "O e-mail já é cadastrado. Por favor, insira outro e-mail para continuar."
                }
                console.log("Erro ao registrar usuário", error);
              })


          console.log('Dados retornados: ', this.clientForm.value);
          // console.log("Passou cartão");
        });


      },
      error(res) {
        console.log(res)
      }
    });



    console.log('Client Form value', this.clientForm.value);
  }










}










  // //AO CLICAR NO BOTÃO PAGAR
  // onSubmit() {
  //   this.loadingPage = true;
  //   //BUSCA O HASH DO COMPRADOR JUNTO A API DO PAGSEGURO
  //   this.clientForm.value.sendHash = PagSeguroDirectPayment.getSenderHash();
  //   //CRIA O HASK DO CARTÃO DE CRÉDITO JUNTO A API DO PAGSEGURO
  //   PagSeguroDirectPayment.createCardToken({

  //     cardNumber: this.clientForm.value.numCard,
  //     cvv: this.clientForm.value.codSegCard,
  //     expirationMonth: this.clientForm.value.mesValidadeCard,
  //     expirationYear: this.clientForm.value.anoValidadeCard,

  //     success: response => {

  //       this.zone.run(() => {

  //         this.clientForm.value.hashCard = response.card.token;
  //         console.log(response);
  //         this.buscaBandeira();

  //         this.paymentHttp.transationCredCard(this.clientForm.value)
  //         .subscribe(
  //           result => {
  //             this.loadingPage = false;
  //             this.hideBlock = true;
  //             this.hideBlockBoleto = false;
  //             this.hideBlockCreditCard = true;
  //             console.log('Codigo transação: ', result[0])
  //             this.clientForm.value.codTransactionPagSeguro = result[0];
  //             console.log('Codigo transação  Cod: ', this.clientForm.value.codTransactionPagSeguro);


  //             this.authService.register(this.clientForm.value)
  //             .subscribe(
  //               (resultRegister) => {
  //                 // this.codTransactionReturn = result[0];
  //                 // this.authService.updateUser(resultRegister)
  //                 console.log('Result Register', resultRegister);
  //                 console.log('Result Register cod', resultRegister['codTransactionPagSeguro']);
  //               },
  //               (error) => {
  //                 this.loadingPage = false;
  //                 if(error.code == "auth/email-already-in-use"){
  //                   this.msgError = "O e-mail já é cadastrado. Por favor, insira outro e-mail para continuar."
  //                 }
  //                 console.log("Erro ao registrar usuário", error);
  //               })



  //           });






  //         console.log('Dados retornados: ', this.clientForm.value);
  //         // console.log("Passou cartão");


  //       });
  //     },
  //     error(res) {
  //       console.log(res)
  //     }
  //   });



  //   console.log('Client Form value', this.clientForm.value);
  // }



// }























/*
}
  PARA USAR O CHECKOUT TRANSPARENTE DO PAGSEGURO, É NECESSÁRIO CARREGAR UM ARQUIVO JS EXTERNO (pagseguro.directpayment.js).
  AQUI NÓS USAMOS UM SCRIPT PARA QUE ESSE JS SEJA CARREGADO SOMENTE NA HORA QUE ESTE COMPONENTE FOR CHAMADO (EVITANDO CARREGAR O JS DO PAGSEGURO
  TODA VEZ QUE O COMPONENTE FOR CHAMADO). PORÉM, SE VOCÊ PREFERIR, O JS PODE SER CARREGADO NO INDEX.HTML (FICA AO SEU CRITÉRIO).
  O SCRIPT, QUE FICA NA FUNÇÃO carregaJavascriptPagseguro(), CRIA UMA TAG DO TIPO SCRIPT NO HEAD DA PÁGINA E SETA O ARQUIVO JS PARA EVITAR QUE O JS SEJA
  CARREGADO TODA HORA QUE O COMPONENTE FOR CHAMADO. TAMBÉM CRIAMOS UM SERVIÇO GLOBAL QUE ARMAZENA UMA VARIÁVEL BOOLEANA PARA INFICAR SE O JS JÁ
  FOI CARREGADO OU NÃO. UMA VEZ CARREGADO, O JS NÃO SERÁ CARREGADO NOVAMENTE.
*/


    // parcelas: [[{value:'', disabled: true }], [Validators.required]],     // preenchido dinamicamente
    // parcelasCard:  ['', [Validators.required]],      




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