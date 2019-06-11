import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


/*
  Generated class for the PaymentHttpProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PaymentHttp {

    constructor(public http: HttpClient) {
        console.log('Hello PaymentHttpProvider Provider');
    }


    // this.http.get('https://reqres.in/api/users')
    // .pipe(
    //   map(res => res.data) // or any other operator
    // )
    // .subscribe(res => console.log(res));

    // getSession(): Observable<Object> {
    //     return this.http.get('http://localhost:8000/session.php')
    //     .pipe(
    //         map( res => res) 
    //     ); 
    // }

    //return this.http.get('https://apisitesadv.desksistemas.com.br/public/api/pagseguro-session')

    getSession(): Observable<Object> {
        return this.http.get('https://apisitesadv.desksistemas.com.br/public/api/pagseguro-session')
        .pipe(
            map( res => res) 
        ); 
    }

    // doPayment(data): Observable<Object> {
    //     return this.http.post('https://apisitesadv.desksistemas.com.br/public/payment.php', data)
    //         .map(response => response.json());
    // }

    // geraBoleto(data): Observable<any> {

    //     let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //     return this.http.post('https://apisitesadv.desksistemas.com.br/public/api/pagseguro-transaction-boleto', data,{ headers});
    // }

    geraBoleto(data): Observable<any> {

         let headers = new HttpHeaders({ 
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin': '*',
             'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
             'Access-Control-Allow-Headers': 'X-Requested-With,content-type' });

        return this.http.post('https://apisitesadv.desksistemas.com.br/public/api/pagseguro-transaction-boleto', data, {headers})
        .pipe(
            map( res => res) 
        ); 
    }

    transationCredCard(data): Observable<any> {
        return this.http.post('https://apisitesadv.desksistemas.com.br/public/api/pagseguro-transaction-card', data)
        .pipe(
            map( res => res) 
        ); 
    }

    




























    // geraBoleto(data): Observable<any> {
    //     let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=ISO-8859-1' });

    //     return this.http.post('http://localhost:8000/api/pagseguro-boleto', data,  { headers })
    //     // return this.http.post('http://localhost:8000/api/pagseguro-boleto', data)
    //     .pipe(
    //         map(response => response)
    //     );
    // }

}