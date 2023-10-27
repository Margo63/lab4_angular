import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpParams} from "@angular/common/http";

export class MessageForm{
  constructor(
    public from: string,
    public message: string[]
  ) {}
}
export class UserForm{
  constructor(
    public id: string,
    public name:string,
    public BD:string,
    public email: string,
    public news: string[],
    public img: string,
    public role: string,
    public state: string,
    public messages: MessageForm[]
  ) {}
}


@Component({
  selector: 'app-root',
  template: `<h1>{{myid}}</h1>
              <div *ngFor = 'let item of listUserNews'>
                {{item}}
              </div>
                <h1>Friends News</h1>
              <button (click)=addNews()>AddNews</button>
              <div *ngFor = 'let item of listUserFriends'>
                {{item.name}}
                <div *ngFor = 'let friendNews of item.news'>
                     {{friendNews}}
                </div>
              </div>
                <button (click)=goToAdmin()>Admin</button>
                `,
})
export class newsComponent {
  myid: string; // Параметр
  listUserFriends: any;
  listUserNews:UserForm[];

  constructor(route: ActivatedRoute,private http: HttpClient, private router: Router) {
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
    this.router.navigateByUrl('/addNews');
  }
}
