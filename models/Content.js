module.exports = function(sequelize, /*exports*/DataTypes) {

    var Content = sequelize.define('Content', {
        //"id" INTEGER PRIMARY KEY AUTOINCREMENT,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        phrase_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lang: {
            type: DataTypes.STRING(2),
            allowNull: false,
            defaultValue: 'en'
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '(empty)'
        },
        verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }

    }, {
        classMethods: {
            /*associate: function(models) {
                Content.belongsTo(models.Phrase);
            }*/
        }
    });

    return Content;
};
