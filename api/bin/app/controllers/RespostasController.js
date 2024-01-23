/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const { matchedData } = require('express-validator');
const Yup = require('yup');

const Respostas = require('../models/Respostas');
const Formularios = require('../models/Formularios');
const Questoes = require('../models/Questoes');

class RespostasController {
    async index(req, res, next) {
        const data = matchedData(req);
        const schema = Yup.object().shape({
            formulario_id: Yup.number().integer().required(),
        });

        // Verificando se o campo enviado para a API é um número
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

        // Retornando as respostas do formulario
        try {
            const responses = await Respostas.findAll({
                where: {
                    formulario_id: data.formulario_id,
                },
                attributes: ['id', 'resposta'],
                include: [
                    {
                        association: 'questaoId',
                        attributes: ['id', 'questao'],
                    },
                ],
            });

            return res.status(200).json(responses);
        } catch (err) {
            return next(err);
        }
    }

    async store(req, res, next) {
        const schema = Yup.object().shape({
            formulario_id: Yup.number().integer().required(),
        });

        // Validando se os campos encaminhados a API são validos
        try {
            await schema.validate(req.params);
        } catch (err) {
            return res.status(400).json({
                message: err.errors,
                code: 400,
            });
        }

        // Verificando se o id de formulário informado existe
        try {
            const form = await Formularios.findByPk(req.params.formulario_id);

            if (!form) {
                return res.status(404).json({
                    message: 'Id de formulário não localizado',
                    code: 404,
                });
            }
        } catch (err) {
            return next(err);
        }

        /**
         * Preciso criar um json que contenha
         * o id da questão junto a resposta.
         * Exemplo:
         *
         * "respostas": [
         *                  {
         *                      "questao_id": 1,
         *                      "resposta": "Caique Souza"
         *                  },
         *                  {
         *                      "questao_id": 2,
         *                      "resposta": "Tecnologia da Informação"
         *                  },
         *                  {
         *                      "questao_id": 3,
         *                      "resposta": "Pita Bread"
         *                  }
         *              ]
         */

        /**
         * Primeiro devo buscar por todas as perguntas
         * referentes a este formulário.
         */

        // Buscando as perguntas deste formulário
        let questions;
        try {
            questions = await Questoes.findAll({
                where: {
                    formulario_id: req.params.formulario_id,
                },
                attributes: ['id', 'questao', 'obrigatorio'],
                include: [
                    {
                        association: 'tipoId',
                        attributes: ['id', 'nome', 'descricao'],
                    },
                ],
            });
        } catch (err) {
            return next(err);
        }

        // console.log(questions);

        // Sistema que recebe a lista de itens e verifica se os campos estão ok
        function checkRespostas(respostas) {
            // const respostas = {
            //     respostas: [
            //         {
            //             questao_id: 1,
            //             resposta: 'Caique Souza',
            //         },
            //         {
            //             questao_id: 2,
            //             resposta: 'Tecnologia da Informação',
            //         },
            //         {
            //             questao_id: 3,
            //             resposta: 'Pita Bread',
            //         },
            //     ],
            // };

            // Verificando se o id das questões existem no formulário informado
            const questionsList = []; // Perguntas que existem no formulário
            const notExistList = []; // Perguntas que não existem no formulário
            const obrigatorioList = [];
            const naoRespondido = [];

            for (const i in respostas) {
                // console.log(respostas[i].questao_id);
                const question_id = respostas[i].questao_id;
                for (const o in questions) {
                    if (question_id === questions[o].dataValues.id) {
                        // console.log(questions[o].dataValues.id);
                        questionsList.push(questions[o].dataValues.id);
                    }
                }
            }

            // Verificando se a questão é obrigatória e se está respondida
            for (const q in questions) {
                // console.log(questions[q].dataValues.id);
                if (
                    !questionsList.includes(questions[q].dataValues.id) &&
                    questions[q].dataValues.obrigatorio
                ) {
                    obrigatorioList.push(questions[q].dataValues.id);
                }

                for (const r in respostas) {
                    // console.log(respostas[r]);
                    if (!respostas[r].resposta) {
                        if (
                            questionsList.includes(
                                questions[q].dataValues.id
                            ) &&
                            respostas[r].questao_id ===
                                questions[q].dataValues.id &&
                            questions[q].dataValues.obrigatorio &&
                            !respostas[r].resposta
                        ) {
                            naoRespondido.push(questions[q].dataValues.id);
                        }
                    }
                }
            }

            for (const i in respostas) {
                // console.log(respostas[i].questao_id);
                if (!questionsList.includes(respostas[i].questao_id)) {
                    notExistList.push(respostas[i].questao_id);
                }
            }
            // console.log(notExistList);

            // console.log(list);
            return {
                existem: questionsList,
                nao_existem: notExistList,
                obrigatorio: obrigatorioList,
                nao_respondido: naoRespondido,
            };
        }

        const resultado = checkRespostas(req.body.respostas);
        if (resultado.nao_existem.length > 0) {
            return res.status(400).json({
                id_nao_localizados: resultado.nao_existem,
                message: 'Id informado não localizado',
                code: 400,
            });
        }

        if (resultado.obrigatorio.length > 0) {
            return res.status(400).json({
                questoes_id: resultado.obrigatorio,
                message: 'Questões obrigatórias não respondidas',
                code: 400,
            });
        }

        if (resultado.nao_respondido.length > 0) {
            return res.status(400).json({
                questoes_id: resultado.nao_respondido,
                message: 'Questões obrigatórias não respondidas',
                code: 400,
            });
        }

        // const resulta_obrigatorio = checkObrigatorio();
        // if (resulta_obrigatorio.length > 0) {
        //     return res.status(400).json({
        //         pertuntas: resulta_obrigatorio,
        //         message: 'Perguntas obrigatórias não respondidas',
        //         code: 400,
        //     });
        // }

        // Registrando as respostas enviadas
        try {
            const idList = [];
            const body = req.body.respostas;
            const param = req.params;

            for (const i in body) {
                // console.log(body[i]);
                // console.log(param);
                const { id } = await Respostas.create({
                    formulario_id: param.formulario_id,
                    questao_id: body[i].questao_id,
                    resposta: body[i].resposta,
                });

                idList.push(id);
            }

            return res.status(201).json({
                respostas_id: idList,
                message: 'Respostas registradas',
                code: 201,
            });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new RespostasController();
