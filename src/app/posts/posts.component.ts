import { Component, OnInit } from '@angular/core';
import {StorageService} from "../services/storage/storage.service";
import {Post} from "../services/post";
import {User} from "../services/user";
import {PostWithUser} from "../services/postWithUser";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postWithUserList!:[post:Post,user:User][];

  constructor(private storage : StorageService) { }

  ngOnInit(): void {
    this.storage.getAllPosts().then(result => { result.forEach(post => {
          this.storage.getUserWithUID(post.uid).subscribe(user => this.postWithUserList.push([post,user.data() as User]))

        })}
    )
  }
}
