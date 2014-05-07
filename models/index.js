/**
 * Created by Administrator on 13-10-18.
 */

var mongoose = require('mongoose');
var config = require('../config');


mongoose.connect(config.db, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});



// models
require('./item');
require('./user');
require('./prize');
require('./QQuser');
require('./tag');

exports.Item = mongoose.model('Item');
exports.User = mongoose.model('User');
exports.Prize = mongoose.model('Prize');
exports.QQUser = mongoose.model('QQUser');
exports.Tag = mongoose.model('Tag');