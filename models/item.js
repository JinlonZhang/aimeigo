/**
 * Created by Administrator on 13-10-18.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ItemSchema = new Schema({
    type: Number, //类别
    name: String,
    href: String,
    img: String,
    price: String,
    discount: String,
    comments: String


})

mongoose.model('Item', ItemSchema);