const Post = require('./models/Post');
const User = require('./models/User');
const Address = require('./models/Address');

//One to One
User.hasOne(Address, {as: "domicilio", foreignKey: "residente_id"}); //adds a FK to Address table "userId"
Address.belongsTo(User, {as: "residente", foreignKey: "residente_id"}); 


//One to Many
User.hasMany(Post, {as: "publicaciones", foreignKey: "autorId"}); //adds a FK userId to Post table
Post.belongsTo(User, {as: "autor", foreignKey: "autorId"});
