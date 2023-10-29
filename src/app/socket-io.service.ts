// import {Injectable} from '@angular/core';
// import * as Connection from "./addScreen/connection.js"
// import {Observable} from "rxjs";
// import { io, Socket } from "socket.io-client";
// import {UserForm} from "./newsScreen/userFrom";
//
// const baseUrl = "http://localhost:3000"
//
// @Injectable({
//   providedIn: 'root'
// })
// export class SocketIoService {
//
//   private clientSocket: any;
//
//   constructor() {
//     this.clientSocket = io(baseUrl);
//   }
//
//   listenToServer(connect: Connection): Observable<any> {
//     return new Observable((subscriber) => {
//       this.clientSocket.on(connect, (data:any) => {
//         subscriber.next(data);
//       });
//     });
//   }
//
//   emitToServer(connection: Connection, data:UserForm):void{
//     this.clientSocket.emit(connection,data);
//   }
//
// }

import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import {environment} from "./enviroment";
import {UserForm} from "./newsScreen/userFrom";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket: any;
  news: ""
  usersData: UserForm[]

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('my message', 'Hello there  Angular.');

    this.socket.on('my broadcast', (data: string) => {
      console.log(data);
    });
  }



  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  listenToServer(connection:string):Observable<any>{
    console.log("listen"+connection)
    return new Observable((subscribe)=>{
      this.socket.on(connection, (data:any)=>{
        subscribe.next(data);
      })
    });
  }

  emitToServer(connection:string, data: any){
    console.log("send"+connection)
    this.socket.emit(connection, data)
  }

}
