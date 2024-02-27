const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('toughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    password: '',
})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso ao banco de dados!')
} catch(err) {
    console.log(`não foi possivel conectar ${err}`)
}

module.exports = sequelize
