'use strict';

const express = require('express');
const router = express.Router();

router.get('/', auth.authenticate(), function (req, res) {
    res.send(req.user);
    //res.json({message:'Success to authenticate'});
});
  
module.exports = router;