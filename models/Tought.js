const { DataTypes } = require('sequelize')

const db = require('../db/conn')

//user
const User = require('./User')

const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
})


// comando para dizer q 0 pensamento pertence ao usuario
Tought.belongsTo(User)
User.hasMany(Tought)

module.exports = Tought