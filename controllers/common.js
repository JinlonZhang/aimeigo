/**
 * Created by allen.xu on 13-12-17.
 */

var Util = require('../lib').Util;

var auth = {
    userRequired: function (req, res, next) {
        if (!req.session || !req.session.user) {
            return res.json( Util.resJson(-1, {msg: '请先登录。'}));
        }
        next();
    },
    userRequiredUrl: function(req, res, next){
        if (!req.session || !req.session.user) {
            return res.render( 'error', {err: '请先登录。'} );
        }
        next();
    }
}

exports.auth = auth;