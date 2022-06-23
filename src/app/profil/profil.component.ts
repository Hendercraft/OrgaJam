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
  pictureUrl : string;
  profileImage: File;
  oldUserData:User;
  checked: boolean = false;
  serviceList: String[];
  instrumentList: String[];

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private snackBack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.profilForm = this.fb.group({
      displayName: [''],
      name:[''],
      surname:[''],
      bio:[''],
      instrument:[''],
      phoneNumber:['',[Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      isPro: ['', [Validators.required]],
      address: [''],
      town: [''],
      postalCode: [''],
      service: ['']
    })

    this.instrumentList = [
      'Guitariste',
      'Pianiste',
      'Chanteur',
      'Batteur',
      'Trompettiste',
      'Violoniste',
      'Tromboniste',
      'Bassiste',
      'Harpiste',
      'Percussionist',
      'Flutiste',
      'Tubiste',
      'Saxophoniste',
      'Multi-instrument'
    ];

    this.serviceList = [
      'Maison de disque',
      'Label',
      'Agent',
      'Studio d\'enregistrement',
      'Professeur',

    ]

    this.getUserData();
  }

  profilOnSubmit() {
    const uid = JSON.parse(localStorage.getItem(`user`)).uid;
    this.storage.updateUserData(this.profilForm.value,uid).then(
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
        this.oldUserData = user.data();
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
    this.profilForm.get('displayName').setValue(user.displayName);
    this.profilForm.get('name').setValue(user.name);
    this.profilForm.get('surname').setValue(user.surname);
    this.profilForm.get('phoneNumber').setValue(user.phoneNumber);
    this.profilForm.get('email').setValue(user.email);
    this.profilForm.get('isPro').setValue(user.isPro);
    this.profilForm.get('instrument').setValue(user.instrument);
    this.profilForm.get('bio').setValue(user.bio);
    this.pictureUrl = user.photoURL;
    if(user.isPro){
      this.profilForm.get('town').setValue(user.town);
      this.profilForm.get('address').setValue(user.address);
      this.profilForm.get('postalCode').setValue(user.postalCode);
      this.profilForm.get('service').setValue(user.service);
    }

  }


}
