'use strict';

class users {

	constructor() {
		//this._users = [];
		//this._count = 0;

		this._users = [{
			id:1,
			email:'test@mail.com',
			password:'1111'
		}];

		this._count = 1;
	}

	register(email, password) {

		this._count++;

		this._users.push({
			id:this._count,
			email:email,
			password:password
		})

		return true;
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