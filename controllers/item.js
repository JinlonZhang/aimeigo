/**
 * Created by allen.xu on 13-12-17.
 */
var fs = require('fs');
var URL = require('url');
var http = require('http');
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
    var type = req.query.type, date = new Date(req.query.date), page = {};
    page.current = parseInt(req.query.p)  || 1;
    var query = {}, limit = 10, query2 = {};

    if(req.query.date != undefined && req.query.date != ''){
        query.date = {$lt: moment(date).add('days', 1).format('YYYY-MM-DD'), $gte: date};
        query2.date = {$lt: moment(date).add('days', 1).format('YYYY-MM-DD'), $gte: date};
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
        page.total = p;
        res.render('item', {itemList:list, total:total, date:dateTime, page:page});
    })

    Item.getItemByQuery(query, {},{sort: {date:-1, _id: -1},skip:(page.current-1)*limit, limit: limit}, function(err, itemList){

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
    date['d-1'] = moment().add('days', -1).format('YYYY-MM-DD');
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
    date['d-1'] = moment().add('days', -1).format('YYYY-MM-DD');
    Item.getItemById(req.params.id, function(err, item){
        res.render('item/detail', {item: item,date: date});
    })

}

exports.ranking = function(req, res){
    var page = {}, limit = 12, query = {},query2 = {},date = new Date(req.query.date),type = req.query.type;
    page.current = parseInt(req.query.p) || 1;

    var dateTime = {},i = 0;
    while(i < 2){
        var d = moment().add('days', -i).format('YYYY-MM-DD');
        dateTime['d' + i] = d;
        i++;
    }
    if(req.query.date != undefined && req.query.date != ''){
        query.date = {$lt: moment(date).add('days', 1).format('YYYY-MM-DD'), $gte: date};
        query2.date = {$lt: moment(date).add('days', 1).format('YYYY-MM-DD'), $gte: date};
    }
    if(type != undefined && type != ''){
        query2.type = type;
    }

    var ep = new EventProxy();
    ep.assign('list', 'total','t0','t1','t2','t3','t4','t5','t7', function(list, total, t0,t1,t2,t3,t4,t5,t7){

        page.total = total;
        var clickTotal = {t0:t0,t1:t1,t2:t2,t3:t3,t4:t4,t5:t5,t7:t7};
        res.render('item/ranking',{list:list,page:page, date:dateTime, clickTotal:clickTotal});
    })

    Item.getItemByQuery(query2,{},{sort:{buy_total:-1, date:-1}, skip:(page.current-1) * limit, limit:limit}, function(err, list){

        if(!err){
            ep.emit('list',list);
        }
    })
    Item.getItemTotalByQuery(query2,function(err, count){
        if(!err){
            var total = Math.ceil(count / limit);
            ep.emit('total', total);
        }
    })

    Item.getItemByQuery(query,{},{sort:{_id:-1}}, function(err, list){
        var t0 = 0;
        if(!err){
            list.forEach(function(item){
                var buy_total = item.buy_total || 0;
                t0 += buy_total;
            })
            ep.emit('t0', t0)
        }
    });

    Item.getItemByQuery(_.extend(query,{type:1}),{},{sort:{_id:-1}}, function(err, list){
        var t1 = 0;
        if(!err){
            list.forEach(function(item){
                var buy_total = item.buy_total || 0;
                t1 += buy_total;
            })
            ep.emit('t1', t1)
        }
    });
    Item.getItemByQuery(_.extend(query,{type:2}),{},{sort:{_id:-1}}, function(err, list){
        var t2 = 0;
        if(!err){
            list.forEach(function(item){
                var buy_total = item.buy_total || 0;
                t2 += buy_total;
            })
            ep.emit('t2', t2)
        }
    });
    Item.getItemByQuery(_.extend(query,{type:3}),{},{sort:{_id:-1}}, function(err, list){
        var t3 = 0;
        if(!err){
            list.forEach(function(item){
                var buy_total = item.buy_total || 0;
                t3 += buy_total;
            })
            ep.emit('t3', t3)
        }
    });
    Item.getItemByQuery(_.extend(query,{type:4}),{},{sort:{_id:-1}}, function(err, list){
        var t4 = 0;
        if(!err){
            list.forEach(function(item){
                var buy_total = item.buy_total || 0;
                t4 += buy_total;
            })
            ep.emit('t4', t4)
        }
    });
    Item.getItemByQuery(_.extend(query,{type:5}),{},{sort:{_id:-1}}, function(err, list){
        var t5 = 0;
        if(!err){
            list.forEach(function(item){
                var buy_total = item.buy_total || 0;
                t5 += buy_total;
            })
            ep.emit('t5', t5)
        }
    });
    Item.getItemByQuery(_.extend(query,{type:7}),{},{sort:{_id:-1}}, function(err, list){
        var t7 = 0;
        if(!err){
            list.forEach(function(item){
                var buy_total = item.buy_total || 0;
                t7 += buy_total;
            })
            ep.emit('t7', t7)
        }
    });


}

exports.hot = function(req, res){
    var query = {};
    var hot = {
        start: moment(),
        end: moment()
    }


    hot.start.add('days', -16).hours(0).minutes(0).seconds(0).milliseconds(0);
    hot.end.hours(23).minutes(59).seconds(59).milliseconds(999);

    if(req.query.name){
        query.name = new RegExp(req.query.name)
    }else{
        query.date = {$gte:new Date(hot.start), $lte: new Date(hot.end)}
    }


    Item.getItemByQuery(query, {}, {sort: {buy_total: -1, _id:-1}, limit: 36}, function(err, list){
        res.render('item/hot', {list: list});
    });
}

/* API */
var api = {}
exports.api = api;

api.add = function(req, res){
    var img = req.files.img || '', id = req.body.id, date = req.body.date, url =  req.body.url || '';

    var o = {
        type: req.body.type,
        name: req.body.name,
        href: req.body.href,
        price2: req.body.price2,
        date: date,
        url: url
    }
    if(o.name == ""){
        return res.json( Util.resJson(-1, {msg: '宝贝名称不能为空。'}) )
    }

    if(id){
        Item.modifyById(id, o, function(err){
            res.json( Util.resJson(err) );
        })
    }else{
        //console.log(img)
        if(img.size == 0){
             Item.add(o, function(err){
                res.json( Util.resJson(err) );
             })
        }else{
            var oldPath = img.path, newPath;
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

    var type = req.query.type;
    //console.log('type===========' + type)
    if(type && type =='big'){
        path = config.uploadItemDir + id + '.jpg'
    }else{
        path = config.uploadItemDir + id + '_small.jpg'
    }

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

api.setBuyTotal = function(req, res){
    var id = req.params.id, num = req.body.num;

    Item.getItemById(id, function(err, item){

        item.buy_total = num;
        item.save();

        res.json({code: 0, msg: '修改成功！'});
    })
}

api.setTop = function(req, res){
    var id = req.params.id, time = new Date();

    Item.getItemById(id, function(err, item){

        item.date = time;
        item.save();

        res.json({code: 0, msg: '修改成功！'});
    })
}