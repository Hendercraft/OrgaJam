import {Component, Input, OnInit} from '@angular/core';
import {User} from "../services/user";

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  @Input() user! :User;
  isAdded:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }



}
