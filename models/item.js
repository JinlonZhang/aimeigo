/**
 * Created by allen.xu on 13-10-18.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ItemSchema = new Schema({
    type: {type:Number, default:1}, //类别
    name: String,
    href: String,
    img: String,
    price: String,
    price2: String,
    talk: String,
    comments: []
})

mongoose.model('Item', ItemSchema);