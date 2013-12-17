/**
 * Created with JetBrains WebStorm.
 * User: allenxu
 * Date: 13-9-16
 * Time: 上午11:22
 * To change this template use File | Settings | File Templates.
 */
var proxy = require('../proxy');
var Item = proxy.Item;

exports.index = function(req, res){

    res.render('index');
}

exports.admin = function(req, res){

    Item.add({name: "allen"}, function(err, item){
        res.render('admin');
    });

}
