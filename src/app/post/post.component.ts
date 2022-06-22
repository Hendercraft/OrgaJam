import { Component, OnInit, Input } from '@angular/core';
import {Post} from "../services/post";
import {User} from "../services/user";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  @Input() user!: User;

  constructor() { }

  ngOnInit(): void {
  }
}
