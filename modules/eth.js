'use strict';

const keythereum = require("keythereum");
const ethereumUtil = require("ethereumjs-util");
const web3 = require('web3');

class eth {

    constructor() {
        this._web3 = new web3(new web3.providers.HttpProvider(config.ethHttpProvider));
    }

    generateAddress(secret) {

        let ret = {};

        // piravte key
        let params = { keyBytes: 32, ivBytes: 16 };       
        let pk = keythereum.create(params);

        if(ethereumUtil.isValidPrivate(pk.privateKey)) {
            ret['privatekey'] = ethereumUtil.bufferToHex(pk.privateKey);
            //console.log(`privatekey: ` + ret.pravatekey);
        }
        else {
            return undefined;
        }

        // public key
        let publicKey = ethereumUtil.privateToPublic(pk.privateKey);
        if(ethereumUtil.isValidPublic(publicKey)) {
            ret['publickey'] = ethereumUtil.bufferToHex(publicKey);
            //console.log(`publickey: ` + ret.publickey);
        }
        else {
            return undefined;
        }

        // address
        let address = ethereumUtil.pubToAddress(publicKey);
        let hexAddress = ethereumUtil.bufferToHex(address);
        if(ethereumUtil.isValidAddress(hexAddress)) {
            ret['address'] = hexAddress;
            //console.log(`address: ` + ret.address);
        }
        else {
            return undefined;
        }

        return ret;
    }

    async getBalance(email, unit) {

        try{

            let user = users.get(email);
            
            if(user){

                let wei = await this._web3.eth.getBalance(user.address);
    
                if(unit === 'wei')
                    return wei;
    
                return await this._web3.utils.fromWei(wei,'ether');
            }
        }
        catch (error) {   
            return undefined;
        }

        return undefined;
    }
}

module.exports = new eth; 