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
}

module.exports = new returnCode; 