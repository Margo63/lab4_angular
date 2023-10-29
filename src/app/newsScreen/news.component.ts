import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserForm} from "./userFrom";
import {SocketioService} from "../socket-io.service";


@Component({
  selector: 'app-root',
  template: `<h1>{{myid}}</h1>
  <div *ngFor='let item of listUserNews'>
    {{item}}
  </div>


  <button (click)=addNews()>AddNews</button>
  <button (click)=goToAdmin() [ngStyle]="{'display': isAdmin}">Admin</button>
  <h1>Friends News</h1>
  <div *ngFor='let item of listUserFriends'>
    <user-news [elem]="item" (click)="friendClicked(item.id)"></user-news>
  </div>

  `,
})
export class newsComponent {
  myid: string;
  listUserFriends: UserForm[];
  listUserNews: UserForm[];
  userInfo: UserForm;

  data = ""
  users: UserForm[]=[];

  isAdmin= "none"
  constructor(route: ActivatedRoute,
              private http: HttpClient,
              private router: Router,
              private socketService: SocketioService) {

    this.myid = route.snapshot.params["id"]

    this.socketService.listenToServer("newNews").subscribe((change) => {
      this.onChange(change);
    })

  }


  friendClicked(id: string){
    alert(this.myid)
    this.router.navigateByUrl('/message/' + this.myid +"/"+ id).then(() => {
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


        if(value.userInfo.role === "администратор"){
          this.isAdmin = "block"
        }

        this.users.push(value.userInfo)
        value.userFriendsInfo.forEach((el:UserForm)=>{
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
    this.router.navigateByUrl('/addNews/' + this.myid);
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
