/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private auth : AuthService,private router: Router) { }

  ngOnInit(): void {

  }


  isLoggedIn(){
    return this.auth.isLoggedIn();
  }

  logOut(){
    this.auth.logOut();
  }

  onSearch(searchField:string){
    this.router.navigate(['search', {searchField: searchField}]);
  }


}
