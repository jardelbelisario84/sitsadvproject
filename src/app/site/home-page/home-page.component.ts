import { Component, OnInit, AfterContentInit } from '@angular/core';
import {Router} from '@angular/router';
import { ProdutosService } from '../service-local/produtos.service';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterContentInit {


  loadingPage = false;
  public produtos = [];

  constructor(public products: ProdutosService, private router: Router) { }

  ngOnInit() {

    this.produtos =  this.products.getProdutos()

  }

  ngAfterContentInit(){
    this.loadingPage = true;

    setTimeout(() =>{ 
      this.loadingPage = false;
    }, 500);

  }

  onDetalhePage(object) {
    this.router.navigate(['/produtos/', object.slug]);
  }

  productBasic() {
    this.router.navigate(['/produtos/plano-basic']);
  }




}
