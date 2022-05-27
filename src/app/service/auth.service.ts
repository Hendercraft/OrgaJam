import { Injectable } from '@angular/core';
import { User } from './user';

import { Observable, of, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<User>;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) {
    // @ts-ignore
    //TODO local storage ?
    this.user = this.afAuth.authState.pipe(
      //We check the state and fetch the user data on login
      switchMap((user) => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  async signup(email: string, password: string) {
    await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('Do redirect and shit here');

        //localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  async signUp(email: string, password: string) {
    console.log('Do redirect and shit here');

    await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        //Sined In
        //TODO
        console.log('userCredential');
        this.SendVerificationMail();
        return userCredential.user; //this.updateUserData(userCredential.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async signIn(email: string, password: string) {
    await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Do redirect and shit here on login');
        return this.updateUserData(userCredential.user);
      });
  }

  // Send email verification when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        //TODO ROUTE this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false;
  }

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(data, { merge: true });
  }
}
