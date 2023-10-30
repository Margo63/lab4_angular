import {Component, Input} from '@angular/core';
import {UserForm} from "./userFrom";
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'user-news',
  template: `
    <h3 >{{elem.name}}</h3>
    <div>
      <div *ngFor='let friendNews of elem.news'>
        {{friendNews}}
      </div>
    </div>

  `,
  styles:[`
    h3{
      font-size: 23px;
    }
    div{
      background-color: #FF4B3A;
      color: #FFFFFF;
      font-size: 20px;
      padding: 10px;
      margin-right: 10px;
      border-radius: 10px;
    }
  `]
})
export class userNewsComponent {
  @Input() elem: UserForm

}
