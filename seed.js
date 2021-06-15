const sequelize = require('./API/database/db');
const Post = require('./API/database/models/Post');
const User = require('./API/database/models/User');
const Address = require('./API/database/models/Address');
const Band = require('./API/database/models/Band');
require('./API/database/associations');

//Users

const users = [
    { name: "Manuel", email: "manuel@hotmail.com", age: 31, role: 1},
    { name: "Kobe", email: "kobe@hotmail.com", age: 45, role: 0},
    { name: "Pepe", email: "pepe@hotmail.com", age: 90, role: 0},
];

//Addresses
const addresses = [
    { street: "22 de diciembre", residente_id: 1},
    { street: "orange county", residente_id: 2},
    { street: "calle de la vida", residente_id: 3},
];

//Posts
const posts = [
    { title: "Foo", body: "Bar 1", autorId: 1},
    { title: "Foo", body: "Bar 2", autorId: 1},
    { title: "Title", body: "Bar 3", autorId: 1},
    { title: "Yo que se", body: "Bar 4", autorId: 1},
    { title: "Me da igual", body: "Bar 5", autorId: 2},
    { title: "Todo", body: "Bar 6", autorId: 2},
    { title: "Foo", body: "Bar 7", autorId: 3},
];

//this creates an error using MSSQL, apparently the models are not filled in order, and the foreign key is not being defined in time.

// sequelize.sync({ force: false}).then(() => {
//     console.log("Data synchronized");
// }).then(() => {
//     //fill users
//     users.forEach(user => User.create(user));
// }).then(() => {
//     //fill addresses
//     addresses.forEach(address => Address.create(address));
// }).then(() => {
//     //fill posts
//     posts.forEach(post => Post.create(post));
// });

//with this approach you fill one model at a time so the foreign Key is present when needed
sequelize.sync({force: true}).then(()=>{
    users.forEach(user => User.create(user));
}).then(() => {
    console.log("users filled")
});

sequelize.sync({force: true}).then(()=>{
    addresses.forEach(address => Address.create(address));
}).then(() => {
    console.log("addresses filled")
});

sequelize.sync({force: true}).then(()=>{
    posts.forEach(post => Post.create(post));
}).then(() => {
    console.log("posts filled")
});

//create a band with users, users are added to the table users in the db
sequelize.sync({force: true}).then( async () => {
    let band1 = await Band.create({
        name: "The beatles",
        type: "Rock",
        users: [
            {name: "John", age: 27, email: "john@hotmail.com"},
            {name: "Paul", age: 27, email: "paul@hotmail.com"},
        ]
    }, {
        include: "users"
    });

    //another way to create band with users using addUsers
    let user1 = await User.create({name: "Kurt", age: 27, email: "kurt@hotmail.com"});
    let user2 = await User.create({name: "Dave", age: 27, email: "dave@hotmail.com"});

    let band2 = await Band.create({
        name: "Nirvana",
        type: "Grunge"
    });

    //band2.addUsers([user1, user2]);
    band2.addUser(user1);       //add users separately
    band2.addUser(user2);

    //set a band to a new user
    let user3 = await User.create({name: "Chester", age: 40, email: "chester@hotmail.com"});
    user3.setBands([band1, band2])


}).then(() => {
    console.log("bands created");
})


