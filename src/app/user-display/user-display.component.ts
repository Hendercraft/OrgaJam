import {Component, Input, OnInit} from '@angular/core';
import {User} from "../services/user";
import {StorageService} from "../services/storage/storage.service";

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  @Input() user! :User;
  friendsList : User[] = [];
  isAdded:boolean=false;
  constructor(private storage:StorageService) {

  }

  ngOnInit(): void {
    this.storage.getFriendsList().then(friendsList => {
      friendsList.forEach(friend => {
        if(friend != undefined && friend.uid == this.user.uid) {
          this.isAdded=true;
        }
      });
    });
  }




  addUserAsFriend()
  {
    this.storage.addFriend(this.user.uid).then(r => console.log(r));
    this.storage.getFriendsList().then(friendsList => {
      friendsList.forEach(friend => {
        if(friend != undefined && friend.uid == this.user.uid) {
          this.isAdded=true;
        }
      });
    });
  }

  deleteUserFromFriends()
  {
    this.storage.deleteFriend(this.user.uid).then(r => console.log(r));
    this.isAdded=false;
  }
}
