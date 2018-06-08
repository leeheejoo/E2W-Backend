'use strict';

const express = require('express');
const router = express.Router();

router.get('/', auth.authenticate(), async function (req, res) {

    let email = req.query.email;

    try{

        if(email){

            let user = await users.get(email);

            if(user){
                
                let ret = retcode.getSuccess();
                
                ret['data'] = {
                    address:user.eth.address
                };
        
                return res.json(ret);
            }
        }
    }
    catch (error) {   
        return res.json(retcode.getAbnormalConditionEthereumNode());
    }

    return res.json(retcode.getWrongParameter());
});
  
module.exports = router;