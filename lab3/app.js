const express = require("express");
const server = express();
const http = require('http');
const https = require('https');
const fs = require('fs');


server.use(express.json()); // Обработка параметров в body
const path = require("path");

server.use('/public', express.static('public'));
const routes = require("./routes");
const client_routes = require("./client_routes")
server.use("/", routes);
server.use("/",client_routes);
server.listen(4000);


server.set("views",path.join(__dirname,"views"));
server.set("view engine",'ejs');

var httpServer = http.createServer(server);

const io = require('socket.io')(httpServer, {
  cors: {
    origins: ['http://localhost:4200']
  }
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('my message', (msg) => {
    io.emit('my broadcast', `server: ${msg}`);
  });

  socket.on('newData', (msg) => {
    io.emit('my broadcast', `server: ${msg}`);
  });

  socket.on('create', (data) => {
    console.log("create")
    io.emit('create', data);
  });

  socket.on('change', (data) => {
    console.log("change")
    io.emit('change', data);
  });

  socket.on('newNews', (data) => {
    console.log("newNews")
    io.emit('newNews', data);
  });




});


//
//
// let privateKey  = fs.readFileSync('/Users/Margarita/localhost.key', 'utf8');
// let certificate = fs.readFileSync('/Users/Margarita/localhost.crt', 'utf8');
//
// var credentials = {key: privateKey, cert: certificate};

// var httpServer = http.createServer(server);
// var httpsServer = https.createServer(credentials, server);
//
httpServer.listen(3000);
// httpsServer.listen(8443);






