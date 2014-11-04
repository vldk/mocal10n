module.exports = function(sequelize, /*exports*/DataTypes) {
    var Langs = sequelize.define('Langs', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.STRING(2),
            unique: true
        }
    });

    return Langs;
};
