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
			eth : {
				address: String,
				privatekey: String,
				publickey: String,
			},
			eos: {
				address: String,
				privatekey: String,
				publickey: String,
			}
		});
		
		this._user = mongoose.model('user', this._userSchem );
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

		// ethereum
		let ethAddress = eth.generateAddress(secret);
		let ethEncryptedPrivateKey = this.encrypt(ethAddress.privatekey,secret);
		//console.log(address);
		//console.log(address.privatekey);
		//this.decrypt(encryptedPrivateKey,secret);

		let lastUser = await this.getLast();

		let user = new this._user();

		if(lastUser)
			user.id = lastUser.id + 1;
		else
			user.id = 1;
			
		user.email = email;
		user.password = password;
		user.eth.address = ethAddress.address;
		user.eth.privatekey = ethEncryptedPrivateKey;
		user.eth.publickey = ethAddress.publickey;

		await user.save();

		return { result : true, retcode : retcode.getSuccess() };
	}

	remove(email) {

	}

	update(email) {

	}

	async get(email) {

		let user = await this._user.findOne({"email":email}).exec();
		return user;
	}

	async getLast() {

		let users = await this._user.find().sort({$natural : -1}).limit(1);

		if(users && users.length == 1)
			return users[0];

		return undefined;
	}
}
  
module.exports = new users;