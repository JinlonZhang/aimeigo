
var auth = require('./controllers/common').auth;
var site = require('./controllers/site');
var item = require('./controllers/item');
var user = require('./controllers/user');
var lyric = require('./controllers/lyric');

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

    app.post('/api/item/clear', auth.userRequired, item.api.clear)

    app.post('/api/item/buy', item.api.buy);
    app.post('/api/item/share', item.api.share);

    //用户
    app.get('/user', user.index);
    app.post('/api/user', user.api.add);

    //一句话歌词
    app.get('/lyric', lyric.index);
    app.get('/lyric/add', lyric.add);
    app.get('/lyric/:id', lyric.detail);
    app.post('/api/lyric', lyric.api.add);
    app.delete('/lyric/:id', lyric.api.delete);
}