const Post = require('./models/Post');
const User = require('./models/User');
const Address = require('./models/Address');

//One to One
User.hasOne(Address, {as: "domicilio", foreignKey: "residente_id"}); //adds a FK to Address table "userId"
Address.belongsTo(User, {as: "residente", foreignKey: "residente_id"}); 