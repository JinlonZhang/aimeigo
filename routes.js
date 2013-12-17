
var site = require('./controllers/site');

module.exports = function(app){
    app.get('/', site.index);

    app.get('/admin', site.admin);
}