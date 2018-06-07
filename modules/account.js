'use strict';

const jwt = require('jsonwebtoken');

class account {

    login(email, password) {

        if (email && password) {

            let user = users.get(email);
    
            if (user && user.password === password) {

                let payload = {
                    id: user.id,
                    email: user.email
                };
    
                let token = jwt.sign(payload, config.jwtSecret, {expiresIn:"30m"});

                let ret = retcode.getSuccess();
                ret['token'] = token;
    
                return ret;
    
            } 
        } 
        
        return retcode.getFailedLogin(); 
    }

    register(email, password, secret) {

        if (email && password && secret) {

            let ret = users.register(email,password,secret);
            return ret.retcode;
        }

        return retcode.getFailedRegister();  
    }
}

module.exports = new account; 