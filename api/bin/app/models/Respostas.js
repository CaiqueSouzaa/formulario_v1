const { Sequelize, Model } = require('sequelize');

class Respostas extends Model {
    static init(sequelize) {
        super.init(
            {
                formulario_id: Sequelize.INTEGER,
                questao_id: Sequelize.INTEGER,
                resposta: Sequelize.STRING,
            },
            {
                sequelize,
                modelName: 'Respostas',
                tableName: 'respostas',
            }
        );

        return this;
    }

    static association(models) {
        this.belongsTo(models.Formularios, {
            foreignKey: 'formulario_id',
            key: 'id',
            as: 'formularioId',
        });

        this.belongsTo(models.Questoes, {
            foreignKey: 'questao_id',
            key: 'id',
            as: 'questaoId',
        });
    }
}

module.exports = Respostas;
