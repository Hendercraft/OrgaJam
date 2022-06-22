import { Component, OnInit } from '@angular/core';
import {StorageService} from "../services/storage/storage.service";
import {FormBuilder, FormGroup} from "@angular/forms";

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

  constructor(private storage : StorageService) {}

  ngOnInit(): void {
  }

  onFileSelected(event:any): void {
    this.postImage = event.target.files[0];
  }

  addPost(){
    this.storage.uploadPost(this.postText,this.postImage);
  }

}
