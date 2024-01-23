/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('questoes', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            formulario_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'formularios', key: 'id' },
            },
            questao: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            obrigatorio: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            tipo_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'tipos', key: 'id' },
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('questoes');
    },
};
