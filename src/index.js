var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});

app.get('/remote', function(req, res){
  res.sendFile(__dirname + '/app/remote.html');
});

io.on('connection', function(socket) {
    socket.on('videoEvent', function (data) {
    	data.id = socket.id;
        socket.broadcast.emit('videoUpdate', data);
    });
});

http.listen(8080);