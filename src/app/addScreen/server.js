// const http = require( "http");
// const socket =require( "socket.io");
// const fs = require("fs/promises")
// const express = require("express");
// var app = express()
//
// // const httpServer = http.createServer(function (req, res) {
// //   // fs.readFile("./")
// //   //   .then(html => {
// //   //     res.setHeader("Content-Type", "text/html");
// //   //     res.writeHead(200);
// //   //     res.end(html);
// //   //   })
// // });
//
// var server = app.listen(3000, () => {
//   console.log("hohohoehoeh")
// });
//
// //const io = new socket.Server(httpServer, { /* options */ });
// var io = socket(server)
//
// io.on("connection", (socket) => { // При подключении клиента
//   console.log("hehehe")
//
//   socket.on('conn', (msg)=>{ // Сообщение "conn"
//
//     let time = (new Date()).toLocaleTimeString();
//     socket.name = msg.name // Сохранение имени
//     socket.emit("msg", {"message": `${time} Привет ${socket.name}!`});
//     socket.broadcast.emit("msg", {"message": `${time} Вошёл ${socket.name}!`});
//   });
//   socket.on('msg', (msg)=>{ // Сообщение "msg"
//     let time = (new Date()).toLocaleTimeString();
//     msg = `${time} ${socket.name}: ${msg.value}` // Сообщение
//     socket.emit("msg", {"message": msg}); // Отправка "обратно"
//     socket.broadcast.emit("msg", {"message": msg}); /* Отправка
//     всем */
//   });
// });

//httpServer.listen(3000);
//
//
// const express = require("express");
// var app = express()
// var socket = require("socket.io")
// var connection = require("./connection")
//
// var server = app.listen(3000, () => {
//   console.log("hohohoehoeh")
// });
//
// var socketIO = socket(server)
// socketIO.on("connection", (socket) => {
//   console.log("connection start" + socket.id)
//   socket.on(connection.change, (changes) => {
//     socketIO.sockets.emit(connection.change, changes);
//   });
//
//   socket.on(connection.create, (newData) => {
//     socketIO.sockets.emit(connection.create, newData);
//   });
//
// });




