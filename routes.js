
var site = require('./controllers/site');

module.exports = function(app){
    app.get('/', site.index);

    app.get('/login', site.login);
    app.post('/sign', site.sign);

    app.get('/admin', site.admin);
}