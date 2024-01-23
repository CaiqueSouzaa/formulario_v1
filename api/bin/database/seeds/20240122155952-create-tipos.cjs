/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(
            'Tipos',
            [
                {
                    nome: 'string',
                    descricao: 'Tipo especifico para textos',
                    created_at: new Date(),
                },
                {
                    nome: 'number',
                    descricao: 'Tipo especifico para números',
                    created_at: new Date(),
                },
                {
                    nome: 'boolean',
                    descricao: 'Tipo especifico para verdadeiro ou falso',
                    created_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('Tipos', null, {});
    },
};
