
var models = require('../models');
var moment = require('moment');

var Prize = models.Prize;

/* 增加一个抽奖商品 */
exports.add = function(o, fn){
    var prize = new Prize();

    prize.name = o.name;
    prize.href = o.href;
    prize.url = o.url;
    prize.price = o.price;
    prize.total = o.total;

    prize.save(fn);
}

exports.getPrizeByQuery = function(query, opt, fn){
    Prize.find(query, {}, opt, fn);
}

exports.deleteById = function(id, fn){
    Prize.findByIdAndRemove(id, fn);
}
exports.modifyById = function(id, o, fn){
    Prize.findByIdAndUpdate(id, {$set: o}, fn);
}
exports.getPrizeById = function(id,fn){
    Prize.findOne({_id:id}, fn);
}

exports.getPrizeTotalByQuery = function(query, fn){
    Prize.count(query, fn);
}