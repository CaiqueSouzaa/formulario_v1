/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('respostas', {
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
            questao_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'questoes', key: 'id' },
            },
            resposta: {
                type: Sequelize.STRING,
                allowNull: true,
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
        await queryInterface.dropTable('respostas');
    },
};
