import { Component, OnInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../service-local/produtos.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewChecked, AfterContentInit {
  produto;
  loadingPage = false;
  proddutos: any;
  urlBaseImg: string;

  constructor(public products: ProdutosService, private router: Router, private route: ActivatedRoute, private product: ProdutosService) { }

  ngOnInit() {
    this.produto = this.product.getProduto(this.route.snapshot.params['slug']);
    console.log('Produto list', this.produto);

    this.proddutos = this.products.getProdutos();

    if (!environment.production) {
      this.urlBaseImg = '../../../assets/imagens/';
    } else {
      this.urlBaseImg = 'assets/imagens/';
    }

  }

  ngAfterViewChecked() {

  }


  ngAfterContentInit() {
    window.scrollTo(0, 0);
    // this.loadingPage = true;

    // setTimeout(() => {
    //   this.loadingPage = false;
    // }, 1000);

  }
  productCheckout(produto) {
    this.router.navigate(['/produtos/' + produto.slug + '/checkout']);
  }


}
