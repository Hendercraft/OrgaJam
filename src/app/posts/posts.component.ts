import { Component, OnInit } from '@angular/core';
import {StorageService} from "../services/storage/storage.service";
import {Post} from "../services/post";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postList: Post[] = [];
  constructor(private storage : StorageService) { }

  ngOnInit(): void {
    this.storage.getAllPosts().then(
      posts => posts.forEach( post => {
        this.postList.push(post)
      }
      )
    );
  }



}
