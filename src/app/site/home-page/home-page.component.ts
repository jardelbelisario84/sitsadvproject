import { Component, OnInit, AfterContentInit } from '@angular/core';
import {Router} from '@angular/router';
import { ProdutosService } from '../service-local/produtos.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterContentInit {


  loadingPage = false;
  public produtos = [];
  urlBaseImg: string;

  constructor(public products: ProdutosService, private router: Router) { }

  ngOnInit() {
    

    this.produtos =  this.products.getProdutos();

    if(!environment.production){
      this.urlBaseImg = '../../../assets/imagens/';
    }else{
      this.urlBaseImg = 'assets/imagens/';
    }

  }

  ngAfterContentInit(){
    // this.loadingPage = true;

    // setTimeout(() =>{ 
    //   this.loadingPage = false;
    // }, 500);

  }

  onDetalhePage(object) {
    this.router.navigate(['/produtos/', object.slug]);
  }

  productBasic() {
    this.router.navigate(['/produtos/plano-basic']);
  }




}
