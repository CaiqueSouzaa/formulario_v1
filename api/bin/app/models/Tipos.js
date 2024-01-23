const { Sequelize, Model } = require('sequelize');

class Tipos extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                descricao: Sequelize.STRING,
            },
            {
                sequelize,
                modelName: 'Tipos',
                tableName: 'tipos',
            }
        );

        return this;
    }
}

module.exports = Tipos;
