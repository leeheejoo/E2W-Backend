'use strict';

const express = require('express');
const router = express.Router();

router.get('/', auth.authenticate(), async function (req, res) {

    let email = req.query.email;
    let unit = req.query.unit;

    try{

        if(email){

            let balance = await eth.getBalance(email,unit);

            if(balance){
                
                let ret = retcode.getSuccess();
                
                ret['data'] = {
                    balance:balance
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