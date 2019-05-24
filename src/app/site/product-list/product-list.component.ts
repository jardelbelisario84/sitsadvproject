import { Component, OnInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../service-local/produtos.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewChecked, AfterContentInit {
  produto;
  loadingPage = false;


  constructor(private router: Router, private route: ActivatedRoute, private product: ProdutosService) { }

  ngOnInit() {


    this.produto = this.product.getProduto(this.route.snapshot.params['slug']);
    console.log('Produto list', this.produto);
  }

  ngAfterViewChecked() {

  }


  ngAfterContentInit() {
    window.scrollTo(0, 0);
    this.loadingPage = true;

    setTimeout(() => {
      this.loadingPage = false;
    }, 1000);

  }
  productCheckout() {
    this.router.navigate(['/produtos/plano-basic/checkout']);
  }


}
