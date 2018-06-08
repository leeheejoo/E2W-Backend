'use strict';

var crypto = require("crypto-js");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class users {

	constructor() {

		this._userSchem = new Schema({
			id: Number,
			email: String,
			password: String,
			address: String,
			privatekey: String,
			publickey: String,
		});
		
		this._user = mongoose.model('user', this._userSchem );
		this._count = 0;
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

	async register(email, password, secret) {

		if(await this.get(email)){
			return { result : false, retcode : retcode.getFailedRegisterByDuplicateEmail() };
		}

		let address = eth.generateAddress(secret);
		//console.log(address);
		//console.log(address.privatekey);

		let encryptedPrivateKey = this.encrypt(address.privatekey,secret);
		//this.decrypt(encryptedPrivateKey,secret);

		this._count++;

		let user = new this._user();

		user.id = this._count;
		user.email = email;
		user.password = password;
		user.address = address.address;
		user.privatekey = encryptedPrivateKey;
		user.publickey = address.publickey;

		await user.save();

		return { result : true, retcode : retcode.getSuccess() };
	}

	remove(email) {

	}

	async get(email) {

		let user = await this._user.findOne({"email":email}).exec();
		return user;
	}
}
  
module.exports = new users;