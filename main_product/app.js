var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');
var path = require('path')
var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync(path.join(__dirname, '/index.html'), 'utf-8'));
}).listen(3000); // ポート競合の場合は値を変更

var io = socketio.listen(server);

io.sockets.on('connection', function (socket) {
  socket.on('client_to_server', function (data) {
    io.sockets.emit('server_to_client', {value: data.value});
  });
});
