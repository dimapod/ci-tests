var express = require('express')
  , path = require('path')
  , http = require('http');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8000);
  app.use(express.static(path.join(__dirname, '../')));
  app.use(express.bodyParser());
});

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

module.exports=server;