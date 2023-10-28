import {Component, Input} from '@angular/core';
import {UserForm} from "./userFrom";



@Component({
  selector: 'user-news',
  template: `
    <h3>{{elem.name}}</h3>
    <div *ngFor='let friendNews of elem.news'>
      {{friendNews}}
    </div>
  `,
})
export class userNewsComponent {
  @Input() elem: UserForm

}
