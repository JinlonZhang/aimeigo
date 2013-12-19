/**
 * Created by Administrator on 13-10-18.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    name: {type: String, index: true},
    login_name: {type:String, index: true},
    pwd: String,

    type: Number     //type=0：管理员；type=1,小编
})

mongoose.model('User', UserSchema);