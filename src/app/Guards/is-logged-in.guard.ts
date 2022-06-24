import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isLoggedIn = this.auth.loggedIn;

    if(isLoggedIn !== true){
      this.router.navigateByUrl('/welcome')
    }

    return isLoggedIn;
  }

}
