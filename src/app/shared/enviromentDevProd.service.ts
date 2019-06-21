import { Injectable } from '@angular/core';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnviromentDevProdService {

  urlBaseImg: string;

  constructor() { }

  verificaEnviroments(){
    if(!environment.production){
      this.urlBaseImg = '../../../assets/imagens/';
    }else{
      this.urlBaseImg = 'assets/imagens/';
    }
  }

}
