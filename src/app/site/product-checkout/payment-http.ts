import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    getSession() {
        return this.http.get('http://localhost:8000/session.php')
        .pipe(
            map( res => res) 
        ); 
    }

    doPayment(data): Observable<Object> {
        return this.http.post('http://localhost:8000/payment.php', data)
            .map(response => response.json());
    }

}