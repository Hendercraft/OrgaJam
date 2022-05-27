import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) {}

  async signup(email: string, password: string) {
    await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('Do redirect and shit here');

        //localStorage.setItem('user', JSON.stringify(res.user));
      });
  }
}
