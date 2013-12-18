
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
    app.get('/item/detail', item.detail);
    app.post('/api/item', auth.userRequired, item.api.add);

    app.get('/user', user.index);
    app.post('/api/user', user.api.add);

    //一句话歌词
    app.get('/lyric', lyric.index);
    app.get('/lyric/add', lyric.add);
    app.get('/lyric/:id', lyric.detail);
    app.post('/api/lyric', lyric.api.add);
    app.delete('/lyric/:id', lyric.api.delete);
}