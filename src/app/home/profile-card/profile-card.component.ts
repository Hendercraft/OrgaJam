/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../services/storage/storage.service";
import {User} from "../../services/user";

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  userData : User;
  constructor(private storage : StorageService) { }

  ngOnInit(): void {
    this.getCurrentUserData();
  }


  getCurrentUserData(){
    const uid = JSON.parse(localStorage.getItem('user')).uid
    const observer = {
      next: user => {
        this.userData = user.data();
      },
      error: err => {
        console.log(err);
      }
    }
    this.storage.getUserWithUID(uid).subscribe(observer)

  }

}
