'use strict';

const express = require('express');
const router = express.Router();

router.post('/', async function (req, res) {
    
    let ret = await account.login(req.body.email, req.body.password);
    res.json(ret);

});

module.exports = router;
