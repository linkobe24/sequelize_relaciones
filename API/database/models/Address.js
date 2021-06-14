const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Address extends Model {}

Address.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    street: DataTypes.STRING,
},{
    sequelize, //connection instance
    modelName: 'address',
    freezeTableName: true,
    timestamps: false
});

module.exports = Address;