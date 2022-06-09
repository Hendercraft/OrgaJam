import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  // @ts-ignore
  signUpForm: FormGroup;

  constructor(
    private fb : FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ['',
        [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]],
      isPro:[false]

    });
  }


  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get isPro() {
    return this.signUpForm.get('isPro');
  }


  submitForm(){
    this.auth.signUp(this.signUpForm.value.email, this.signUpForm.value.password,this.signUpForm.value.isPro).then(r => console.log(r));
  }

}
