import { Component, OnInit } from '@angular/core';
import {comment} from "../services/comment";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  commentList: comment[]
  constructor() { }

  ngOnInit(): void {
  }


}
