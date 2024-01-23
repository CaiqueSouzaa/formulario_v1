const { Sequelize, Model } = require('sequelize');

class Formularios extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                descricao: Sequelize.STRING,
            },
            {
                sequelize,
                modelName: 'Formularios',
                tableName: 'formularios',
            }
        );

        return this;
    }
}

module.exports = Formularios;
