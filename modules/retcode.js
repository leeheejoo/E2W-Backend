'use strict';

class returnCode {

    getSuccess() {
        return {
            code : 0,
            msg : `success`
        }
    }

    getWrongParameter() {
        return {
            code : 1,
            msg : `parameter is wrong.`
        }
    }

    getFailedAuthenticate() {
        return {
            code : 2,
            msg : `authenticate failed.`
        }
    }

    // account
    getFailedLogin() {
        return {
            code : 101,
            msg : `login failed.`
        }
    }

    getFailedRegister() {
        return {
            code : 102,
            msg : `register failed.`
        }
    }

    getFailedRegisterByDuplicateEmail() {
        return {
            code : 103,
            msg : `register failed because there is duplicated email.`
        }
    }

    // ethereum 

    getAbnormalConditionEthereumNode() {
        return {
            code : 201,
            msg : `ethereum node is abnormal condition.`
        }
    }

    getFailedTransfer() {
        return {
            code : 202,
            msg : `transfer failed to ethereum.`
        }
    }
}

module.exports = new returnCode; 