import { Injectable } from '@angular/core';
import { User } from "./user";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData :any;
  constructor(
      private afAuth : AngularFireAuth,
      private afStore : AngularFirestore
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData=user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      }
      else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  signUp(email:string, password:string,isPro : boolean){
    return this.afAuth
        .createUserWithEmailAndPassword(email,password)
        .then((result)=> {
          //this.sendVerificationMail();
          this.setUserData(result.user,isPro);
          //window.alert(this.userData.uid+this.userData.email+this.userData.displayName+this.userData.photoURL+this.userData.emailVerified+this.userData.isPro);
            }
        )
        .catch((error)=> {
          window.alert(error.message);
        });
  }

  setUserData(user: any,isPro:boolean) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.collection(`users`).doc(user.uid);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      isPro:isPro,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
}

