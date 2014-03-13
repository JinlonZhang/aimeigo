/**
 * Package:
 * Class:
 * @description:
 * @author: Zhen.li
 * @Date: 2014-03-11 上午10:22
 */

var fs = require('fs');
var Util = require('../lib').Util;
var config = require('../config');
var proxy = require('../proxy');
var QQUser = proxy.QQUser;
var EventProxy = require('eventproxy');
var moment = require('moment');
var _ = require('underscore');

exports.index = function(req, res){
    var p = parseInt(req.query.p), limit = 10, page = {};
    page.current  = p || 1;
    var sort = {} ,s = 'score', t = -1;
    if(req.query.sort && req.query.sort != 'undefined'){
        s = req.query.sort;
    }
    if(req.query.turn && req.query.turn != 'undefined'){
        t =  req.query.turn
    }

    sort[s] = parseInt(t);

    var ep = new EventProxy();
    ep.assign('list', 'total','sign', function(list, totalPage, signTotal){
        page.total = totalPage;
        res.render('QQuser',{userList:list, page:page, signTotal:signTotal});
    })

    QQUser.getQQUserByQuery({},{sort:sort,skip:(page.current-1)*limit, limit: limit},function(err, list){
        if(!err){

            ep.emit('list', list);
        }
    })
    QQUser.getQQUserTotal({},function(err, count){
        if(!err){
            var totalPage = Math.ceil(count/limit);
            ep.emit('total', totalPage);
        }
    })

    var date = moment().format('YYYY-MM-DD');

    QQUser.getQQUserTotal({lastSign:date, signStatus:true},function(err,count){
        if(!err){
            ep.emit('sign', count);
        }
    })
}