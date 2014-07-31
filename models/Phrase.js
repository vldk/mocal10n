module.exports = function(sequelize, /*exports*/DataTypes) {

    var Phrase = sequelize.define('Phrase', {
        //"id" INTEGER PRIMARY KEY AUTOINCREMENT,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        group_id: {
            type: DataTypes.INTEGER,
        },
        phrase: {
            type: DataTypes.TEXT
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        classMethods: {
            associate: function(models) {
                Phrase.belongsTo(models.Group, { as: 'group_id', foreignKey: 'group_id', constraints: true});
                Phrase.hasMany(models.Content, {as: 'id', foreignKey: 'phrase_id'});
            }
        }
    });

    return Phrase;
};
