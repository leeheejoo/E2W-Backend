'use strict';

const users = require('../db/users'); 
const cfg = require('../configs/jwt');
const jwt = require('jsonwebtoken');

class account {

    login(name, password) {

        if (name && password) {

            let user = users.find(function (u) {
                return u.name === name && u.password === password;    
            });
    
            if (user) {

                let payload = {
                    id: user.id,
                    name: user.name
                };
    
                let token = jwt.sign(payload, cfg.jwtSecret, {expiresIn:"30m"});

                let ret = retcode.getSuccess();
                ret['token'] = token;
    
                return ret;
    
            } 
        } 
        
        return retcode.getFailedLogin(); 
    }
}

module.exports = new account; 