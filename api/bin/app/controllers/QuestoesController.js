const { matchedData } = require('express-validator');
const Yup = require('yup');

const Questoes = require('../models/Questoes.js');
const Formularios = require('../models/Formularios.js');
const Tipos = require('../models/Tipos.js');

class QuestoesController {
    async index(req, res, next) {
        const data = matchedData(req);
        const schema = Yup.object().shape({
            formulario_id: Yup.number().integer().required(),
        });

        // Verificando o id de formulário informado corresponde ao esperado
        try {
            await schema.validate(data);
        } catch (err) {
            return res.status(400).json({
                message: err.errors,
                code: 400,
            });
        }

        // Verificando se o id de formulário informado existe
        try {
            const form = await Formularios.findByPk(data.formulario_id);

            if (!form) {
                return res.status(404).json({
                    message: 'Id de formulário não localizado',
                    code: 404,
                });
            }
        } catch (err) {
            return next(err);
        }

        // Buscando as questões do formulário
        try {
            const questoes = await Questoes.findAll({
                where: {
                    formulario_id: data.formulario_id,
                },
                attributes: ['id', 'questao', 'obrigatorio'],
                include: [
                    {
                        association: 'formularioId',
                        attributes: ['nome'],
                    },
                    {
                        association: 'tipoId',
                        attributes: ['nome', 'descricao'],
                    },
                ],
            });

            return res.status(200).json(questoes);
        } catch (err) {
            return next(err);
        }
    }

    async store(req, res, next) {
        const data = matchedData(req);
        const schema = Yup.object().shape({
            formulario_id: Yup.number().integer().required(),
            questao: Yup.string().required(),
            obrigatorio: Yup.boolean().required(),
            tipo_id: Yup.number().integer().required(),
        });

        // Validando se os campos enviados a API são validos
        try {
            await schema.validate(data);
        } catch (err) {
            return res.status(400).json({
                message: err.errors,
                code: 400,
            });
        }

        // Verificando se o id de formulário informado existe
        try {
            const form = await Formularios.findByPk(data.formulario_id);

            if (!form) {
                return res.status(404).json({
                    message: 'Id de formulário não localizado',
                    code: 404,
                });
            }
        } catch (err) {
            return next(err);
        }

        // Verificando se o id de tipo informado existe
        try {
            const type = await Tipos.findByPk(data.tipo_id);

            if (!type) {
                return res.status(404).json({
                    message: 'Id de tipo não localizado',
                    code: 404,
                });
            }
        } catch (err) {
            return next(err);
        }

        // Registrando a questão no banco de dados
        try {
            const { id } = await Questoes.create(data);

            return res.status(201).json({
                id,
                message: 'Questão criada com sucesso',
                code: 201,
            });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new QuestoesController();
