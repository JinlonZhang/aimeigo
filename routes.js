
var auth = require('./controllers/common').auth;
var site = require('./controllers/site');
var item = require('./controllers/item');
var user = require('./controllers/user');

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
    //test
}