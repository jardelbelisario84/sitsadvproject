import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dados } from './dados.class';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


/* CLASSE SERVIÇO: RESPONSÁVEL POR ESTABELECER COMUNICAÇÃO COM O SERVIDOR */

@Injectable()
export class CheckoutService {
    constructor(private http: HttpClient) { }


    public startSession(): Observable<Object> {

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });

        // return this.http.get('http://www.suaApi.com.br/getIdSession', { headers })
        //     .map(res => res.json());

        return this.http.get('http://localhost:8000/api/pagseguro-session', { headers })
        .pipe(
            map(res => res)
        ); 
            
    }

    public store(dados: Dados) {

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });

        let body = JSON.stringify({ dados });
        return this.http.post('http://localhost:8000/payment.php', body, { headers })
            // .map(res => res.json());
    }

    public cancel() {

        //Content-Type: application/x-www-form-urlencoded; charset=ISO-8859-1
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        // let  {headers} = new RequestOptions({ headers: headers });

        return this.http.get('http://www.suaApi.com.br/cancel', { headers })
            // .map(res => res.json());
    }


}