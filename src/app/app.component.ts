import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {Router, NavigationEnd, RouterEvent} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OrgaJam';
  currentUrl;

  constructor(
    private router: Router
  ) {
    router.events.subscribe(event =>
      {
        if (event instanceof RouterEvent) {
          this.currentUrl = event.url;
        }
      });
  }
}
