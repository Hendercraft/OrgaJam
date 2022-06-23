import { Component, OnInit } from '@angular/core';
import {StorageService} from "../services/storage/storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../services/user";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  userList: User[] = [];

  constructor(private storage: StorageService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.params.subscribe(params => {
      console.log(params);
      if (params['searchField']) {
        this.doSearch(params['searchField'])
      }
    });
  }

  ngOnInit() {
  }

  doSearch(searchField:string) {
    this.storage.getAllProfiles().then(userList =>
      userList.forEach(user => {
        if (user.displayName.includes(searchField)) {
          this.userList.push(user);
        }
      })
    )

  }
}
