import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import {ProfilComponent} from "./profil/profil.component";
import {MessageComponent} from "./message/message.component";
import {HomeComponent} from "./home/home.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {AddPostComponent} from "./add-post/add-post.component";
import {SearchComponent} from "./search/search.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {IsLoggedInGuard} from "./Guards/is-logged-in.guard";

const routes: Routes = [
  {path : 'profil', component : ProfilComponent, canActivate:[IsLoggedInGuard] },
  {path: 'message', component: MessageComponent, canActivate:[IsLoggedInGuard] },
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'home', component: HomeComponent, canActivate:[IsLoggedInGuard] },
  {path: 'search', component: SearchComponent, canActivate:[IsLoggedInGuard] },
  {path: 'welcome', component: WelcomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
