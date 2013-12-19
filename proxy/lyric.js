/**
 * Proxy of lyric(一句话歌词)
 * Created by allenxu on 13-12-18.
 */

var models = require('../models');
var Lyric = models.Lyric;

exports.add = function(o, fn){
    var lyric = new Lyric();

    lyric.name = o.name;
    lyric.lyric = o.lyric;
    lyric.singer = o.singer;
    lyric.talk = o.talk;
    lyric.author = o.author;

    lyric.save(fn);
}

exports.modifyById = function(id, o, fn){
    Lyric.findByIdAndUpdate(id, {$set: o}, fn);
}

exports.deleteById = function(id, fn){
    Lyric.findByIdAndRemove(id, fn);
}

exports.getLyricByQuery = function(query, field, opt, fn){
    Lyric.find(query, field, opt, fn);
}

exports.getLyricById = function(id, fn){
    Lyric.findOne({_id: id}, fn);
}

