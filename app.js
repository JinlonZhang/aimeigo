
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var ejs = require('ejs');
var path = require('path');
var moment = require('moment');
var routes = require('./routes');
var config = require('./config');


moment.lang('zh-cn');
var app = express();

// all environments
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(express.favicon(path.join(__dirname, 'public/img/favicon.ico')));
app.use(express.logger('dev'));
//app.use(express.bodyParser({uploadDir: config.uploadDir }));
app.use(express.bodyParser());
app.use(express.methodOverride());
//Cookie 解析的中间件
//app.use(express.cookieParser(config.cookieSecret));
//提供会话支持
//secret 用来防止篡改 cookie
//key 的值为 cookie 的名字

app.use(express.static(path.join(__dirname, 'public')));

app.use(app.router);

//路由分配
routes(app);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
