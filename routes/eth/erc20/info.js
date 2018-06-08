'use strict';

const express = require('express');
const router = express.Router();

router.get('/', auth.authenticate(), async function (req, res) {

    let email = req.query.email;
    let erc20TokenAddress = req.query.erc20TokenAddress;  // erc20 token address

    try{

        if(email && erc20TokenAddress){

            let info = await eth.getErc20TokenInfo(email,erc20TokenAddress);

            let ret = retcode.getSuccess();
            ret['data'] = info;
            return res.json(ret);
        }
    }
    catch (error) {   
        return res.json(retcode.getFailedTransfer());
    }

    return res.json(retcode.getWrongParameter());
});
  
module.exports = router;