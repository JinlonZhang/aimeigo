
var auth = require('./controllers/common').auth;
var site = require('./controllers/site');
var item = require('./controllers/item');
var user = require('./controllers/user');
var lyric = require('./controllers/lyric');
var prize = require('./controllers/prize');
var QQuser = require('./controllers/QQuser');

module.exports = function(app){
    app.get('/', site.index);

    app.get('/login', site.login);
    app.get('/logout', site.logout);
    app.get('/admin', site.admin);
    app.post('/api/sign', site.api.sign);

    app.get('/item', item.index);
    app.get('/item/add', item.add);
    app.get('/item/:id', item.detail);

    app.get('/item/:id/img', item.api.getImg);
    app.post('/api/item', auth.userRequired, item.api.add);
    app.delete('/api/item/:id', auth.userRequired, item.api.delete);

    app.post('/api/item/buy', item.api.buy);
    app.post('/api/item/share', item.api.share);

    //新增的功能
    app.post('/api/item/clear', auth.userRequired, item.api.clear);
    app.post('/api/item/:id/updateImg', auth.userRequired, item.api.updateImg)
    app.post('/api/item/setTop/:id', auth.userRequired, item.api.setTop);

    //抽奖商品
    app.get('/prize', prize.index);
    app.get('/prize/add', prize.add);
    app.get('/prize/:id', prize.detail);
    app.post('/api/prize', auth.userRequired, prize.api.add);
    //app.get('/prize/:id/img', prize.api.getImg);
    app.delete('/api/prize/:id', auth.userRequired, prize.api.delete);
    app.post('/api/prize/winner', auth.userRequired, prize.api.winner);

    //宝贝点击排行榜
    app.get('/ranking', item.ranking);

    //QQ用户列表
    app.get('/QQuser', QQuser.index)

    //用户
    app.get('/user', user.index);
    app.post('/api/user', user.api.add);
}