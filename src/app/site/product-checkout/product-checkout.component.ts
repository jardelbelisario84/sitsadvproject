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
import * as toastr from 'toastr';




declare var PagSeguroDirectPayment: any;
// declare var $window: any;

@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.css']
})
export class ProductCheckoutComponent implements OnInit, AfterContentInit {

  // clientForm = this.fb.group({

  //   firstName: ['Jardel', [Validators.required, Validators.minLength(3)]],
  //   lastName: ['Henrique', [Validators.required, Validators.minLength(3)]],
  //   cpf: ['66523165019', [
  //     Validators.required,
  //     GenericValidator.isValidCpf(),
  //     Validators.pattern("^[0-9]*$"),
  //     Validators.minLength(11),
  //     Validators.maxLength(11)]],                                //'66523165019',
  //   telefone: ['988351234', [
  //     Validators.required,
  //     Validators.pattern("^[0-9]*$"),
  //     Validators.minLength(9),
  //     Validators.maxLength(9)]],
  //   ddd: ['99', [
  //     Validators.required,
  //     Validators.pattern("^[0-9]*$"),
  //     Validators.minLength(2),
  //     Validators.maxLength(2)]],

  //   // DADOS DE ENDEREÇO
  //   cep: ['65900000', [Validators.required]],
  //   estado: ['MA', [Validators.required]],
  //   cidade: ['Imperatriz', [Validators.required]],
  //   bairro: ['Vila Lobão', [Validators.required]],
  //   rua: ['Assembleia', [Validators.required]],
  //   numero: ['001', [Validators.required]],
  //   complemento: ['002', [Validators.required]],

  //   //DADOS DE ACESSO
  //   emailAccess: ['email001@gmail.com', [Validators.required, Validators.email]],
  //   password: ['123456', [Validators.required]],


  //   amount: [''],
  //   titleProduct: [''],
  //   idProduct: [''],
  //   codTransactionPagSeguro: [''],

  //   created_at: [''],
  //   updated_at: [''],

  //   urlBoleto: ['']


  // });


  // credicardForm = this.fb.group({
  //   //DADOS REFERENTE AO CARTÃO DE CRÉDITO
  //   nomePortadorCard: ['Jardel Henrique', [Validators.required]],
  //   numCard: ['4111111111111111', [
  //     Validators.required,
  //     Validators.pattern("^[0-9]*$"),
  //     Validators.minLength(16),
  //     Validators.maxLength(16)]],                           // ex: '4111111111111111'
  //   mesValidadeCard: ['12', [Validators.required]],                   // ex: '12',
  //   anoValidadeCard: ['2030', [Validators.required]],                   // ex: '2030',
  //   codSegCard: ['', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(3)]],                        // ex: '123',
  //   bandCard: [''],                                                 // preenchido dinamicamente
  //   hashCard: [''],                                                 // preenchido dinamicamente
  //   sendHash: [''],                                                 // preenchido dinamicamente
  //   parcelas: [[''], [Validators.required]],                        // preenchido dinamicamente   
  //   cpfCard: ['66523165019', [
  //     Validators.required,
  //     GenericValidator.isValidCpf(),
  //     Validators.pattern("^[0-9]*$"),
  //     Validators.minLength(11),
  //     Validators.maxLength(11)]],
  //   telefoneCard: ['88888888888', [
  //     Validators.required,
  //     Validators.pattern("^[0-9]*$"),
  //     Validators.minLength(11),
  //     Validators.maxLength(11)]],                  // preenchido dinamicamente


  //   nascimento: ['1984-09-26', [Validators.required]],


  //   // amount: [''],
  //   // titleProduct: [''],
  //   // idProduct: [''],
  //   // codTransactionPagSeguro: [''],

  //   // created_at: [''],
  //   // updated_at: [''],

  //   // telefone: [''],
  //   // ddd: [''],



  // })

  clientForm = this.fb.group({

    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    cpf: ['', [
      Validators.required,
      GenericValidator.isValidCpf(),
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(11),
      Validators.maxLength(11)]],                                //'66523165019',
    telefone: ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(9),
      Validators.maxLength(9)]],
    ddd: ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(2),
      Validators.maxLength(2)]],

    // DADOS DE ENDEREÇO
    cep: [''],
    estado: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    bairro: ['', [Validators.required]],
    rua: ['', [Validators.required]],
    numero: ['', [Validators.required]],
    complemento: [''],

    //DADOS DE ACESSO
    emailAccess: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],


    amount: [''],
    titleProduct: [''],
    idProduct: [''],
    codTransactionPagSeguro: [''],

    created_at: [''],
    updated_at: [''],

    urlBoleto: ['']


  });


  credicardForm = this.fb.group({
    //DADOS REFERENTE AO CARTÃO DE CRÉDITO
    nomePortadorCard: ['', [Validators.required]],
    numCard: ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(16),
      Validators.maxLength(16)]],                           // ex: '4111111111111111'
    mesValidadeCard: ['', [Validators.required]],                   // ex: '12',
    anoValidadeCard: ['', [Validators.required]],                   // ex: '2030',
    codSegCard: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3)]],                        // ex: '123',
    bandCard: [''],                                                 // preenchido dinamicamente
    hashCard: [''],                                                 // preenchido dinamicamente
    sendHash: [''],                                                 // preenchido dinamicamente
    parcelas: [[''], [Validators.required]],                        // preenchido dinamicamente   
    cpfCard: ['', [
      Validators.required,
      GenericValidator.isValidCpf(),
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(11),
      Validators.maxLength(11)]],
    telefoneCard: ['', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(11),
      Validators.maxLength(11)]],                  // preenchido dinamicamente


    nascimento: ['', [Validators.required]],



  })

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
  cupomText: string = '';
  precoCupomDeskCode;
  precoCupomBONUSADVX;


  urlBaseImg: string;


  constructor(
    public checkoutService: CheckoutService,
    public paymentHttp: PaymentHttp,
    public zone: NgZone,
    private route: ActivatedRoute,
    private product: ProdutosService,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthServiceService) { }





  codTransactionReturn: any;

  ngOnInit() {

    this.produto = this.product.getProduto(this.route.snapshot.params['slug']);
    // console.log('Produto list', this.produto);

    this.precoCupomDeskCode = this.produto.price - (this.produto.price * 0.99);
    this.precoCupomBONUSADVX = this.produto.price - (this.produto.price * 0.10);


    // this.checkoutService.startSession()
    if (!environment.production) {
      this.urlBaseImg = '../../../assets/imagens/';
      scriptjs('https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js', () => {
        this.paymentHttp.getSession()
          .subscribe(data => {
            console.log(data);
            console.log(PagSeguroDirectPayment.setSessionId(data['id']));
            // return this.initSession(data);
            // console.log(data);
          })
      })
    } else {
      this.urlBaseImg = 'assets/imagens/';

      scriptjs('https://stc.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js', () => {

        this.paymentHttp.getSession()
          .subscribe(data => {
            // console.log(data);
            // console.log(this.initSession(data));
            return this.initSession(data)
          })

      })
    }
  }




  ngAfterContentInit() {
    window.scrollTo(0, 0);
  }



  initSession(data) {
    console.log(data['id'])
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






  //TOASTRS 

  toatrSuccess(titulo: string, mensagem: string, timeToatr: number = 5000) {
    return toastr.success(mensagem, titulo, {
      positionClass: "toast-top-center",
      progressBar: true,
      closeButton: true,
      timeOut: timeToatr
    })
  }

  toatrError(titulo: string, mensagem: string, timeToatr: number = 5000) {
    return toastr.error(mensagem, titulo, {
      positionClass: "toast-top-center",
      progressBar: true,
      closeButton: true,
      timeOut: timeToatr
    })
  }

  toatrWarning(titulo: string, mensagem: string, timeToatr: number) {
    return toastr.warning(mensagem, titulo, {
      positionClass: "toast-top-center",
      progressBar: true,
      closeButton: true,
      timeOut: timeToatr
    })
  }




  // testaSelect() {
  //   console.log(this.clientForm.value.parcelas)
  // }



  // GERA CUPOM DE DESCONTO

  cupomDesconto() {

    // CUPOM 99%
    if (this.cupomText == 'DESK') {
      // 20%
      // let precoCupom = this.produto.price - (this.produto.price * 0.2)
      // 97%
      if (this.produto.price <= this.precoCupomDeskCode.toFixed(2)) {
        this.produto.price = this.precoCupomDeskCode.toFixed(2);
        this.toatrError('Cupom já inserido!', 'Esse cupom já foi utilizado e com isso o desconto já foi ativado!')
        // this.toatrError('Cupom já inserido!','Esse cupom já foi utilizado e com isso o desconto já foi ativado!')
      } else {
        this.produto.price = this.precoCupomDeskCode.toFixed(2);
        this.toatrSuccess('Cupom Válido!', 'Cupom inserido com sucesso!');
      }
      // console.log("##########", this.produto.price)
    }


    // CUPOM 10%
    if (this.cupomText == 'BONUSADVX') {
      if (this.produto.price <= this.precoCupomBONUSADVX.toFixed(2)) {
        this.produto.price = this.precoCupomBONUSADVX.toFixed(2);
        this.toatrError('Cupom já inserido!', 'Esse cupom já foi utilizado e com isso o desconto já foi ativado!')
        // this.toatrError('Cupom já inserido!','Esse cupom já foi utilizado e com isso o desconto já foi ativado!')
      } else {
        this.produto.price = this.precoCupomBONUSADVX.toFixed(2);
        this.toatrSuccess('Cupom Válido!', 'Cupom inserido com sucesso!');
      }
      // console.log("##########", this.produto.price)
    }




  }





  /** 
   *  PAGAMENDO COM CARTÃO PLANO E BOLETO
   *  BIBLIOTECA ANGULAR PAGSEGURO
   * 
   * */





  // FUNÇÃO PARA GERAR BOLETO DO PLANO
  compraComBoleto() {

    this.loadingPage = true;

    this.clientForm.value.sendHash = PagSeguroDirectPayment.getSenderHash();

    this.clientForm.value.amount = this.produto.price;

    console.log("amount", this.clientForm.value.amount)



    this.clientForm.value.titleProduct = this.produto.title;
    this.clientForm.value.idProduct = this.produto.slug + '-' + Date.now();

    let emailCliente = this.clientForm.value.emailAccess;


    this.paymentHttp.geraBoleto(this.clientForm.value)
      .subscribe(
        response => {

          // console.log('response boleto', response);
          // this.linkBoleto = response[0];
          this.linkBoleto = response[0][0];

          //  console.log("dados vindos do boleto: ",response);
          //  console.log("dados vindos do boleto urlBoleto: ",response[0][0]);
          // //  console.log("dados vindos do boleto codigoBarras: ",response[1][0]);
          //  console.log("dados vindos do boleto codeTransacao: ",response[1][0]);
          //  console.log("dados vindos do boleto DuwData: ",response[3][0]);

          this.clientForm.value.created_at = moment().format('YYYY-MM-DD');
          this.clientForm.value.updated_at = moment().format('YYYY-MM-DD  H:mm:ss');
          this.clientForm.value.titleProduct = this.produto.title;
          this.clientForm.value.idProduct = moment().format('YYYYMMDDHmmss');
          // this.clientForm.value.amount = this.produto.price.toFixed(2);
          // this.clientForm.value.amount = this.produto.price;
          this.clientForm.value.urlBoleto = this.linkBoleto;
          // console.log("amount", this.clientForm.value.amount)
          this.clientForm.value.codTransactionPagSeguro = response[1][0];


          this.clientForm.value.nomePortadorCard = this.clientForm.value.nomePortadorCard ? this.clientForm.value.nomePortadorCard : 'BOLETO';

          this.authService.register(this.clientForm.value)
            .subscribe(
              (resultRegister) => {
                // console.log('Result Register', resultRegister);
                this.clientForm.value.updated_at = moment().format('YYYY-MM-DD  H:mm:ss');
                // this.authService.updateUser(resultRegister, this.clientForm.value);
                //realiza login no sistema
                // this.toatrSuccess('PARABÉNS!', 'Seu boleto foi gerado com sucesso e agora você será redirecionado(a) ao painel administrativo!')
                this.authService.login(this.clientForm.value.emailAccess, this.clientForm.value.password)
                  .subscribe(
                    (object) => {
                      console.log("logado")
                      this.router.navigate(['/admin/dashboard']);

                      setTimeout(() => {
                        this.loadingPage = false;
                        this.toatrSuccess('Bem vindo(a) ' + object['firstName'], 'Login realizado com sucesso.')
                      }, 2000)

                    })
                // ,(err) => {
                //   this.msgError = 'Credenciais Inválidas ou usuário não está registardo.';
                //   console.log("Erro ao logar", err);
                //   this.toatrError('ACONTECEU UM ERRO!', `Credenciais Inválidas ou usuário não está registardo.`)
                // })
              }, (error) => {
                this.loadingPage = false;

                if (error.code == 'auth/email-already-in-use') {
                  this.toatrError('ACONTECEU UM ERRO!', `O e-mail ${emailCliente}  já é cadastrado.`)
                } else {
                  this.toatrError('OPSSS!', `Aconteceu um erro ao registrar novo usuário. Tente novamente mais tarde.`)
                }
                // this.toatrError('O e-mail  já é cadastrado. Por favor, insira outro e-mail para continuar.', 'Erro!')
                // this.toatrError('ACONTECEU UM ERRO!', `O e-mail ${emailCliente}  já é cadastrado.`)
                // console.log("Erro ao registrar usuário no firebase: ", error);
              });
          // window.open(response[0], '_blank')

          window.scrollTo(0, 0);
        },
        error => {
          this.loadingPage = false;
          this.toatrError('OPSSS, ERRO!', `Um erro aconteceu no momento de gerar seu boleto. Por favor, tente mais tarde!`)
          // this.toatrError('ACONTECEU UM ERRO!', `O e-mail ${emailCliente} já é cadastrado em nossa base de dados.`)
          console.log("geraBoleto", error); // body
          window.scrollTo(0, 0);
          // console.log(error.error.text); // body
        });


  }

  openLinkBoleto() {
    window.open(this.linkBoleto, '_blank');
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);

  }



  //BUSCA AS PARCELAS NA API DO PAGSEGURO PARA O CLIENTE ESCOLHER
  buscaParcelas() {
    // console.log(this.dadosCredicard.bandCard);
    PagSeguroDirectPayment.getInstallments({
      amount: this.produto.price,              //valor total da compra (deve ser informado)
      brand: this.credicardForm.value.bandCard,   //bandeira do cartão (capturado na função buscaBandeira)
      maxInstallmentNoInterest: 1,

      success: response => {

        console.log("BuscaParcelasCreditBandCard", this.credicardForm.value.bandCard);

        this.escolherQntParcelas = response.installments[this.credicardForm.value.bandCard];
        // console.log('this.escolherQntParcelas: ', this.escolherQntParcelas);

        if (this.escolherQntParcelas.length > 0) {
          this.escolheSelect = true
        } else {
          this.escolheSelect = false
        }
        console.log('Parcelas Result length: ', this.escolherQntParcelas.length);
        console.log('Parcelas Result: ', this.escolherQntParcelas);

        return this.escolherQntParcelas;
      },
      error: response => {
        console.log("BuscaParcelasCreditBandCard", this.credicardForm.value.bandCard);
        console.log("Erro buscar parcelas: ", response)
      }
    });
  }

  //BUSCA A BANDEIRA DO CARTÃO (EX: VISA, MASTERCARD ETC...) E DEPOIS BUSCA AS PARCELAS;
  //ESTA FUNÇÃO É CHAMADA QUANDO O INPUT QUE RECEBE O NÚMERO DO CARTÃO PERDE O FOCO;
  buscaBandeira() {
    console.log("busca Bandeira: ");


    this.paymentHttp.getSession();

    PagSeguroDirectPayment.getBrand({
      cardBin: parseInt(this.credicardForm.value.numCard),
      success: response => {
        this.credicardForm.value.bandCard = response.brand.name;

        console.log('Bandeira do cartao objeto', response)
        console.log('Bandeira do cartão: ' + this.credicardForm.value.bandCard);
        this.buscaParcelas();
      },
      error: response => {
        console.log("Erro buscar Bandeira: ", response);
        console.log("this.credicardForm.value.numCard: ", this.credicardForm.value.numCard);
      }
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
          // console.log('Codigo transação: ', result[0])
          // console.log('Codigo transação  Cod: ', dados.codTransactionPagSeguro)
          // this.codTransactionReturn = result[0];
          return dados.codTransactionPagSeguro = result[0];
        });
  }


  compraComCredidCard() {

    let emailCliente = this.clientForm.value.emailAccess;


    this.loadingPage = true;
    //BUSCA O HASH DO COMPRADOR JUNTO A API DO PAGSEGURO
    this.credicardForm.value.sendHash = PagSeguroDirectPayment.getSenderHash();
    //CRIA O HASK DO CARTÃO DE CRÉDITO JUNTO A API DO PAGSEGURO
    PagSeguroDirectPayment.createCardToken({

      cardNumber: this.credicardForm.value.numCard,
      cvv: this.credicardForm.value.codSegCard,
      expirationMonth: this.credicardForm.value.mesValidadeCard,
      expirationYear: this.credicardForm.value.anoValidadeCard,

      success: response => {
        this.zone.run(() => {

          this.loadingPage = true;

          this.credicardForm.value.hashCard = response.card.token;

         
          // console.log('price submit', this.clientForm.value.amount)

          this.clientForm.value.urlBoleto = this.clientForm.value.urlBoleto ? this.clientForm.value.urlBoleto : '';
          this.clientForm.value.nomePortadorCard = this.clientForm.value.nomePortadorCard ? this.clientForm.value.nomePortadorCard : 'BOLETO';





          this.authService.register(this.clientForm.value)
            .subscribe(
              (resultRegister) => {
                this.loadingPage = false;

                // console.log('Result Register', resultRegister);
                // console.log('Result Register cod', resultRegister.id);

                this.clientForm.value.amount = this.produto.price;

                console.log("  this.clientForm.value.amount ",   this.clientForm.value.amount ) 

                this.clientForm.value.created_at = moment().format('YYYY-MM-DD');

                this.clientForm.value.updated_at = moment().format('YYYY-MM-DD  H:mm:ss');

                this.clientForm.value.idProduct = moment().format('YYYYMMDDHmmss');

                this.clientForm.value.titleProduct = this.produto.title;

                // this.credicardForm.value.ddd =  this.clientForm.value.ddd;
                // this.credicardForm.value.telefone =  this.clientForm.value.telefone;

                this.buscaBandeira();
                this.credicardForm.value.parcelas = this.escolherQntParcelas;
                
                console.log("  this.credicardForm.value.parcelas ####",   this.credicardForm.value.parcelas ) 
                let dadosConcatenados = { ...this.clientForm.value, ...this.credicardForm.value }

                // console.log('-----------------------------------------------------')
                // console.log(this.clientForm.value) 
                // console.log(this.credicardForm.value) 
                // console.log('Dados Concatenados', dadosConcatenados);



                this.paymentHttp.transationCredCard(dadosConcatenados)
                  .subscribe(
                    result => {
                      this.loadingPage = false;
                      this.hideBlock = true;
                      this.hideBlockBoleto = false;
                      this.hideBlockCreditCard = true;
                      console.log('Codigo transação: ', result[0])

                      this.clientForm.value.codTransactionPagSeguro = result[0];
                      // console.log('Codigo transação  Cod: ', this.credicardForm.value.codTransactionPagSeguro);
                      this.clientForm.value.updated_at = moment().format('YYYY-MM-DD  H:mm:ss');

                      let dadosConcatenadosUpdate = { ...this.credicardForm.value, ...this.clientForm.value }

                      this.authService.updateUser(resultRegister, dadosConcatenadosUpdate);

                      // faz login no sistema
                      this.authService.login(this.clientForm.value.emailAccess, this.clientForm.value.password)
                        .subscribe(
                          (object) => {
                            console.log("logado")
                            this.router.navigate(['/admin/dashboard']);
                            setTimeout(() => {
                              this.loadingPage = false;
                              this.toatrSuccess('Bem vindo(a) ' + object['firstName'], 'Login realizado com sucesso.')
                            }, 2000)
                          })
                      //  fecha login

                    }, err => {

                      let emaillogin = this.clientForm.value.emailAccess;
                      let passwordLogin = this.clientForm.value.password;

                      this.authService.deleteUser(resultRegister);
                      // this.authService.deleteUserLogaded(emaillogin, passwordLogin );
                      this.authService.removerUser(emaillogin, passwordLogin);

                      this.toatrError('OPSSSS!', `Aconteceu algo de errado no pagamento.`, 10000)
                      this.loadingPage = false;
                      console.log(err)
                    });
              },
              (error) => {
                this.loadingPage = false;
                if (error.code == 'auth/email-already-in-use') {
                  this.toatrError('ACONTECEU UM ERRO!', `O e-mail ${emailCliente}  já é cadastrado. Acesse a área de login para entrar no seu painel administrativo`, 7000)
                } else {
                  this.toatrError('OPSSS!', `Aconteceu um erro ao registrar novo usuário. Tente novamente mais tarde.`)
                }
                // this.toatrError('O e-mail  já é cadastrado. Por favor, insira outro e-mail para continuar.', 'Erro!')
                // console.log("Erro ao registrar usuário no firebase: ", error);
              })

          console.log('Dados retornados: ', this.credicardForm.value);
          // console.log("Passou cartão");
        });
      },
      error(res) {
        this.loadingPage = false;
        this.toatrError('OPSSS, ERRO!', `Um erro aconteceu no momento do pagamento. Por favor, tente mais tarde!`)
        window.scrollTo(0, 0);
        // console.log("createCardToken: ", res)
      }
    });

    // this.loadingPage = false;
  }




  //AO CLICAR NO BOTÃO PAGAR
  onSubmit(event) {
    // if(event.srcElement[24].id == 'clickBoleto'){
    if (event.path[8].activeElement.id == 'clickBoleto') {
      console.log("CLICOU NO BOLETO")
      this.compraComBoleto();
    }
    if (event.path[8].activeElement.id == 'clickCreditCard') {
      console.log("CLICOU NO CARTÃO DE CRÉDITO")
      this.compraComCredidCard();
    }
  }



  onSubmitIf(event) {
    console.log("EVENT", event)
  }


}

  // registraUsuarioFirebase(dadosFormulario):  Promise<any> {

  //   return  new Promise<boolean>((resolve, reject) => {

  //   resolve();


  //   this.authService.register(dadosFormulario)
  //     .subscribe(
  //       (resultRegister) => {
  //         console.log('Result Register', resultRegister);
  //         this.paymentHttp.transationCredCard(dadosFormulario)
  //           .subscribe(
  //             result => {
  //               this.loadingPage = false;
  //               this.hideBlock = true;
  //               this.hideBlockBoleto = false;
  //               this.hideBlockCreditCard = true;
  //               // console.log('Codigo transação: ', result[0])
  //               dadosFormulario.codTransactionPagSeguro = result[0];
  //               // console.log('Codigo transação  Cod: ', dadosFormulario.codTransactionPagSeguro);
  //               dadosFormulario.updated_at = moment().format('YYYY-MM-DD  H:mm:ss');
  //               this.authService.updateUser(resultRegister, dadosFormulario);
  //             }, err => {
  //               console.log(err)
  //               this.loadingPage = false;
  //             });
  //       },
  //       (error) => {

  //         this.loadingPage = false;
  //         if (error.code == "auth/email-already-in-use") {
  //           this.msgError = "O e-mail já é cadastrado. Por favor, insira outro e-mail para continuar."
  //         }

  //         // this.toatrError('O e-mail  já é cadastrado. Por favor, insira outro e-mail para continuar.', 'Erro!')
  //         console.log("Erro ao registrar usuário", error);
  //       })

  //     })

  // }
















// registra e atualizar

// this.authService.register(this.clientForm.value)
// .subscribe(
//   (resultRegister) => {


//     // this.codTransactionReturn = result[0];
//     // this.authService.updateUser(resultRegister)


//     console.log('Result Register', resultRegister);




//     // console.log('Result Register cod', resultRegister.id);

//     this.paymentHttp.transationCredCard(this.clientForm.value)
//       .subscribe(
//         result => {


//           this.loadingPage = false;
//           this.hideBlock = true;
//           this.hideBlockBoleto = false;
//           this.hideBlockCreditCard = true;


//           // console.log('Codigo transação: ', result[0])


//           this.clientForm.value.codTransactionPagSeguro = result[0];
//           // console.log('Codigo transação  Cod: ', this.clientForm.value.codTransactionPagSeguro);

//           this.clientForm.value.updated_at = moment().format('YYYY-MM-DD  H:mm:ss');

//           this.authService.updateUser(resultRegister, this.clientForm.value);

//         }, err => {
//           console.log(err)
//           this.loadingPage = false;
//         });

//   },
//   (error) => {

//     this.loadingPage = false;
//     if (error.code == "auth/email-already-in-use") {
//       this.msgError = "O e-mail já é cadastrado. Por favor, insira outro e-mail para continuar."
//     }

//     // this.toatrError('O e-mail  já é cadastrado. Por favor, insira outro e-mail para continuar.', 'Erro!')

//     console.log("Erro ao registrar usuário", error);


//   })









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