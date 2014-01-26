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
    avatarDir:'../upload/avatar/'
}
var onlineConfig = {
    db: 'mongodb://10.221.152.189/aimeigo',
    dbName: 'aimeigo',
    host: '10.221.152.189',
    cookieSecret: 'aimeigo',
    uploadDir: '/data/',
    uploadItemDir: '/data/item/',
    avatarDir:'/data/avatar/'
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