import { Component, OnInit } from '@angular/core';
import {StorageService} from "../services/storage/storage.service";
import {Post} from "../services/post";
import {User} from "../services/user";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postList: Post[] = [];
  userList: User[] = [];
  constructor(private storage : StorageService) { }

  ngOnInit(): void {
    this.storage.getAllPosts().then(
      posts => posts.forEach( post => {
        this.postList.push(post)
        this.getUserData(post.uid)
      }
      )
    );
  }


  getUserData(uid : string){
    const observer = {
      next: user => {
        this.userList.push(user.data())
      },
      error: err  => {
        console.log(err);
      }
    };
    this.storage.getUserWithUID(uid).subscribe(observer);
  }
}
