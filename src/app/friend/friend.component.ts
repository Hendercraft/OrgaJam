import { Component, OnInit } from '@angular/core';
import {User} from "../services/user";
import {StorageService} from "../services/storage/storage.service";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  friendList : User[] = [];
  constructor(private storage : StorageService) { }

  ngOnInit(): void {
    this.storage.getFriendsListForFriendsDisplay().then(friends => {
      this.friendList=friends;
    })
  }

}
