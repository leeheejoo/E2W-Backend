'use strict';

const jwt = require('jsonwebtoken');

class account {

    async login(email, password) {

        if (email && password) {

            let user = await users.get(email);
    
            if (user && user.password === password) {

                let payload = {
                    email: user.email
                };
    
                let token = jwt.sign(payload, config.jwtSecret, {expiresIn:"30m"});
                let decoded = jwt.decode(token);

                let ret = retcode.getSuccess();
                ret['data'] = {
                    'token' : token,
                    'exp' : decoded.exp,
                    'email' : email,
                    'ethAddress' : user.eth.address
                }
    
                return ret;
    
            } 
        } 
        
        return retcode.getFailedLogin(); 
    }

    async register(email, password, secret) {

        if (email && password && secret) {

            let ret = await users.register(email,password,secret);
            return ret.retcode;
        }

        return retcode.getFailedRegister();  
    }
}

module.exports = new account; 