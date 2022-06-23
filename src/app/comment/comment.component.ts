import { Component, OnInit,Input } from '@angular/core';
import {comment} from "../services/comment";
import {User} from "../services/user";
import {StorageService} from "../services/storage/storage.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment : comment;
  user: User;
  constructor(
    private storage : StorageService
  ) { }

  ngOnInit(): void {
    this.getUserData();
  }


  getUserData() {
    const observer = {
      next: user => {
        this.user = user.data();
      },
      error: err => {
        console.log(err);
      }
    }
    this.storage.getUserWithUID(this.comment.uid).subscribe(observer);
  }


}
