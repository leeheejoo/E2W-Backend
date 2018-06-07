'use strict';

var crypto = require("crypto-js");

class users {

	constructor() {
		this._users = [];
		this._count = 0;
/*
		this._users = [{
			id:1,
			email:'test@mail.com',
			password:'1111',
			address:"0x22c8c1e6e2ae78c0ca456443f34b92fd17cbdcee",
			privatekey:"0x27bb1c18c6d0d1a9adb3028f8f1e16a122489a9e76accf4973d37d0729b0fbd3",
			publickey:"0xdcb52cac745488c1104960fb4f2a81f37ed84b0ac3d0863161a4a29397960e7fc134b229eade8273f7118b2d03fc7363b467f4e06d4fd38b1d962742a9285b30"
		}];

		this._count = 1;
*/
	}

	encrypt(data, secret) {
		let encrypted = crypto.AES.encrypt(data,secret).toString();
		//console.log(encrypted);
		return encrypted;
	}

	decrypt(data, secret) {
		let decyrpted  = crypto.AES.decrypt(data,secret);
		//console.log(decyrpted.toString(crypto.enc.Utf8));
		return decyrpted.toString(crypto.enc.Utf8);
	}

	register(email, password, secret) {

		if(this.get(email)){
			return { result : false, retcode : retcode.getFailedRegisterByDuplicateEmail() };
		}

		let address = eth.generateAddress(secret);
		//console.log(address);
		//console.log(address.privatekey);

		let encryptedPrivateKey = this.encrypt(address.privatekey,secret);
		//this.decrypt(encryptedPrivateKey,secret);

		this._count++;

		this._users.push({
			id:this._count,
			email:email,
			password:password,
			address:address.address,
			privatekey:encryptedPrivateKey,
			publickey:address.publickey,
		})

		console.log(this._users);

		return { result : true, retcode : retcode.getSuccess() };
	}

	remove(email) {

	}

	get(email) {

		let user = this._users.find(function (u) {
			return u.email === email;    
		});

		return user;
	}
}
  
module.exports = new users;