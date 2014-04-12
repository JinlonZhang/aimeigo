
var moment = require('moment');

var models = require('../models');
var Item = models.Item;

/**
 * 新增一件宝贝
 * @param {JSON} o 宝贝信息
 * @param {Function} fn 回调函数
 */
exports.add = function (o, fn) {
    var item = new Item();

    item.name = o.name;
    item.type = o.type;
    item.href = o.href;
    item.price2 = o.price2;
    item.date = o.date;
    item.url = o.url;

    item.save(fn);
};

exports.deleteById = function(id, fn){
    Item.findByIdAndRemove(id, fn);
}

exports.modifyById = function(id, o, fn){
    Item.findByIdAndUpdate(id, {$set: o}, fn);
}

exports.getItemByQuery = function(query, field, opt, fn){
    Item.find(query, field, opt, fn);
}

exports.getItemById = function(id, fn){
    Item.findOne({_id: id}, fn);
}

exports.getItemByType = function(type, fn){
    Item.find({type:type}, {}, {sort: {id: -1}}, fn);
}

exports.getItemTotalByType = function(type, fn){
    Item.find({type:type}, {_id:1}, {}, function(err, itemList){
        return fn(err, itemList.length);
    });
}

exports.getItemByDate = function(date, fn){
    Item.find({date: new Date(date)}, {},{sort: {id: -1}},fn)
}

exports.getItemTotalByQuery = function(query, fn){
    Item.count(query, fn);

}

//增加sale_total字段
exports.updateItem = function(id, o, fn){
    Item.findByIdAndUpdate(id, {$set: o}, fn);
}
