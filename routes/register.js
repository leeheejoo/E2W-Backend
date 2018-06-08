'use strict';

const express = require('express');
const router = express.Router();

router.post('/', async function (req, res) {
    
    let ret = await account.register(req.body.email, req.body.password, req.body.secret);
    res.json(ret);

});

module.exports = router;
