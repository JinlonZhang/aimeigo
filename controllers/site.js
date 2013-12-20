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

User.initAdmin({
    type: 0,
    name: '管理员',
    login_name: 'admin@aimeigo.cn',
    pwd: Util.md5('1qazxsw2')

});

exports.index = function(req, res){
    var list = [], now = moment();
//    now.hour(0);now.minute(0);now.second(0);
//    console.log(now.format('YYYY-MM-DD HH:mm:ss'));

    var ep = new EventProxy();

    for(var i = 0; i<7;i++){
        list[i] = [];
    }

    ep.assign('1','2','3','4','5','6','7', function(a, b, c, d, e, f, g){
        list = [
            {
                type: 1,
                name: '衣服',
                list: a
            },
            {
                type: 2,
                name: '鞋子',
                list: b
            },
            {
                type: 3,
                name: '包包',
                list: c
            },
            {
                type: 4,
                name: '配饰',
                list: d
            },
            {
                type: 5,
                name: '美妆',
                list: e
            },
            {
                type: 6,
                name: '家居',
                list: f
            },
            {
                type: 7,
                name: '9.9包邮',
                list: g
            }
        ];
        res.render('website', {List: list});
    })

    Item.getItemByQuery({type: '1'}, {}, {sort: {_id: -1}, limit: 6}, ep.done('1'));
    Item.getItemByQuery({type: '2'}, {}, {sort: {_id: -1}, limit: 6}, ep.done('2'));
    Item.getItemByQuery({type: '3'}, {}, {sort: {_id: -1}, limit: 6}, ep.done('3'));
    Item.getItemByQuery({type: '4'}, {}, {sort: {_id: -1}, limit: 6}, ep.done('4'));
    Item.getItemByQuery({type: '5'}, {}, {sort: {_id: -1}, limit: 6}, ep.done('5'));
    Item.getItemByQuery({type: '6'}, {}, {sort: {_id: -1}, limit: 6}, ep.done('6'));
    Item.getItemByQuery({type: '7'}, {}, {sort: {_id: -1}, limit: 6}, ep.done('7'));
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

exports.add = function(req, res){
    console.log(req.body.price);
    var o = {
        name: req.body.name,
        href: req.body.href,
        price: req.body.price,
        discount: req.body.discount,
        comments: req.body.comments,
        type: req.body.type
    }

    Item.add(o, function(err){
        if(!err){
            res.json( Util.resJson(0) );
        }
    })

}


