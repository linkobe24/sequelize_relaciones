const { Router } = require('express');
const Address = require('../database/models/Address');
const Post = require('../database/models/Post');
const router = Router();
const User = require('../database/models/User');

// //CREATE  /api/user
// router.post('/', (req, res) => {
//     User.create({
//         name: req.body.name,
//         email: req.body.email,
//         age: req.body.age
//     }).then(user => {
//         //modification to add an address directly with postman
//         Address.create({ street: req.body.street}).then(street => {
//             user.setDomicilio(street).then(() => {
//                 res.json(user);
//             });
//         });
//     }).catch(err => {
//         res.json(err)  
//     })
// });

//CREATE  /api/user
router.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        domicilio :{
            street: req.body.street
        }
    }, {
        include: 'domicilio'
    }).then(user => {
       res.json(user)
    }).catch(err => {
        res.json(err)  
    })
});

//READ show all users
router.get('/', (req, res) => {
    User.findAll({
        include: [{
            model: Address,
            as: "domicilio",
            attributes: ['street']
        }, {
            model: Post,
            as: "publicaciones",
            attributes: ['title', 'body'],
            where: {title: "Foo"}
        }],
        attributes: ['name', 'age'] //only show this attributes
    }).then(users => {
        res.json(users);
    })
});

//show domicilio /api/user/:id/domicilio
router.get('/:id/domicilio', (req, res) => {
    User.findByPk(req.params.id).then( user => {
        user.getDomicilio().then( domicilio => {
            res.json(domicilio);
        });
    });
});

//show publicaciones /api/user/:id/publicaciones
router.get('/:id/publicaciones', (req, res) => {
    User.findByPk(req.params.id).then( user => {
        user.getPublicaciones().then( publicaciones => {
            res.json(publicaciones);
        });
    });
});


module.exports = router;