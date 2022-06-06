import { Injectable } from '@angular/core';
import { User } from "./user";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData :any;
  constructor(
      private afAuth : AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData =user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      }
      else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  signUp(email:string, password:string){
    return this.afAuth
        .createUserWithEmailAndPassword(email,password)
        .then((result)=> {
          //this.sendVerificationMail();
          //this.setUserData(result.user);
            }
        )
        .catch((error)=> {
          window.alert(error.message);
        });
  }
}

