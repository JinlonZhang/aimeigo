/**
 * Package:
 * Class:
 * @description:
 * @author: Zhen.li
 * @Date: 2014-02-13 上午9:30
 */

var fs = require('fs');
var Util = require('../lib').Util;
var config = require('../config');
var proxy = require('../proxy');
var EventProxy = require('eventproxy');
var moment = require('moment');
var _ = require('underscore');
var gm = require('gm');
var Prize = proxy.Prize;
var User = proxy.User;

exports.index = function(req, res){
    var ep = new EventProxy(),query = {}, date = new Date(req.query.date);
    var dateTime = {}, i = 0;
    while(i<2){
        var d = moment().add('days', i).format('YYYY-MM-DD');
        dateTime['d' + i] = d;
        i++;
    }
    //分页
    var limit = 6, page = {}, currentPage = parseInt(req.query.p)  || 1;

    if(req.query.date != undefined && req.query.date != ''){
        query.date = {$lt: moment(date).add('days', 1).format('YYYY-MM-DD'), $gte: date};
    }
    ep.assign('list', 'total', 'pool', function(list, total, pool){

        page.current = currentPage;
        page.total = Math.ceil(total / limit);
        res.render('prize', {prizeList:list, date: dateTime, page:page, pool:pool});
    })
    Prize.getPrizeByQuery(query, {sort: {_id: -1}, skip:(currentPage-1)*limit, limit: limit}, function(err, list){
        if(!err){
            ep.emit('list', list);
        }
    })
    Prize.getPrizeTotalByQuery(query, function(err, total){
        if(!err){
            ep.emit('total', total);
        }
    });
    Prize.getPrizeTotalByQuery({date:null}, function(err, pool){
        if(!err){
            ep.emit('pool', pool);
        }
    });

}

exports.add = function(req, res){

    res.render('prize/add');
}

exports.detail = function(req, res){
    var id = req.params.id;
    Prize.getPrizeById(id, function(err, prize){
        res.render('prize/detail', {prize:prize});
    })

}

/* API */
var api = {}
exports.api = api;

api.add = function(req, res){
    var id = req.body.id;
    var o = {
        name: req.body.name,
        href: req.body.href,
        url: req.body.url,
        price: req.body.price
    }

    if(o.name == ""){
        return res.json( Util.resJson(-1, {msg: '宝贝名称不能为空。'}) )
    }

    if(req.body.id){
        Prize.modifyById(id, o, function(err){
            res.json( Util.resJson(err) );
        })
    }else{
        o.total = Math.floor(Math.random() * 300) + 500;
        Prize.add(o, function(err){
           // console.log(o)
            res.json( Util.resJson(err) );
        });
    }

}

api.delete = function(req, res){
    var id = req.params.id;

    Prize.deleteById(id, function(err){
        res.json( Util.resJson(err) );
    })
}

api.winner = function(req, res){
    var date = moment().add('days', -1).format('YYYY-MM-DD');

    var ep = new EventProxy();
    ep.assign('fs', function(arr){
        Prize.getPrizeByQuery({date:date, winner:null}, {sort: {_id: -1}}, function(err, list){
            //console.log('list====' + list);
            if(list.length == 0){
                res.json({code:-1});
            }else{
                for(var i = 0; i<list.length;i++){
                    list[i].winner = arr[i];
                    list[i].save();
                }
                res.json({code:0})
            }

        })
    })

    fs.readFile(config.txt + "winners.txt",'utf-8', function (error, fileData) {
        if (error) {
            // 出现错误
            console.log('error')
        }
        // 操作fileData
        var temp = fileData.split(','), arr=[];
        for(var i = 0; i < 3; i++){
            var k = Math.floor(Math.random() * temp.length);
            arr.push(temp[k]);
        }
        ep.emit('fs', arr);

    });
}














