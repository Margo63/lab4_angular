import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserForm} from "./userFrom";


@Component({
  selector: 'app-root',
  template: `<h1>{{myid}}</h1>
  <div *ngFor='let item of listUserNews'>
    {{item}}
  </div>
  <button (click)=addNews()>AddNews</button>
  <button (click)=goToAdmin()>Admin</button>
  <h1>Friends News</h1>
  <div *ngFor='let item of listUserFriends'>
    <user-news [elem]="item"></user-news>
  </div>

  `,
})
export class newsComponent {
  myid: string; // Параметр
  listUserFriends: UserForm[];
  listUserNews: UserForm[];

  constructor(route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.myid = route.snapshot.params["id"]
  }

  ngOnInit(): void {
    const params = new HttpParams().set('id', this.myid);
    this.http.get<any>("http://localhost:3000/userModule/getUserInfo", {params})
      .subscribe(value => {
        this.listUserNews = value.userInfo.news
        this.listUserFriends = value.userFriendsInfo
      }, error => {
        console.log(error)
      })
  }

  goToAdmin() {
    //this.router.navigateByUrl('http://localhost/admin/users');
  }

  addNews() {
    this.router.navigateByUrl('/addNews/' + this.myid);
  }
}
