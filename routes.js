
var site = require('./controllers/site');
var item = require('./controllers/item');

module.exports = function(app){
    app.get('/', site.index);

    app.get('/login', site.login);
    app.get('/logout', site.logout);
    app.post('/sign', site.sign);

    app.get('/admin', site.admin);

    app.get('/item', item.index);
    app.get('/item/detail', item.detail);
    app.post('/api/item', item.api.add);
}