const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: DataTypes.STRING,
    body: DataTypes.TEXT
},{
    sequelize, //connection instance
    modelName: 'post',
    timestamps: false
});

module.exports = Post;