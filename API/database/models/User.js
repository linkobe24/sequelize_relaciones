const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize, //connection instance
    modelName: 'user'
});

module.exports = User;