import {Component} from '@angular/core';
import io from 'socket.io-client'
import {SocketioService} from "../socket-io.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageForm} from "./messagesForm";
// import {UserForm} from "../newsScreen/userFrom";
// import {SocketIoService} from "../socket-io.service";
// import * as Connection from "./connection.js"
// import {MessageForm} from "../newsScreen/messagesForm";

@Component({
  selector: 'app-root',
  template: `
    <body>
      <h1 style="text-align: center;"> Sender nickname: {{senderId}} </h1>
      <h2 style="text-align: center;"> Recipient nickname: {{recipientId}} </h2>
      <div style=" overflow: auto; height: 500px">
        <div *ngFor="let mes of messages"  >
          <div style="background-color: #FF4B3A; border-radius: 10px; color: #FFFFFF; padding: 10px; font-size: 22px;">
            <div style="color: #ffc7c3;">
              from: {{mes.from}}
              to: {{mes.to}}
              date: {{mes.date}}
              time: {{mes.time}}
            </div>
            mes: {{mes.message}}
          </div>
        </div>
      </div>




    </body>
    <footer>
      <div style="background-color: #f8774a; padding: 10px; border-radius: 10px; ">
      <input [(ngModel)]="data" type="text"/>
      <button class="button" (click)="postMes(data)"> Send</button>
    </div>

    </footer>

  `,
  styles:[`
    div{
      margin: 10px;
    }
    input{
      font-size: 22px;
      border-radius: 10px;
      padding: 3px;
    }
    button{
      font-size: 22px;
      margin-left: 10px;
      background-color: #FFFFFF;
      border-radius: 10px;
      padding: 3px;
    }
  `]
})
export class messageComponent {


  senderId = ""
  recipientId = ""

  messages: MessageForm[]
  newData = ""
  data = ""

  constructor(private route: ActivatedRoute,
              private socketService: SocketioService,
              private http: HttpClient) {

    this.senderId = route.snapshot.params["id"]
    this.recipientId = route.snapshot.params["id2"]
    // this.socketService.listenToServer("change").subscribe((change) => {
    //   this.onChange(change);
    // })


  }


  ngOnInit(): void {
    this.socketService.listenToServer("create").subscribe((user) => {
      this.onCreate(user);
    })

    const params = new HttpParams().set('senderId', this.senderId).set("recipientId", this.recipientId);

    this.http.get<any>("http://localhost:4000/userModule/getMessages", {params})
      .subscribe(value => {
        this.messages = value
        // alert(this.messages)
      }, error => {
        console.log(error)
      })
  }

  postMes(newData: string) {
    const headers = new HttpHeaders();
    const body = {
      from: this.senderId,
      to: this.recipientId,
      time: (new Date()).toLocaleTimeString(),
      date: (new Date()).toLocaleDateString(),
      message: newData
    }
    //alert(body);
    this.http.post<any>("http://localhost:4000/userModule/addMessages", body, {headers: headers})
      .subscribe(value => {
        this.createMes(body)
      }, error => {
        console.log(error)
      })

  }


  onCreate(mes: MessageForm) {
    console.log("onCreateMes")
    this.messages.push(mes);
  }

  createMes(mes: MessageForm): void {

    this.socketService.emitToServer("create", mes);
    console.log("createUser2")
    this.data = ""
  }


}
