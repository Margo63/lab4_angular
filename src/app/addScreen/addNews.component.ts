import {Component} from '@angular/core';
import io from 'socket.io-client'
import {SocketioService} from "../socket-io.service";
import {UserForm} from "../newsScreen/userFrom";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
// import {UserForm} from "../newsScreen/userFrom";
// import {SocketIoService} from "../socket-io.service";
// import * as Connection from "./connection.js"
// import {MessageForm} from "../newsScreen/messagesForm";

@Component({
  selector: 'app-root',
  template: `

    <div>
      <label>New news</label>
      <input #editData [value]="newData" type="text">
    </div>
    <button (click)=postNews(editData.value)>Post</button>

  `,
})

export class addNewsComponent {
  newData=""
  data = ""
  users: UserForm[]=[]
  constructor(private route: ActivatedRoute,
    private socketService: SocketioService,
    private http: HttpClient,) {

  }

  postNews(newData: string) {
    const headers = new HttpHeaders();
    const body = {
      id: this.route.snapshot.params["id"],
      data: newData
    }
    //alert(newData);
    this.http.post<any>("http://localhost:4000/userModule/addNews", body, {headers: headers})
      .subscribe(value => {

        if (value.mes === true){
         // alert("posted")
          this.socketService.emitToServer("newNews", body);
        }


      }, error => {
        console.log(error)
      })

  }


  // createUser(label: string): void {
  //   console.log("createUser")
  //   const user:UserForm = new UserForm(Date.now().toString(), label, "", "", [], "", "", "");
  //   this.data = ""
  //   this.socketService.emitToServer("create", user);
  //   console.log("createUser2")
  // }
  //
  // updateUser(label: string, id: string): void {
  //   const user:UserForm = new UserForm(id, label, "", "", [], "", "", "")
  //   this.socketService.emitToServer("change", user)
  // }


}
