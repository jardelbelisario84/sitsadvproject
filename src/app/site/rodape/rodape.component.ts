import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css']
})
export class RodapeComponent implements OnInit {
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
