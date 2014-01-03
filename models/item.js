/**
 * Created by allen.xu on 13-10-18.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ItemSchema = new Schema({
    type: {type: String, index: true},  //类别
    name: String,
    href: String,
    price: String,
    price2: String,
    talk: String,

    collect_total: {type: Number, default: 0},    //收藏计数
    share_total: {type: Number, default: 0},    //分享计数
    buy_total: {type: Number, default: 0},  //点击“去看看“的计数
    comments: [],

    date: Date
})

mongoose.model('Item', ItemSchema);