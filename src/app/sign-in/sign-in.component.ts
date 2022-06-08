import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    // @ts-ignore
    signInForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService
    ) {
    }

    get email() {
        return this.signInForm.get('email');
    }

    get password() {
        return this.signInForm.get('password');
    }

    ngOnInit() {
        this.signInForm = this.fb.group({
            email: ['',
                [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]]
        });
    }

    submitForm() {
        this.auth.signIn(this.signInForm.value.email, this.signInForm.value.password).then(r => console.log(r));
    }

}
