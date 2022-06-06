import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
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
      password: ['',[Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]]
    });
  }


  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  submitForm(){
    console.log("jjeu");
    console.log(this.signUpForm.value.email);
    this.auth.signUp(this.signUpForm.value.email, this.signUpForm.value.password).then(r => console.log(r))
  }

}
