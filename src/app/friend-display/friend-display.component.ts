import {Component, Input, OnInit} from '@angular/core';
import {User} from "../services/user";
import {StorageService} from "../services/storage/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-friend-display',
  templateUrl: './friend-display.component.html',
  styleUrls: ['./friend-display.component.css']
})
export class FriendDisplayComponent implements OnInit {
  @Input() friend! :User;
  constructor(private storage : StorageService,private router : Router) {

  }

  ngOnInit(): void {

  }

  deleteFriend(){
    this.storage.deleteFriend(this.friend.uid).then(r => console.log(r));
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }


}
