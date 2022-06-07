import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import {ProfilComponent} from "./profil/profil.component";
import {MessageComponent} from "./message/message.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: 'register-user', component: SignUpComponent },
  {path : 'profil', component : ProfilComponent },
  {path: 'message', component: MessageComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'home', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
