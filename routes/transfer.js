'use strict';

const express = require('express');
const router = express.Router();

router.post('/', auth.authenticate(), async function (req, res) {

    let email = req.body.email;
    let to = req.body.to;
    let value = req.body.value;
    let data = req.body.data;
    let gasLimit = req.body.gasLimit;
    let gasPrice = req.body.gasPrice;
    let secret = req.body.secret;

    try{

        if(email && to && value && gasLimit && gasPrice && secret){

            await eth.transfer(email,to,value,data,gasLimit,gasPrice,secret);

            let ret = retcode.getSuccess();
            return res.json(ret);
        }
    }
    catch (error) {   
        return res.json(retcode.getAbnormalConditionEthereumNode());
    }

    return res.json(retcode.getWrongParameter());
});
  
module.exports = router;