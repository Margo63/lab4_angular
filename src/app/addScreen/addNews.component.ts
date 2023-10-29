import {Component} from '@angular/core';
import io from 'socket.io-client'
// import {UserForm} from "../newsScreen/userFrom";
// import {SocketIoService} from "../socket-io.service";
// import * as Connection from "./connection.js"
// import {MessageForm} from "../newsScreen/messagesForm";

@Component({
  selector: 'app-root',
  template: `
    <input #editId [value]="name" placeholder="Введите имя">
    <button id="login" (click)="chat()">Вход</button><br>

    <input #editId [value]="msg" placeholder="Сообщение">

    <button id="send"  (click)="send()">
      Отправить </button><br>
    <ul id="data"></ul>

            `,
})

/*
* <h1 style="text-align: center;"> Websocket Demo </h1>
            <div class="center">
                <input [(ngModel)]="label" type="text" />
                <button class="button" (click)="createUser (label)"> Create </button>
            </div>

            <div class="center" *ngFor="let user of users">
              <input [ (ngModel)]= "user.name" />
              <button class="button update" (click)="updateUser(user.name, user.id)"> Update </button>
            </div>
* */
export class addNewsComponent {
  socket = io("http://localhost:3000")
  name=""
  msg=""
  data=""
  chat() {

    this.socket.on("connection", () => {
      alert("emited")
      this.socket.emit("conn", { "name": this.name })
    });
    this.socket.on("msg", (msg) => { this.data+=msg.message });
  }

  send(){
    alert("send")
    this.socket && this.socket.emit("msg", { "name": this.name, "value": this.msg })
  }
  // users: UserForm[] = [];
  // label: string;
  //
  // constructor(private socketService: SocketIoService) {
  //   this.socketService.listenToServer(Connection.change).subscribe((change) => {
  //     this.onChange(change);
  //   })
  //   this.socketService.listenToServer(Connection.create).subscribe((user) => {
  //     this.onCreate(user);
  //   })
  // }
  //
  // onChange(change: UserForm) {
  //   const index = this.users.findIndex((user) => user.id === change.id);
  //   this.users[index].name = change.name;
  // }
  //
  // onCreate(user: UserForm) {
  //   this.users.push(user);
  // }
  //
  // createUser(label: string): void {
  //   const user:UserForm = new UserForm(Date.now().toString(), label, "", "", [], "", "", "", []);
  //
  //   this.socketService.emitToServer(Connection.create, user);
  //   this.label = ''
  // }
  //
  // updateUser(label: string, id: string): void {
  //   const user:UserForm = new UserForm(id, label, "", "", [], "", "", "", [])
  //   this.socketService.emitToServer(Connection.change, user)
  // }


}
