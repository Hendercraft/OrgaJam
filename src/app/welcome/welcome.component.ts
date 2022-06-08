import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  // @ts-ignore
  welcomeSignInForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private auth: AuthService
  ) {
  }

  get email() {
    return this.welcomeSignInForm.get('email');
  }

  get password() {
    return this.welcomeSignInForm.get('password');
  }

  ngOnInit() {
    this.welcomeSignInForm = this.fb.group({
      email: ['',
        [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]]
    });
  }

  submitForm() {
    this.auth.signIn(this.welcomeSignInForm.value.email, this.welcomeSignInForm.value.password).then(r => console.log(r));
  }

}
