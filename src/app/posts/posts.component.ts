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
  postWithUserList!:[post:Post,user:User][];
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





    // this.storage.getAllPosts().then(result => {
    //   console.log("result : ");
    //   console.log(result);
    //   result.forEach(post => {
    //     console.log("post : ");
    //     console.log(post);
    //       this.storage.getUserWithUID(post.uid).subscribe(
    //         user => {this.postWithUserList.push([post,user.data() as User]);
    //               console.log("user : " + user);}
    //       )
    //   })
    // })
  }


  getUserData(uid : string){
    const observer = {
      next: user => {
        this.userList.push(user)
      },
      error: err  => {
        console.log(err);
      }
    };
    this.storage.getUserWithUID(uid).subscribe(observer);
  }
}
