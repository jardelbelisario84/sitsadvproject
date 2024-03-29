import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-site-menu',
  templateUrl: './site-menu.component.html',
  styleUrls: ['./site-menu.component.css']
})
export class SiteMenuComponent implements OnInit {

  urlBaseImg: string;

  constructor() { }

  ngOnInit() {

    if(!environment.production){
      this.urlBaseImg = '../../../assets/imagens/';
    }else{
      this.urlBaseImg = 'assets/imagens/';
    }

  }

}
