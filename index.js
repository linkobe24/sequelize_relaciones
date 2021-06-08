const server = require('./API/server');
const sequelize = require('./API/database/db');


const PORT = process.env.PORT || 3300;

server.get('/', (req, res) => {
    res.send('Hello world');
});

//routes
server.use('/api/user', require('./API/routes/user') );
server.use('/api/post', require('./API/routes/post') );




server.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);

    //check db connection
    sequelize.authenticate().then(() => {
        console.log("Database connection enable")
    }).catch(err => {
        console.error(`An error has occurred during connection ${err}`);
    });

    //sync tables
    sequelize.sync({force: true}).then(() =>{
        console.log("Tables created");
    }).catch(err => {
        console.error(`An error has ocurred while synchronizing: ${err}`);
    });
});