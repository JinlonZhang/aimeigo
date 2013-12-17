/**
 * Created with JetBrains WebStorm.
 * User: allenxu
 * Date: 13-9-16
 * Time: 上午11:22
 * To change this template use File | Settings | File Templates.
 */
var Util = require('../lib').Util;
var proxy = require('../proxy');
var Item = proxy.Item;
var User = proxy.User;

User.initAdmin({
    name: '管理员',
    login_name: 'admin@aimeigo.cn',
    pwd: Util.md5('1qazxsw2')

});

exports.index = function(req, res){
    res.render('index');
}

exports.admin = function(req, res){
    res.render('admin');
}

exports.login = function(req, res){
    res.render('login');
}

/**
 * 登录。ajax请求。
 * @param req
 * @param res
 */
exports.sign = function(req, res){
    var o = {
        login_name: req.body.login_name,
        pwd: req.body.pwd
    }
    User.getUserByLoginName(o.login_name, function(err, user){
        if(!user){
            return res.json( Util.resJson(-1, {msg: '用户不存在！'}) )
        }

        o.pwd = Util.md5(o.pwd);
        if(o.pwd != user.pwd){
            return res.json( Util.resJson(-1, {msg: '用户名或密码错误！'}))
        }

        req.session.user = user;
        res.json( Util.resJson(0) );
    })

}
