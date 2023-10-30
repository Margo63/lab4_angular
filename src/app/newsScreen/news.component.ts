import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserForm} from "./userFrom";
import {SocketioService} from "../socket-io.service";


@Component({
  selector: 'app-root',
  template: `
    <body>
      <h1>{{myid}}</h1>
      <img src="{{userInfo.img}}" style="height: 100px; width: 100px; border-radius: 50px">
      <div
        style="margin: 10px; color: #FFFFFF; background-color: #FF4B3A; border-radius: 10px; padding: 10px; font-size: 20px">
        <div *ngFor='let item of listUserNews'>
          {{item}}
        </div>
      </div>

      <div style="display: flex; flex-direction: row">
        <button (click)=addNews()>AddNews</button>
        <button (click)=goToAdmin() [ngStyle]="{'display': isAdmin}">Admin</button>
      </div>

      <div>
        <label>friend nickname</label>
        <input #editFriend [value]="friend" type="text">
        <button (click)=addFriend(editFriend.value)>add friend</button>
        <button (click)=delFriend(editFriend.value)>del friend</button>
      </div>

      <div>
        <label>image url</label>
        <input #editImage [value]="img" type="text">
        <button (click)=changeImg(editImage.value)>change img</button>
        <button (click)=delImg()>del img</button>
      </div>

      <h1>Friends News</h1>
      <div style="margin: 10px">
        <div *ngFor='let item of listUserFriends'>
          <user-news [elem]="item" (click)="friendClicked(item.id)"></user-news>
        </div>
      </div>
    </body>

  `,
  styles: [`
    button {
      background-color: #f8774a;
      color: #FFFFFF;
      font-size: 25px;
      border-radius: 10px;
      padding: 10px;
      margin: 10px;
    }
    body{
      padding: 5px;
    }
  `]
})
export class newsComponent {
  myid: string;
  listUserFriends: UserForm[];
  listUserNews: UserForm[];
  userInfo: UserForm;

  data = ""
  users: UserForm[] = [];

  isAdmin = "none"

  friend = ""
  img=""

  constructor(route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private socketService: SocketioService) {

    this.myid = route.snapshot.params["id"]

    this.socketService.listenToServer("newNews").subscribe((change) => {
      this.onChange(change);
    })

  }


  friendClicked(id: string) {
    //alert(this.myid)
    this.router.navigateByUrl('/message/' + this.myid + "/" + id).then(() => {
      window.location.reload();
    });
  }

  onChange(change: any) {
    console.log("onChange")
    const index = this.users.findIndex((user) => user.id === change.id);
    this.users[index].news.push(change.data);
  }


  ngOnInit(): void {
    const params = new HttpParams().set('id', this.myid);
    this.http.get<any>("http://localhost:4000/userModule/getUserInfo", {params})
      .subscribe(value => {
        this.userInfo = value.userInfo;

        this.listUserNews = value.userInfo.news;
        this.listUserFriends = value.userFriendsInfo;


        if (value.userInfo.role === "администратор") {
          this.isAdmin = "block"
        }

        this.users.push(value.userInfo)
        value.userFriendsInfo.forEach((el: UserForm) => {
          this.users.push(el)
        })

      }, error => {
        console.log(error)
      })

  }

  goToAdmin() {

    window.open("http://localhost:4000/admin/users", "_blank");
    //this.socketService.setupSocketConnection();
    //this.router.navigateByUrl('http://localhost/admin/users');
  }

  addNews() {
    this.router.navigateByUrl('/addNews/' + this.myid).then(() => {
      window.location.reload();
    });
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  addFriend(value: string) {
    const body = {
      id: this.userInfo.id,
      friend: value
    }

    this.http.post<any>("http://localhost:4000/userModule/addFriend", body)
      .subscribe(value => {
        //alert(value)

      }, error => {
        console.log(error)
      })
  }

  delFriend(value: string) {
    const body = {
      id: this.userInfo.id,
      friend: value
    }

    this.http.post<any>("http://localhost:4000/userModule/delFriend", body)
      .subscribe(value => {
        //alert(value)

      }, error => {
        console.log(error)
      })
  }

  changeImg(value: string) {
    alert(value)
    const body = {
      id: this.userInfo.id,
      img: value
    }

    this.http.post<any>("http://localhost:4000/userModule/changeImg", body)
      .subscribe(value => {
        //alert(value)

      }, error => {
        console.log(error)
      })
  }



  delImg() {
    const body = {
      id: this.userInfo.id
    }

    this.http.post<any>("http://localhost:4000/userModule/deleteImg", body)
      .subscribe(value => {
          //alert(value)

      }, error => {
        console.log(error)
      })
  }
}
