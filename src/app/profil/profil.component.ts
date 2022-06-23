/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../services/storage/storage.service";
import {User} from "../services/user";
import {MatSnackBar} from "@angular/material/snack-bar";




@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  // @ts-ignore
  profilForm: FormGroup;
  instrumentList: String[];
  selectedInstrument : string;
  pictureUrl : string;
  profileImage: File;

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private snackBack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.profilForm = this.fb.group({
      username: ['',],
      email: ['', [Validators.required, Validators.email]],
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
      'multi-instrument'
    ];
    this.getUserData();
  }

  profilOnSubmit() {
    const oldUser: User = JSON.parse(localStorage.getItem(`user`));
    console.log(oldUser);
    const user  = {
      uid: oldUser.uid,
      email: this.profilForm.value.email,
      instrument: this.selectedInstrument,
      isPro: this.profilForm.value.isPro,
    }

    this.storage.updateUserData(user).then(
      () => {
        this.snackBack.open("Votre profil a été mis a jour avec succès !", "Ok");
        this.ngOnInit();
      },
      err => {
        this.snackBack.open("Il y a eu une erreur lors de la mise a jour de votre profil!", "Ok");
        console.log(err)
      }
    );
    if(this.profileImage !== undefined){
      this.storage.uploadProfilePicture(this.profileImage)
    }
  }

  onFileSelected(event:any): void {
    this.profileImage = event.target.files[0];
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
    this.profilForm.get('isPro').setValue(user.isPro);
    this.selectedInstrument = user.instrument;
    this.pictureUrl = user.photoURL;

  }


}
