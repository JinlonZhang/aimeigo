/**
 * Created by allen.xu on 13-12-17.
 */

var Util = require('../lib').Util;
var proxy = require('../proxy');
var Item = proxy.Item;
var User = proxy.User;

exports.index = function(req, res){
    var type = req.query.type;
    Item.getItemByType(type, function(err, itemList){
        res.render('item', {itemList:itemList});
    })

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
    var o = {
        type: req.body.type,
        name: req.body.name,
        href: req.body.href,
        img: req.files.img,
        price: req.body.price,
        price2: req.body.price2,
        talk: req.body.talk
    }
    Item.add(o, function(err){
        if(!err){
            res.json( Util.resJson(0, {msg:'添加成功！'}) );
        }
    })

}