/**
 * Created by Administrator on 13-10-19.
 */
var crypto = require('crypto');
var _ = require('underscore');
var moment = require('moment');

moment.lang('zh-cn');
/**
 * api接口返回的JSON结构
 * resJson(0, {msg: '保存成功'});
 * resJson(-1, {msg: '用户已存在'});
 * resJson(err, {list: groupList});
 */
exports.resJson = function(status, o){
    var s = 0, t = {};
    if(typeof status == 'number'){
        s = status;
    }else{
        if(status == null){
            s = 0;
        }else{
            s = -1;
            t.msg = '未知错误';
            t.err = status;
        }
    }
    t.code = s;

    return _.extend(t, o ? o : {});
}

/**
 * 加密
 */
exports.md5 = function(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}

/**
 * 时间处理。
 * 今天的时间显示 5小时之前
 * 3天以内的时间显示 2天前 20:12
 * 超过3天的 2013-07-08 20:12
 */
exports.dateFormat = function(date){
    var now = moment(), before = moment(date), str = '';
    var diff = now.diff(before, 'day');

//    if(diff == 0){
//        str = before.from(now);
//    }else if(diff < 3){
//        str = before.from(now) + " " + before.format('HH:mm');
//    }else{
//        str = before.format('YYYY-MM-DD HH:mm');
//    }
    str = before.format('YYYY-MM-DD');
    return str;
}

/**
 * 数组里是否包含o元素
 * @param str
 * @returns {boolean}
 */
Array.prototype.has = function(o){
    var len = this.length, f = false;
    while(len--){
        if(this[len] == o){
            f = true;
            break;
        }
    }
    return f;
}

/**
 * 数据库、文件操作的错误处理
 * @param err
 * @param res
 * @returns {*|String}
 */
exports.epFail = function(err, res){
    return res.render('error', {err: err});
}