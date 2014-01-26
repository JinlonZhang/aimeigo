/**
 * Created by allen.xu on 13-12-17.
 */
var fs = require('fs');
var Util = require('../lib').Util;
var config = require('../config');
var proxy = require('../proxy');
var Item = proxy.Item;
var User = proxy.User;
var EventProxy = require('eventproxy');
var moment = require('moment');
var _ = require('underscore');
var gm = require('gm');

exports.index = function(req, res){
    var type = req.query.type, date = new Date(req.query.date), page = parseInt(req.query.p)  || 1;
    var query = {}, limit = 10, query2 = {};

    if(req.query.date != undefined && req.query.date != ''){
        query.date = date;
        query2.date = date;
    }
    if(type != undefined && type != ''){
        query.type = type;
        limit = 10
    }
    var dateTime = {}, i = 0;
    while(i<4){
        var d = moment().add('days', i).format('YYYY-MM-DD');
        dateTime['d' + i] = d;
        i++;
    }
    var ep = new EventProxy();
    ep.assign('list','pages', 't0', 't1','t2','t3','t4','t5','t6','t7','t8', function(list, p, t0,t1, t2, t3, t4, t5, t6, t7, t8){
        var total= {t0:t0,t1:t1,t2:t2,t3:t3,t4:t4,t5:t5,t6:t6,t7:t7,t8:t8};

        res.render('item', {itemList:list, total:total, date:dateTime, page:page, totalPages:p});
    })

    Item.getItemByQuery(query, {},{sort: {date:-1, _id: -1},skip:(page-1)*limit, limit: limit}, function(err, itemList){

        ep.emit('list',itemList);

    });
    Item.getItemTotalByQuery(query, function(err, count){
        var totalPages = Math.ceil(count / limit);
        ep.emit('pages',totalPages);

    });

    Item.getItemTotalByQuery(query2,ep.done('t0'));
    Item.getItemTotalByQuery(_.extend(query2,{type:1}),ep.done('t1'));
    Item.getItemTotalByQuery(_.extend(query2,{type:2}),ep.done('t2'));
    Item.getItemTotalByQuery(_.extend(query2,{type:3}),ep.done('t3'));
    Item.getItemTotalByQuery(_.extend(query2,{type:4}),ep.done('t4'));
    Item.getItemTotalByQuery(_.extend(query2,{type:5}),ep.done('t5'));
    Item.getItemTotalByQuery(_.extend(query2,{type:6}),ep.done('t6'));
    Item.getItemTotalByQuery(_.extend(query2,{type:7}),ep.done('t7'));
    Item.getItemTotalByQuery(_.extend(query2,{type:8}),ep.done('t8'));


}
exports.add = function(req, res){
    var date = {},i=0;
    while(i<8){
        var d = moment().add('days', i).format('YYYY-MM-DD');
        date['d' + i] = d;
        i++;
    }
    //console.log(date);
    res.render('item/add',{date:date});

}
exports.detail = function(req, res){
    var date = {},i=0;
    while(i<8){
        var d = moment().add('days', i).format('YYYY-MM-DD');
        date['d' + i] = d;
        i++;
    }
    Item.getItemById(req.params.id, function(err, item){
        res.render('item/detail', {item: item,date: date});
    })

}



/* API */
var api = {}
exports.api = api;

api.add = function(req, res){
    var img = req.files.img, id = req.body.id, date = req.body.date;

    var o = {
        type: req.body.type,
        name: req.body.name,
        href: req.body.href,
        price: req.body.price,
        price2: req.body.price2,
        talk: req.body.talk,
        share_total: req.body.share_total,
        collect_total: req.body.collect_total,
        sale_total: req.body.sale_total,
        comments: [],
        date: date
    }
    if(o.name == ""){
        return res.json( Util.resJson(-1, {msg: '宝贝名称不能为空。'}) )
    }

    for (var i = 0; i < req.body.comments.length; i++) {
        var obj = req.body.comments[i];
        o.comments.push({
            text: obj,
            img: Math.floor( Math.random() * 700 )
        })
    }

    if(id){
        Item.modifyById(id, o, function(err){
            res.json( Util.resJson(err) );
        })
    }else{

        var oldPath = req.files.img.path, newPath;
        Item.add(o, function(err, item){
            newPath = config.uploadItemDir + item._id + '.jpg';
            var sImgPath = config.uploadItemDir + item._id + '_small.jpg';


            fs.rename(oldPath, newPath, function(err) {
                //res.json( Util.resJson(err) );
                //fs.createReadStream(newPath).pipe(fs.createWriteStream(sImgPath));
                gm(newPath)
                    .resize(100, 100, '!')
                    .autoOrient()
                    .write(sImgPath, function (err) {
                        res.json( Util.resJson(err) );
                    });

            });

        })
    }


}

api.delete = function(req, res){
    var id = req.params.id;

    Item.deleteById(id, function(err){

        var path1 = config.uploadItemDir + id + '.jpg', path2 = config.uploadItemDir + id + '_small.jpg' ;
        var path = [path1, path2];
        path.forEach(function(p){
            fs.exists(p, function(exists){
                if(exists){
                    fs.unlinkSync(p);
                }
                res.json( Util.resJson(err) );
            });
        })

    });
}


api.getImg = function(req, res){
    var id = req.params.id, path = config.uploadItemDir + id + '_small.jpg';
    var normal = config.uploadDir + 'normal.jpg';

//    if(type && type =='small'){
//        var path = config.uploadItemDir + id + '_small.jpg'
//    }else{
//        var path = config.uploadItemDir + id + '.jpg'
//    }

    fs.exists(path, function(exists){
        if(!exists){
            var p = config.uploadItemDir + id + '.jpg'
            fs.readFile(p, 'binary', function(err, file){
                if(err){
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end()
                }else{
                    res.writeHead(200, {"Content-Type": "image/jpg"});
                    res.write(file, "binary");
                    res.end();
                }
            })
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

api.buy = function(req, res){
    var id = req.body.id;

    Item.getItemById(id, function(err, item){
        item.buy_total++;
        item.save();

        res.json({code: 0, total: item.buy_total});
    })
}

api.share = function(req, res){
    var id = req.body.id, type = req.body.type;

    Item.getItemById(id, function(err, item){
        var total, random = Math.floor(Math.random() * 15) + 1;
        if(type == 0){
            total = item.share_total += random;
        }else{
            total = item.collect_total += random;
        }

        item.save();

        res.json({code: 0, total: total});
    })
}

api.clear = function(req, res){
    var date = moment().add('day',-7).format('YYYY-MM-DD');

    Item.getItemByQuery({date:{$lte:date}}, {},{sort:{id:-1}}, function(err, itemList){
        if(itemList.length==0){
            res.json( {code:-1, msg:'暂无数据需要清理！'} );
        }
        itemList.forEach(function(item){
            var id = item._id;var path1 = config.uploadItemDir + id + '.jpg', path2 = config.uploadItemDir + id + '_small.jpg';
            var path = [path1, path2];
            Item.deleteById(id, function(err){
                //console.log(path);
                path.forEach(function(p, i){
                    fs.exists(p, function(exists){
                        if(exists){
                            fs.unlinkSync(p);
                        }
                        res.json( Util.resJson(err) );
                    });
                })


            });
        })
    })
}

api.updateImg = function(req, res){
    var id = req.params.id, path1 = config.uploadItemDir + id + '.jpg', path2 = config.uploadItemDir + id + '_small.jpg';
    var path = [path1,path2];
    path.forEach(function(p, i){
        fs.exists(p, function(exists){
            if(exists){
                fs.unlink(p, function(err){
                    var oldPath = req.files.img.path, newPath, sImgPath;
                    newPath = config.uploadItemDir + id + '.jpg';
                    sImgPath = config.uploadItemDir + id + '_small.jpg';
                    fs.rename(oldPath, newPath, function(err) {
                        gm(newPath)
                            .resize(100, 100, '!')
                            .autoOrient()
                            .write(sImgPath, function (err) {
                                res.json( Util.resJson(err) );
                            });
                    });

                });
            }
        });
    })
}