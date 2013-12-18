/**
 * Models of lyric(一句话歌词)
 * Created by allenxu on 13-12-18.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var LyricSchema = new Schema({
    lyric: String,  //歌词
    name: String,   //歌曲名称
    singer: String, //歌手
    talk: String,   //小编点评



    author: String  //提供者。可以是网友投稿
})

mongoose.model('Lyric', LyricSchema);