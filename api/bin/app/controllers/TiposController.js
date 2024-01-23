const Tipos = require('../models/Tipos.js');

class TiposController {
    async index(req, res, next) {
        try {
            const tipos = await Tipos.findAll({
                attributes: ['id', 'nome', 'descricao'],
            });

            return res.status(200).json(tipos);
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new TiposController();
