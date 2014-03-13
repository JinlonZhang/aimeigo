

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var PrizeSchema = new Schema({
    name: String,   //奖品名称
    href: String,   //奖品链接
    url: String,    //图片淘宝链接
    price: String,  //奖品市场价
    score: {type:Number, default:100},  //抽奖所需积分
    date: Date,      //抽奖日期
    total:Number,   //参与抽奖的人数
    users: [],   // 抽奖人员
    winner:String   //中奖人员昵称
})

mongoose.model('Prize', PrizeSchema);