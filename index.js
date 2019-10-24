var http = require('http')
var accesslog = require('access-log');
var fs = require('fs');
var express = require('express');
var app = express();
var file_readed = fs.readFileSync('counter.txt');
var visits = file_readed;
//var dockerid = process.env.DOCKERID;
var random = Math.random();
var server = http.createServer(function(req, res){

if (req.url === '/favicon.ico') { }
else {visits++};
  accesslog(req, res);
  var stdo = fs.createWriteStream('accesslog.log', {'flags': 'a'});
  var write = function(write) {
    return function(string, encoding, fd) {
      stdo.write(string);
    };
  };
  process.stdout.write = write(process.stdout.write);
  res.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8'});
  fs.writeFileSync('counter.txt', visits);
  res.end('Сайт посетили '+visits+' пользователя V3.3.3 APP№'+random+'');
});
var port = process.env.PORT || 3434;
var ip = process.env.IP;
server.listen(port, ip);
console.log('Server started! port: '+port+'');
