/**
 * Controllers of User
 * Created by user on 13-12-17.
 */

var EventProxy = require('eventproxy');
var Util = require('../lib').Util;
var proxy = require('../proxy');
var User = proxy.User;

exports.index = function(req, res){
    User.getUserByQuery({type: 1}, {}, {}, function(err, userList){
        res.render('user', {userList: userList})
    })
}

/* API */
var api = {}
exports.api = api;

api.add = function(req,res){
    var o = {
        login_name: req.body.login_name,
        name: req.body.name,
        pwd: req.body.pwd,
        pwd2 : req.body.pwd2,
        type: 1
    }

    if(o.login_name == ''){
        return res.json( Util.resJson(-1, {msg: '登录名不能为空。'}) )
    }
    if(o.pwd == ''){
        return res.json( Util.resJson(-1, {msg: '密码不能为空'}) );
    }
    if(o.pwd != o.pwd2){
        return res.json( Util.resJson(-1, {msg: '两次密码不一致。'}) )
    }
    if(o.name == ''){
        return res.json( Util.resJson(-1, {msg: '昵称不能为空。'}) )
    }

    var ep = new EventProxy();
    var ep2 = new EventProxy();

    ep.assign('name', 'login_name', function(n, l){
        if(l.f || n.f){
            return res.json( Util.resJson(-1, {msg: l.msg || n.msg}) );
        }else{
            ep2.emit('ok');
        }
    })

    ep2.assign('ok', function(){
        o.pwd = Util.md5(o.pwd);
        User.add(o, function(err, user){
            res.json( Util.resJson(0) );
        });
    })

    //昵称是否存在
    User.getUserByName(o.name, ep.done(function(user){
        if(user){
            ep.emit('name', {f: true, msg: '昵称已存在。'})
        }else{
            ep.emit('name', {f: false});
        }
    }));
    //登录名是否存在
    User.getUserByLoginName(o.login_name, ep.done(function(user){
        if(user){
            ep.emit('login_name', {f: true, msg: '用户已存在。'});
        }else{
            ep.emit('login_name', {f: false});
        }
    }));
}
