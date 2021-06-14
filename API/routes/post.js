const { Router } = require('express');
const router = Router();
const Post = require('../database/models/Post');
const User = require('../database/models/User');
const { route } = require('../server');


//CRUD
//CREATE
router.post('/', (req,res) => {
    Post.create({
        title: req.body.title,
        body: req.body.body
    }).then(post => {
        res.json(post);
    });
});

//READ
router.get('/', (req, res) => {
    Post.findAll({
        include: {
            model: User,
            as: "autor",
            attributes: ["name"]
        },
        attributes: ['title', 'body'] 
    }).then( post => {
        res.json(post);
    });
});

//UPDATE /api/post/:id
router.put('/:id', (req, res) => {
    Post.update({
        title: req.body.title,
        body: req.body.body
    },{
        where: {
            id: req.params.id
        }
    }).then(post => {
        res.json(post);
    });
});

//DELETE /api/post/:id
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(post => {
        res.json(post);
    });
});




module.exports = router;