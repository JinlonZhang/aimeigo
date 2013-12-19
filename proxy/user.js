
var moment = require('moment');

var models = require('../models');
var User = models.User;

exports.initAdmin = function(o){
    var ex = exports;
    ex.getUserByLoginName(o.login_name, function(err, user){
        if(!user){
            ex.add(o);
        }
    })
}

/**
 * 新增一个用户
 * @param {JSON} o 用户信息
 * @param {Function} callback 回调函数
 */
exports.add = function (o, callback) {
    var user = new User();
    user.name = o.name;
    user.login_name = o.login_name;
    user.pwd = o.pwd;
    user.type = 1; //小编

    user.save(callback);
};

exports.modifyProfile = function(o, callback){
    exports.getUserById(o.id, function(err, user){
        user.name = o.name;

        user.save(function(err){
            callback(err, user);
        });
    })
}

/**
 * 根据查询条件，获取一组用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {Object} query 关键字
 * @param {Object} field 字段显示
 * @param {Object} opt 选项(sort， limit)
 * @param {Function} fn 回调函数
 */
exports.getUserByQuery = function (query, field, opt, fn) {
    User.find(query, field, opt, fn);
};

/**
 * 根据登录名查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} login_name 登录名
 * @param {Function} callback 回调函数
 */
exports.getUserByLoginName = function (login_name, callback) {
    User.findOne({login_name: login_name}, callback);
};

/**
 * 根据用户ID，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} id 用户ID
 * @param {Function} callback 回调函数
 */
exports.getUserById = function (id, callback) {
    User.findOne({_id: id}, callback);
};

/**
 * 根据用户名，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} name 用户名
 * @param {Function} callback 回调函数
 */
exports.getUserByName = function (name, callback) {
    User.findOne({name: name}, callback);
};


