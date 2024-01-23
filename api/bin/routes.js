const { Router } = require('express');
const { body, param } = require('express-validator');

// Importação de middlewares
const catchError = require('./app/middlewares/catchError.js');

const FormulariosController = require('./app/controllers/FormulariosController');
const QuestoesController = require('./app/controllers/QuestoesController.js');
const TiposController = require('./app/controllers/TiposController.js');
const RespostasController = require('./app/controllers/RespostasController.js');

const routes = new Router();

routes.get('/', (req, res) =>
    res.status(200).json({
        message: true,
        code: 200,
    })
);

// Rotas de formulários
routes.get('/formularios', FormulariosController.index);
routes.post(
    '/formularios',
    body(['nome', 'descricao']).escape(),
    FormulariosController.store
);

// Rotas de tipos
routes.get('/tipos', TiposController.index);

// Rotas de questões
routes.get(
    '/questoes/:formulario_id',
    param(['formulario_id']).escape(),
    QuestoesController.index
);
routes.post(
    '/questoes/:formulario_id',
    param(['formulario_id']).escape(),
    body(['questao', 'obrigatorio', 'tipo_id']).escape(),
    QuestoesController.store
);

// Rotas de respostas
routes.get(
    '/respostas/:formulario_id',
    param(['formulario_id']).escape(),
    RespostasController.index
);

routes.post('/respostas/:formulario_id', RespostasController.store);

routes.use(catchError);

module.exports = routes;
