/**
 * Package:
 * Class:
 * @description:
 * @author: Zhen.li
 * @Date: 2014-03-11 上午9:56
 */


var models = require('../models');
var QQUser = models.QQUser;


exports.getQQUserByQuery = function(query, opt, fn){
    QQUser.find(query, {}, opt, fn);
}

exports.getQQUserTotal = function(query, fn){
    QQUser.count(query,fn);
}