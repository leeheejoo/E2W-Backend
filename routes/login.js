'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../db/users'); 
const cfg = require('../configs/jwt');
const jwt = require('jsonwebtoken');

router.post('/', function (req, res) {

    if (req.body.name && req.body.password) {

        var name = req.body.name;
        var password = req.body.password;

        var user = users.find(function (u) {
            return u.name === name && u.password === password;    
        });

        if (user) {
            var payload = {
                id: user.id,
                name: user.name
            };

            var token = jwt.sign(payload, cfg.jwtSecret, {expiresIn:"3h"});

            res.json({
                token: token
            });

        } else {
            res.sendStatus(401);
        }

    } else {
        res.sendStatus(401);
        
    }
});

module.exports = router;
