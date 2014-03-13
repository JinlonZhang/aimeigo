/**
 * Created with JetBrains WebStorm.
 * User: allenxu
 * Date: 13-9-15
 * Time: 上午8:49
 * To change this template use File | Settings | File Templates.
 */
var dev = 1, o;

var devConfig = {
    db: 'mongodb://127.0.0.1/aimeigo',
    dbName: 'aimeigo',
    host: 'localhost',
    cookieSecret: 'aimeigo',
    uploadDir: '../upload/',
    uploadItemDir: '../upload/item/',
    uri:'localhost:3000',
    avatarDir:'../upload/avatar/',
    txt:'../upload/txt/'
}
var onlineConfig = {
    db: 'mongodb://10.232.50.80/aimeigo',
    dbName: 'aimeigo',
    host: '10.232.50.80',
    cookieSecret: 'aimeigo',
    uploadDir: '/data/',
    uploadItemDir: '/data/item/',
    uri:'img.aimeigo.cn',
    avatarDir:'/avatar/',
    txt:'/data/txt/'
}

if(dev == 1){
    o = devConfig
}else{
    o = onlineConfig
}
o.port = 3000;
o.dbName = 'aimeigo';
o.cookieSecret = 'aimeigo';
module.exports = o;