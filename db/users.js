'use strict';

var crypto = require("crypto-js");

class users {

	constructor() {
		//this._users = [];
		//this._count = 0;

		this._users = [{
			id:1,
			email:'test@mail.com',
			password:'1111',
			address:"0xb3f80ef64e78ce2283aea354553f7d5bc4dec983",
			privatekey:"U2FsdGVkX19N+oT0pvud50E35xojz0zwjv2rsqaaKbIGe563nQuxrH4e/P52YyY6aanxwt4zSYbUuFSqTE0Md5MRB8hI/cN8P3v7d/Eig7B9f3MkSIb1w7N7HMZoNv6i",
			publickey:"0x446459d5256cbd2767961e88ab3af47ea6b04c27f691949070feb2a3030b9f23b9fd693d29e748017473ba90c8452ab70d747655a557e3cc984a938ed682fc51"
		}];

		this._count = 1;
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