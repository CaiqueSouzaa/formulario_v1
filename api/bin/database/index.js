const { Sequelize } = require('sequelize');

const databaseConfig = require('../config/database.cjs');
const Formularios = require('../app/models/Formularios.js');
const Tipos = require('../app/models/Tipos.js');
const Questoes = require('../app/models/Questoes.js');
const Respostas = require('../app/models/Respostas.js');

const models = [Formularios, Tipos, Questoes, Respostas];

class Database {
    constructor() {
        this.connection = new Sequelize(databaseConfig);

        this.init();
    }

    init() {
        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.association &&
                    model.association(this.connection.models)
            );
    }
}

module.exports = new Database();
