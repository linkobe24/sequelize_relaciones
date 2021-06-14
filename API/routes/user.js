const { Router } = require('express');
const Address = require('../database/models/Address');
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

router.get('/', (req, res) => {
    User.findAll({
        include: {
            model: Address,
            as: "domicilio",
            attributes: ['street']
        },
        attributes: ['name', 'age'] //only show this attributes
    }).then(users => {
        res.json(users);
    })
});


module.exports = router;