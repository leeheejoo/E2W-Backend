'use strict';

const express = require('express');
const router = express.Router();

router.post('/', auth.authenticate(), async function (req, res) {

    let email = req.body.email;
    let erc20TokenAddress = req.body.erc20TokenAddress;  // erc20 token address
    let to = req.body.to;
    let value = req.body.value;
    let gasLimit = req.body.gasLimit;
    let gasPrice = req.body.gasPrice;
    let secret = req.body.secret;

    try{

        if(email && erc20TokenAddress && to && value && gasLimit && gasPrice && secret){

            await eth.transferForErc20Token(email,erc20TokenAddress,to,value,gasLimit,gasPrice,secret);

            let ret = retcode.getSuccess();
            return res.json(ret);
        }
    }
    catch (error) {   
        return res.json(retcode.getFailedTransfer());
    }

    return res.json(retcode.getWrongParameter());
});
  
module.exports = router;