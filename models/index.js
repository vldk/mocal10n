
var fs          = require('fs')
    , path      = require('path')
    , Sequelize = require('sequelize')
    , lodash    = require('lodash')
    , cfg       = require('./../config').db
    , db        = {}
    , sequelize = new Sequelize(cfg.dbName, cfg.user, cfg.pass, {
        dialect: cfg.driver
        , storage: cfg.path
//        protocol: 'postgres',
//        port: cfg.port
    })

;

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        //console.log(path.join(__dirname, file));
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);

