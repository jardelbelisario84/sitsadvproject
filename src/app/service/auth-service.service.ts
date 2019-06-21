import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, throwError, of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import * as toastr from 'toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private userCollection: AngularFirestoreCollection = this.afs.collection('users');
  private userAutentication;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    // private af: AngularFire,
  ) { }





  /*


  var user = firebase.auth().currentUser;

  user.delete().then(function() {
    // User deleted.
  }).catch(function(error) {
    // An error happened.
  });
  
  db.collection("cities").doc("SF")
      .onSnapshot(function(doc) {
          console.log("Current data: ", doc.data());
      });

      
  */

  toatrSuccess(titulo: string, mensagem: string) {
    return toastr.success(mensagem, titulo, {
      positionClass: "toast-top-center",
      progressBar: true,
      closeButton: true,
    })
  }

  toatrError(titulo: string, mensagem: string) {
    return toastr.error(mensagem, titulo, {
      positionClass: "toast-top-center",
      progressBar: true,
      closeButton: true,
    })
  }


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
              ddd: user.ddd,
              telefone: user.telefone,
              cep: user.cep,
              estado: user.estado,
              cidade: user.cidade,
              bairro: user.bairro,
              rua: user.rua,
              numero: user.numero,
              complemento: user.complemento,
              email: user.emailAccess,
              created_at: user.created_at,
              updated_at: user.updated_at,

              urlBoleto: user.urlBoleto,
              nomePortadorCard: user.nomePortadorCard,


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
    // console.log("ID DE USER A SER ATUALIZADO", id)
    this.userCollection.doc(id).update({
      codTransactionPagSeguro: data.codTransactionPagSeguro,
      hashCard: data.hashCard,
      updated_at: data.updated_at
    }).then(() => console.log("Atualizado com codTransactionPagSeguro"));
  }



  deleteUser(id) {
    // console.log("ID DE USER A SER ATUALIZADO", id)
    this.userCollection.doc(id).delete().then(() => {
      console.log("Documento do usuario deletado no firebase")
    });
  }

  // deleteUserLogaded(email: string, password: string) {

  //   console.log("userAutentication 2", this.userAutentication)

  //   let credential = firebase.auth.EmailAuthProvider.credential(email, password);

  //   this.userAutentication.reauthenticateWithCredential(credential)
  //     .then((user) => {
  //       console.log("user reauthenticateAndRetrieveDataWithCredential", user)
  //       this.userAutentication.delete().then(() => { }).catch(() => { })
  //     }).catch(function (error) {
  //       console.log("reauthenticateAndRetrieveDataWithCredential", error)
  //     });


  // }

  removerUser(email: string, password: string) {

    
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(value => {
      console.log('Success!', value);
      this.userAutentication = this.afAuth.auth.currentUser;
      this.userAutentication.delete().then(() => { }).catch(() => { })
    })
    .catch(err => {
      console.log('Something went wrong:',err.message);
    });    

  }



  // removerUser(email: string, password: string) {

  //   const credential = firebase.auth.EmailAuthProvider.credential(email, password);
  //   firebase.auth().currentUser.reauthenticateWithCredential(credential).then(() => {
  //     this.userAutentication.delete().then(() => { }).catch(() => { })
  //   });

  // }

  // removeUser(password: string) {
  //   this.af.auth.take(1).subscribe(user => {
  //     const credential = firebase.auth.EmailAuthProvider.credential(user.auth.email, password);
  //     user.auth.reauthenticate(credential).then(() => {
  //       user.auth.delete();
  //     });
  //   });
  // }

  login(email: string, password: string) {

    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        switchMap((u: firebase.auth.UserCredential) => {

          // this.toatrSuccess('Bem vindo(a)!', 'login realizado com sucesso.')

          return this.userCollection.doc(u.user.uid).valueChanges();
        }),
        catchError(() => {
          // this.toatrError('OPSS!', 'Credenciais Inválidas ou usuário não está registardo.');
          return throwError('Credenciais Inválidas ou usuário não está registardo.')
        })
      )
  }


  lougout() {
    this.afAuth.auth.signOut()
  }


  getUser(): Observable<any> {
    return this.afAuth.authState
      .pipe(
        switchMap((user) => {
          if (user) {
            return this.userCollection.doc(user.uid).valueChanges()
          } else {
            of(null)
          }
        })
      )
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        map((user) => {
          if (user) {
            return true
          } else {
            of(null)
          }
        })
      )
  }



  // updateUser(id, data) {
  //   console.log("ID DE USER A SER ATUALIZADO", id)
  //   this.userCollection.doc(id).update({
  //     // ...data,
  //     // id: id,
  //     codTransactionPagSeguro: data.codTransactionPagSeguro,
  //     // firstName: data.firstName,
  //     // lastName: data.lastName,
  //     // cpf: data.cpf,
  //     // ddd: data.ddd,
  //     // telefone: data.telefone,
  //     // cep: data.cep,
  //     // estado: data.estado,
  //     // cidade: data.cidade,
  //     // bairro: data.bairro,
  //     // rua: data.rua,
  //     // numero: data.numero,
  //     // complemento: data.complemento,
  //     // email: data.emailAccess,
  //     // nomePortadorCard: data.nomePortadorCard ? data.nomePortadorCard : 'BOLETO',
  //     // hashCard: data.hashCard ? data.hashCard : 'BOLETO',
  //     // created_at: data.created_at,
  //     updated_at: data.updated_at
  //     // codTransactionPagSeguro: data.codTransactionPagSeguro
  //   }).then(() => console.log("Atualizado com codTransactionPagSeguro"));
  // }

  // getUser() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       return this.userCollection.doc(user.uid).valueChanges()
  //     } else {
  //       of(null)
  //     }
  //   })
  // }


  // isAuthenticated() {
  //   return firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       console.log('Usuario conectado')
  //     } else {
  //       // No user is signed in.
  //       console.log('Usuario não conectado')
  //     }
  //   });






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


// }
