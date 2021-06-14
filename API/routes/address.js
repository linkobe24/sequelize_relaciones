const { Router } = require('express');
const Address = require('../database/models/Address');
const router = Router();
const User = require('../database/models/User');



router.get('/', (req, res) => {
    Address.findAll({
        include: {
            model: User,
            as: "residente",
            attributes: ['name', 'age']
        },
        attributes: ['street']
      //only show this attributes
    }).then(addresses => {
        res.json(addresses);
    })
});


module.exports = router;