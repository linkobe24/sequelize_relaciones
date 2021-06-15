const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Band extends Model {}

Band.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING
},{
    sequelize, //connection instance
    modelName: 'band',
    timestamps: false
});

module.exports = Band;