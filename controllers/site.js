/**
 * Created with JetBrains WebStorm.
 * User: allenxu
 * Date: 13-9-16
 * Time: 上午11:22
 * To change this template use File | Settings | File Templates.
 */
var Util = require('../lib').Util;
var proxy = require('../proxy');
var Item = proxy.Item;
var User = proxy.User;
var EventProxy = require('eventproxy');
var moment = require('moment');

exports.index = function(req, res){
    var list = [], now = new Date();
    //now.hour(0);now.minute(0);now.second(0);
    console.log('now' + now);
    var ep = new EventProxy();

    ep.assign('1','2','3','4','5','6','7','8', function(a, b, c, d, e, f, g, h){
        list = [].concat(a, b, c, d, e, f, g, h);
        res.render('website', {itemList: list});
    })
    Item.getItemByQuery({type: '1',date:{$lte: now}}, {}, {sort: {date: -1, _id:-1}, limit: 10}, ep.done('1'));
    Item.getItemByQuery({type: '2',date:{$lte: now}}, {}, {sort: {date: -1, _id:-1}, limit: 5}, ep.done('2'));
    Item.getItemByQuery({type: '3',date:{$lte: now}}, {}, {sort: {date: -1, _id:-1}, limit: 5}, ep.done('3'));
    Item.getItemByQuery({type: '4',date:{$lte: now}}, {}, {sort: {date: -1, _id:-1}, limit: 5}, ep.done('4'));
    Item.getItemByQuery({type: '5',date:{$lte: now}}, {}, {sort: {date: -1, _id:-1}, limit: 5}, ep.done('5'));
    Item.getItemByQuery({type: '6',date:{$lte: now}}, {}, {sort: {date: -1, _id:-1}, limit: 5}, ep.done('6'));
    Item.getItemByQuery({type: '7',date:{$lte: now}}, {}, {sort: {date: -1, _id:-1}, limit: 10}, ep.done('7'));
    Item.getItemByQuery({type: '8',date:{$lte: now}}, {}, {sort: {date: -1, _id:-1}, limit: 5}, ep.done('8'));

}

exports.del = function(req, res){
    console.log(req.params.id);
    res.json({code:0});
}

exports.admin = function(req, res){
    res.render('index');
}

exports.login = function(req, res){
    res.render('login');
}

exports.logout = function(req, res){
    req.session.user = null;
    res.render('login');
}

/* api */
var api = {}
exports.api = api;
/**
 * 登录。ajax请求。
 * @param req
 * @param res
 */
api.sign = function(req, res){
    var o = {
        login_name: req.body.login_name,
        pwd: req.body.pwd
    }
    User.getUserByLoginName(o.login_name, function(err, user){
        if(!user){
            return res.json( Util.resJson(-1, {msg: '用户不存在！'}) )
        }

        o.pwd = Util.md5(o.pwd);
        if(o.pwd != user.pwd){
            return res.json( Util.resJson(-1, {msg: '用户名或密码错误！'}))
        }

        req.session.user = user;
        res.json( Util.resJson(0) );
    })

}