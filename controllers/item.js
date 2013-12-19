/**
 * Created by allen.xu on 13-12-17.
 */
var fs = require('fs');
var Util = require('../lib').Util;
var config = require('../config');
var proxy = require('../proxy');
var Item = proxy.Item;
var User = proxy.User;

exports.index = function(req, res){
    var type = req.query.type;
    var query = {};

    if(type != undefined) query.type = type;



    Item.getItemByQuery(query, {},{limit: 10}, function(err, itemList){
        res.render('item', {itemList:itemList});
    })



}
exports.add = function(req, res){
    res.render('item/add');
}
exports.detail = function(req, res){
    Item.getItemById(req.params.id, function(err, item){
        res.render('item/detail', {item: item});
    })

}

/* API */
var api = {}
exports.api = api;

api.add = function(req, res){
    var img = req.files.img, id = req.body.id;

    var o = {
        type: req.body.type,
        name: req.body.name,
        href: req.body.href,
        price: req.body.price,
        price2: req.body.price2,
        talk: req.body.talk
    }

    if(id){
        Item.modifyById(id, o, function(err){
            res.json( Util.resJson(err) );
        })
    }else{
        var oldPath = req.files.img.path, newPath;
        Item.add(o, function(err, item){
            newPath = config.uploadItemDir + item._id + '.jpg';
            fs.rename(oldPath, newPath, function(err) {
                res.json( Util.resJson(err) );
            });
        })
    }



}

api.delete = function(req, res){
    var id = req.params.id;

    Item.deleteById(id, function(err){

        var path = config.uploadItemDir + id + '.jpg';
        fs.exists(path, function(exists){
            if(exists){
                fs.unlinkSync(path);
            }
            res.json( Util.resJson(err) );
        });

    });


}

api.getImg = function(req, res){
    var id = req.params.id, path = config.uploadItemDir + id + '.jpg';
    var normal = config.uploadDir + 'normal.jpg';


    fs.exists(path, function(exists){
        if(!exists){
            /*
            fs.readFile(normal, 'binary', function(err, file){
                res.writeHead(200, {"Content-Type": "image/jpg"});
                res.write(file, "binary");
                res.end();
            })
            */
        }else{
            fs.readFile(path, 'binary', function(err, file){
                if(err){
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end()
                }else{
                    res.writeHead(200, {"Content-Type": "image/jpg"});
                    res.write(file, "binary");
                    res.end();
                }
            })
        }
    });
}