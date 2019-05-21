import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewChecked {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    window.scrollTo(0, 0);
    }

  productCheckout() {
    this.router.navigate(['/produtos/plano-basic/checkout']);
  }


}
