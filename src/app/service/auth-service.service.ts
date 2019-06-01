import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, throwError, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private userCollection: AngularFirestoreCollection = this.afs.collection('users');

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  /*
  db.collection("cities").doc("SF")
      .onSnapshot(function(doc) {
          console.log("Current data: ", doc.data());
      });
  */
  register(user): Observable<any> {
    return from(this.afAuth.auth
      .createUserWithEmailAndPassword(user.emailAccess, user.password))
      .pipe(
        switchMap((u: firebase.auth.UserCredential) => {

          return this.userCollection.doc(u.user.uid).set(
            {
              // ...user,
              id: u.user.uid,
              codTransactionPagSeguro: user.codTransactionPagSeguro,
              firstName: user.firstName,
              lastName: user.lastName,
              cpf: user.cpf,
              telefone: user.telefone,
              cep: user.cep,
              estado: user.estado,
              cidade: user.cidade,
              bairro: user.bairro,
              rua: user.rua,
              numero: user.numero,
              complemento: user.complemento,
              email: user.emailAccess,
              nomePortadoCard: user.nomePortadorCard,
              hashCard: user.hashCard,
              created_at: user.created_at,
              updated_at: user.updated_at
            })
            .then(() => {
              console.log("Objeto user vindo do firebase: ", u.user.uid);
              return u.user.uid
            })
        }),
        catchError((error) => throwError(error))
      )
  }

  updateUser(id, data) {
    console.log("ID DE USER A SER ATUALIZADO", id)
    this.userCollection.doc(id).set({
      // ...data,
      id: id,
      codTransactionPagSeguro: data.codTransactionPagSeguro,
      firstName: data.firstName,
      lastName: data.lastName,
      cpf: data.cpf,
      telefone: data.telefone,
      cep: data.cep,
      estado: data.estado,
      cidade: data.cidade,
      bairro: data.bairro,
      rua: data.rua,
      numero: data.numero,
      complemento: data.complemento,
      email: data.emailAccess,
      nomePortadoCard: data.nomePortadorCard,
      hashCard: data.hashCard,
      created_at: data.created_at,
      updated_at: data.updated_at
      // codTransactionPagSeguro: data.codTransactionPagSeguro
    }).then(() => console.log("Atualizado com codTransactionPagSeguro"));
  }



  login(email: string, password: string) {

    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        switchMap((u: firebase.auth.UserCredential) => {
          return this.userCollection.doc(u.user.uid).valueChanges();
        }),
        catchError(() => {
          return throwError('Credenciais Inválidas ou usuário não está registardo.')
        })
      )
  }


  lougout() {
    this.afAuth.auth.signOut();
    
  }


  getUser(): Observable<any> {
    return this.afAuth.authState
    .pipe(
      switchMap( (user) => {
        if(user){
          return this.userCollection.doc(user.uid).valueChanges()
        }else{
          of(null)
        }
      })
    )
  }









  //PEGA TODO O OBJETO USER -> clientForm
  // register(user): Observable<boolean> {
  //   return from(this.afAuth.auth
  //     .createUserWithEmailAndPassword(user.emailAccess, user.password))
  //     .pipe(
  //       switchMap((u: firebase.auth.UserCredential) => {
  //         return this.userCollection.doc(u.user.uid).set(
  //           { 
  //             ...user,
  //             id: u.user.uid,
  //             password: u.user.updatePassword
  //           }
  //           )
  //           .then(() => true)
  //       }),
  //       catchError((error) => throwError(error))
  //     )
  // }


}
