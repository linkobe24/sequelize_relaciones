const { Router } = require('express');
const router = Router();
const User = require('../database/models/User');

router.get('/', (req,res) => {
    res.send("users")
})

module.exports = router;