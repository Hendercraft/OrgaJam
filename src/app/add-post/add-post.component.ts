import { Component, OnInit } from '@angular/core';
import {StorageService} from "../services/storage/storage.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  // @ts-ignore
  postImage:File;
  // @ts-ignore
  postText:string;

  constructor(
    private storage: StorageService,
    private snackBar: MatSnackBar,
    private router: Router) {}

  ngOnInit(): void {
  }

  onFileSelected(event:any): void {
    this.postImage = event.target.files[0];
  }

  addPost(){
    this.storage.uploadPost(this.postText,this.postImage);
    this.snackBar.open("Vos poste a bien été ajouté ! ","Ok");
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}
