const Sequelize = require('sequelize')

const connection = new Sequelize('guia_pergunta', 'root', 'root', {
    host: "127.0.0.1",
    dialect: 'mysql',
})

module.exports = connection
