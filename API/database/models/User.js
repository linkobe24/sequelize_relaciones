const { Sequelize, DataTypes, Model } = require('sequelize');
const { database } = require('../config/config');
const sequelize = require('../db');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "name cannot be null"
            },
            isAlpha: {
                args: true,
                msg: "name field invalid input, only letters"
            },
            len:{
                args: [3, 255],
                msg: "name must be 3 to 255 characters long"
            },
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "email cannot be null"
            },
            isEmail: {
                args: true,
                msg: "email must be valid"
            }
        }
    },
    age: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: {
                args: true,
                msg: "age must be an integer number"
            },
            min: {
                args: 1,
                msg: "age must be >= 1"
            },
            max: {
                args: 150,
                msg: "age must be real"
            },
            //in case you want to create an special case you can create a function
            // isEven(value){
            //     if(value % 2){
            //         throw new Error("age must be an even number");
            //     }
            // }
        },
    },

    //0 regular user, 1 admin
    role: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},{
    sequelize, //connection instance
    modelName: 'user',
    timestamps: false
});

module.exports = User;