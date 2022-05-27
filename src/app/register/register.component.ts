import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(public auth: LoginService) {}

  ngOnInit(): void {}
  async signUp(email: string, password: string) {
    await this.auth.signup(email, password);
  }
}
