const express = require('express');
const app = express();
const http = require('http')
const socketServer = http.Server(app);
const socket = require('socket.io');
const io = socket(socketServer);
const PORT = process.env.PORT||8080;
let msgs = [];
let users={};
app.use('/',express.static('public'));
io.on('connection',function(skt){
    skt.on('message',function(data){
        msgs.push(data);
        users[skt.id]=data;
        io.emit('get',data);
    });
    skt.on('username',function(name){
        users[skt.id]=name
       io.emit('userreply',users);
    });
    skt.emit("new-user",msgs);
    skt.emit("users",msgs);
    skt.on('disconnect',function(io){
        delete users[skt.id];
        console.log("disconnected")
     })
});
socketServer.listen(PORT,function(){
    console.log('8080');
});