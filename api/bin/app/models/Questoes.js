const { Sequelize, Model } = require('sequelize');

class Questoes extends Model {
    static init(sequelize) {
        super.init(
            {
                formulario_id: Sequelize.INTEGER,
                questao: Sequelize.STRING,
                obrigatorio: Sequelize.BOOLEAN,
                tipo_id: Sequelize.INTEGER,
            },
            {
                sequelize,
                modelName: 'Questoes',
                tableName: 'questoes',
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

        this.belongsTo(models.Tipos, {
            foreignKey: 'tipo_id',
            key: 'id',
            as: 'tipoId',
        });
    }
}

module.exports = Questoes;
