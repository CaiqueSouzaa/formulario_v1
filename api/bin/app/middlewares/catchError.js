const chalk = require('chalk');

module.exports = (err, req, res, next) => {
    console.error(chalk.bgRed(err.stack));

    return res.status(500).json({
        message: 'Ocorreu um erro interno no servidor',
        code: 500,
    });
};
