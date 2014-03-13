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
    url:String,  //图片的淘宝链接；

    collect_total: {type: Number, default: 0},    //收藏
    share_total: {type: Number, default: 0},    //分享
    sale_total: {type: Number, default: 0},  //销量
    buy_total: {type: Number, default: 0},  //点击“去看看“的计数
    comments: [],
    date: Date
})

mongoose.model('Item', ItemSchema);