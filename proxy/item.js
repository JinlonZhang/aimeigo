
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
    item.prcie = o.price;
    item.discount = o.discount;


    item.save(callback);
};



