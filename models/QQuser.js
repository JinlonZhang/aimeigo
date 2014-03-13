/**
 * Package:
 * Class:
 * @description:
 * @author: Zhen.li
 * @Date: 2014-03-11 上午9:50
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var QQUserSchema = new Schema({
    openid: String,
    nickname: String,
    figureurl: String,
    score: {type: Number, default: 300},
    signDays: {type: Number, default: 0},
    signStatus: {type:Boolean, default: false},
    lastSign: {type:Date, default: null},
    gifts:[] //参与抽奖的奖品名称，抽取次数
})

mongoose.model('QQUser', QQUserSchema);
