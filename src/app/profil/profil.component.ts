/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../services/storage/storage.service";
import {User} from "../services/user";




@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  // @ts-ignore
  profilForm: FormGroup;
  instrumentList: String[];
  selected : string;

  constructor(
    private fb: FormBuilder,
    private storage: StorageService) {
  }

  ngOnInit(): void {
    this.profilForm = this.fb.group({
      username: ['',],
      email: ['', [Validators.required, Validators.email]],
      picture: [''],
      instrument: [''],
      isPro: ['', [Validators.required]],
    })

    this.instrumentList = [
      'guitariste',
      'pianiste',
      'chanteur',
      'batteur',
      'trompettiste',
      'violoniste',
      'tromboniste',
      'bassiste',
      'harpiste',
      'percussionist',
      'flutiste',
      'tubiste',
      'saxophoniste',
      'multi-instrument',
      'aucun'
    ];
    this.getUserData();
  }

  profilOnSubmit() {
  }

  getUserData() {
    const observer = {
      next: user => {
        this.pushUserDataToView(user.data());
      },
      error: err => {
        console.log(err);
      }
    }
    let uid = JSON.parse(localStorage.getItem('user')).uid;
    console.log(uid)
    this.storage.getUserWithUID(uid).subscribe(observer);
  }

  pushUserDataToView(user : User){
    this.profilForm.get('username').setValue(user.displayName);
    this.profilForm.get('email').setValue(user.email);
    this.profilForm.get('instrument').setValue(user.instrument);
    this.profilForm.get('isPro').setValue(user.isPro);
    this.selected = user.instrument;
  }


}
