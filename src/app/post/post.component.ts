import { Component, OnInit, Input } from '@angular/core';
import {Post} from "../services/post";
import {User} from "../services/user";
import {StorageService} from "../services/storage/storage.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  user: User;

  constructor(
    private storage : StorageService
  ) { }

  ngOnInit(): void {
    this.getUserData(this.post.uid);
  }


  getUserData(uid : string){
    const observer = {
      next: user => {
        this.user = user.data()
      },
      error: err  => {
        console.log('error while fetching user');
        console.log(err);
      }
    };
    this.storage.getUserWithUID(uid).subscribe(observer);
  }
}
