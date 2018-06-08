'use strict';

const keythereum = require("keythereum");
const ethereumUtil = require("ethereumjs-util");
const web3 = require('web3');
const ethTx = require('ethereumjs-tx');

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
    
                return this._web3.utils.fromWei(wei,'ether');
            }
        }
        catch (error) {   
            throw error;
        }

        return undefined;
    }

    async transfer(email, to, value, data, gasLimit, gasPrice, secret) {

        try{

            let user = users.get(email);
            
            if(user){

                let privateKey = users.decrypt(user.privatekey,secret);
                //console.log(privateKey);
                let txValue = this._web3.utils.numberToHex(this._web3.utils.toWei(value.toString(), 'ether'));
                let txData;

                if(data)
                    txData = this._web3.utils.asciiToHex(data); 

                let nonce = await this._web3.eth.getTransactionCount(user.address);

                let rawTx = {
                    nonce: this._web3.utils.numberToHex(nonce),                                  
                    gasPrice: this._web3.utils.numberToHex(gasPrice), 
                    gasLimit: this._web3.utils.numberToHex(gasLimit),
                    to: to,
                    value: txValue,
                    data: txData
                }

                let tx = new ethTx(rawTx);
                tx.sign(ethereumUtil.toBuffer(privateKey)); 
                console.log(ethereumUtil.bufferToHex(tx.from));
                let serializedTx = tx.serialize();

                this._web3.eth.sendSignedTransaction(ethereumUtil.bufferToHex(serializedTx)).on('receipt', (res) => {
                    // callback after transaction write to block.
                    console.log(res);
                }); 
  
            }
        }
        catch (error) {   
            throw error;
        }

    }

    async getTransactionHistory(email) {

        try{

            let user = users.get(email);
            
            if(user){

                let blockCount = 100;
                let endBlockNumber = await this._web3.eth.getBlockNumber();
                let startBlockNumber = endBlockNumber - blockCount;

                if(startBlockNumber < 1)
                    startBlockNumber = 1;

                let ts = [];
                let tsCount = 1;

                //console.log("Using endBlockNumber: " + endBlockNumber);
                //console.log("Using startBlockNumber: " + startBlockNumber);
                //console.log("Searching for transactions to/from address \"" + user.address + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);
                
                for (var i = endBlockNumber; i >= startBlockNumber; i--) {

                    if(tsCount > 30)
                        break;
               
                    var block = await this._web3.eth.getBlock(i, true);

                    if (block != null && block.transactions != null) {

                        block.transactions.forEach( function(e) {

                            if (user.address == e.from.toLowerCase()|| user.address == e.to.toLowerCase()) {

                                ts.push(e);
                                tsCount++;

                                /*
                                console.log("  tx hash          : " + e.hash + "\n"
                                    + "   nonce           : " + e.nonce + "\n"
                                    + "   blockHash       : " + e.blockHash + "\n"
                                    + "   blockNumber     : " + e.blockNumber + "\n"
                                    + "   transactionIndex: " + e.transactionIndex + "\n"
                                    + "   from            : " + e.from + "\n" 
                                    + "   to              : " + e.to + "\n"
                                    + "   value           : " + e.value + "\n"
                                    + "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
                                    + "   gasPrice        : " + e.gasPrice + "\n"
                                    + "   gas             : " + e.gas + "\n"
                                    + "   input           : " + e.input);
                                */
                            }
                        })
                    }
                }

                return ts;
            }
        }
        catch (error) {   
            throw error;
        }

        return undefined;
    }
}

module.exports = new eth; 