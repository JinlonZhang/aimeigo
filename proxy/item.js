
var moment = require('moment');

var models = require('../models');
var Item = models.Item;

/**
 * 新增一件宝贝
 * @param {JSON} o 宝贝信息
 * @param {Function} callback 回调函数
 */
exports.add = function (o, callback) {
    var item = new Item();
    item.name = o.name;
    item.type = o.type;
    item.href = o.href;
    item.img = o.img;
    item.price = o.price;
    item.price2 = o.price2;
    item.talk = o.talk;


    item.save(callback);
};

exports.getItemByType = function(type, fn){
    Item.find({type:type}, {}, {sort: {id: -1}}, fn);
}

exports.getItemTotalByType = function(type, fn){
    Item.find({type:type}, {_id:1}, {}, function(err, itemList){
        return fn(err, itemList.length);
    });
}


