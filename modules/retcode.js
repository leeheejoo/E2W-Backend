'use strict';

class returnCode {

    getSuccess() {
        return {
            code : 0,
            msg : `success`
        }
    }

    getFailedAuthenticate() {
        return {
            code : 1,
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
}

module.exports = new returnCode; 