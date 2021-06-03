const server = require('./API/server');
const sequelize = require('./API/database/db');

const PORT = process.env.PORT || 3300;

server.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);

    //check db connection
    sequelize.authenticate().then(() => {
        console.log("Database connection enable")
    }).catch(err => {
        console.error(`An error has occurred during connection ${err}`);
    });
});

server.get('/', (req, res) => {
    res.send('Hello world');
});
