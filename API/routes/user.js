const { Router } = require('express');
const router = Router();
const User = require('../database/models/User');

//CREATE  /api/user
router.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }).then(user => {
        res.json(user)
    }).catch(err => {
        res.json(err)  
    })
});


module.exports = router;