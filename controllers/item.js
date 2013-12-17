/**
 * Created by allen.xu on 13-12-17.
 */

var Util = require('../lib').Util;
var proxy = require('../proxy');
var Item = proxy.Item;
var User = proxy.User;

exports.index = function(req, res){
    res.render('item')
}
exports.detail = function(req, res){
    res.render('item/detail');
}

/* API */
var api = {}
exports.api = api;

api.add = function(req, res){
    console.log(req.body);
    console.log(req.files);
    res.json( Util.resJson(0) );
}