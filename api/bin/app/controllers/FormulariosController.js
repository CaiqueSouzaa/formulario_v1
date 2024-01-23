/* eslint-disable no-restricted-syntax */
const { matchedData } = require('express-validator');
const Yup = require('yup');

const Formularios = require('../models/Formularios.js');

class FormulariosController {
    async index(req, res, next) {
        // Buscando pelos formulários
        let forms;
        try {
            forms = await Formularios.findAll({
                attributes: ['id', 'nome', 'descricao'],
            });
        } catch (err) {
            return next();
        }

        return res.status(200).json(forms);
    }

    async store(req, res, next) {
        const data = matchedData(req);
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            descricao: Yup.string().matches(/^[a-zA-Z0-9. -_]+$/),
        });

        // Limpando o campo "descricao" caso não possua valor
        for (const key of Object.keys(data)) {
            if (data[key] === '') {
                data[key] = undefined;
            }
        }

        try {
            await schema.validate(data);
        } catch (err) {
            return res.status(400).json({
                message: err.errors,
                code: 400,
            });
        }

        // Verificando se o nome de formulário já não existe
        try {
            const form = await Formularios.findOne({
                where: {
                    nome: data.nome,
                },
                attributes: ['id', 'nome'],
            });

            if (form) {
                return res.status(409).json({
                    message: 'Nome de formulário já existe',
                    code: 409,
                });
            }
        } catch (err) {
            return next();
        }

        // Criando o formulário
        try {
            const { id } = await Formularios.create(data);

            return res.status(201).json({
                id,
                message: 'Formulário criado com sucesso',
                code: 201,
            });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new FormulariosController();
