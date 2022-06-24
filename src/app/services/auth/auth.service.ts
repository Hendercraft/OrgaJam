import {Injectable, NgZone} from '@angular/core';
import { User } from "../user";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData :any;
  loggedIn = false;
  constructor(
      private afAuth : AngularFireAuth,
      private afStore : AngularFirestore,
      private router :Router,
      private ngZone : NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData=user;
        this.loggedIn = true;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
        });
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
          this.setUserData(result.user,isPro);
            }
        )
        .catch((error)=> {
          window.alert(error.message);
        });
  }

  signIn(email: string, password: string) {
    return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
        })
        .catch((error) => {
          window.alert(error.message);
        });
  }

  setUserData(user: any,isPro:boolean) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.collection(`users`).doc(user.uid);
    const userData: User = {
      uid: user.uid,
      name : '',
      surname: '',
      phoneNumber: '',
      bio: '',
      email: user.email,
      displayName:'',
      instrument: '',
      photoURL: '',
      emailVerified: false,
      isPro:isPro,
      address: '',
      town: '',
      postalCode: '',
      service: '',
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  isLoggedIn(){
    return this.loggedIn;
  }

  logOut(){
    this.afAuth.signOut().then(() => {
      this.loggedIn = false;
      this.userData = null;
      this.router.navigateByUrl('/welcome');
    }).catch((error) => {
      console.log("There is an error while loggingOut");
      console.log(error);
    });
  }


}

