
var site = require('./controllers/site');

module.exports = function(app){
    app.get('/', site.index);

    app.get('/login', site.login);
    app.get('/logout', site.logout);
    app.post('/sign', site.sign);

    app.get('/admin', site.admin);

    app.post('/add', site.add);

    app.delete('/item/:id', site.del);
}