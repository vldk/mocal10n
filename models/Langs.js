module.exports = function(sequelize, /*exports*/DataTypes) {
    var Langs = sequelize.define('Langs', {
        code: {
            type: DataTypes.STRING(2),
            unique: true,
            primaryKey: true
        }
    });

    return Langs;
};
