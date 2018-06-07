'use strict';

const keythereum = require("keythereum");
const ethereumUtil = require("ethereumjs-util");

class eth {

    constructor() {

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
}

module.exports = new eth; 