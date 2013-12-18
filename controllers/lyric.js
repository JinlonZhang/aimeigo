/**
 * Controllers of Lyric(一句话歌词)
 * Created by allenxu on 13-12-18.
 */

var EventProxy = require('eventproxy');
var Util = require('../lib').Util;
var proxy = require('../proxy');
var Lyric = proxy.Lyric;

exports.index = function(req, res){
    Lyric.getLyricByQuery({}, {}, {}, function(err, lyricList){
        res.render('lyric', {lyricList: lyricList})
    })
}

exports.add = function(req, res){
    res.render('lyric/add');
}

exports.detail = function(req, res){
    var id = req.params.id;

    Lyric.getLyricById(id, function(err, lyric){
        res.render('lyric/detail', {lyric: lyric});
    })
}

/* API */
var api = {}
exports.api = api;

api.add = function(req,res){
    var id = req.body.id;
    var o = {
        name: req.body.name,
        lyric: req.body.lyric,
        singer: req.body.singer,
        talk: req.body.talk,
        author: req.session.user.name
    }

    if(o.name == ''){
        return res.json( Util.resJson(-1, {msg: '歌曲不能为空。'}) )
    }
    if(o.lyric == ''){
        return res.json( Util.resJson(-1, {msg: '歌词不能为空。'}) );
    }
    if(o.singer == ''){
        return res.json( Util.resJson(-1, {msg: '歌手不能为空。'}) )
    }

    if(id){
        Lyric.modifyById(id, o, function(err){
            res.json( Util.resJson(err) );
        })
    }else{
        Lyric.add(o, function(err, lyric){
            res.json( Util.resJson(0) );
        });
    }
}

api.delete = function(req, res){
    var id = req.params.id;

    Lyric.deleteById(id, function(err){
        res.json( Util.resJson(err) );
    })
}