import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private userCollection: AngularFirestoreCollection = this.afs.collection('users');

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }


  register(user): Observable<boolean> {
    return from(this.afAuth.auth
      .createUserWithEmailAndPassword(user.emailAccess, user.password))
      .pipe(
        switchMap((u: firebase.auth.UserCredential) => {
          return this.userCollection.doc(u.user.uid).set({ ...user, id: u.user.uid })
            .then(() => true)
        }),
        catchError((error) => throwError(error))
      )
  }

  login(email: string, password: string) {

    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password))
      .pipe(
        switchMap((u: firebase.auth.UserCredential) => {
          return this.userCollection.doc(u.user.uid).valueChanges();
        }),
        catchError(() => {
          return throwError('Credenciais Inváçidas ou usuário não está registardo.')
        })
      )
  }


  lougout() {
    this.afAuth.auth.signOut();
  }


}
