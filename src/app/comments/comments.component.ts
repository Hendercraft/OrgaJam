import {Component, Input, OnInit} from '@angular/core';
import {comment} from "../services/comment";
import {StorageService} from "../services/storage/storage.service";
import {Post} from "../services/post";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() post : Post;
  commentList: comment[]
  constructor(
    private storage : StorageService
  ) { }

  ngOnInit(): void {
    this.getPostComments();
  }


  getPostComments(){
    this.storage.getCommentsList(this.post.postId).then(comments => {
      this.commentList=comments;
    })


  }


}
