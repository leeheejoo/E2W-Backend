'use strict';

const users = require('../db/users'); 
const cfg = require('../configs/jwt');
const jwt = require('jsonwebtoken');

class account {

    login(email, password) {

        if (email && password) {

            let user = users.find(function (u) {
                return u.email === email && u.password === password;    
            });
    
            if (user) {

                let payload = {
                    id: user.id,
                    email: user.email
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