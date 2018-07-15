$(document).ready(function(){
    var socket = io();
    let input=$('#input');
    let btn=$('#btn');
    let result = $('#result');
    let users = $('#users')
    var username = prompt('Enter Username');
    display();
    btn.click(function(){
        console.log(input.val());
        let value = input.val();
        socket.emit('message',{users:username,value:value});
        input.val('');
    });
    socket.on('get',function(data){
        result.append(`<li>${data.users} : ${data.value}</li>`);
    });
    function display(){
        socket.on('new-user',function(data){
            data.forEach(function(i){
                result.append(`<li><p id="u">${i.users}</p> : <p id="v">${i.value}</p></li>`);
            })
        })
    }
    socket.on('new',function (name) {
        users.append(`<li>${name}</li>`)
    });
        socket.emit('username',{name:username});
        socket.on('userreply',function(name){
                users.html('');
                for(var i in name){users.append(`<li>${name[i].name}</li>`)};
            });
});

