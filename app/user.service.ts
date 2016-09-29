import { Injectable } from '@angular/core';

import { CloudmineService } from './cloudmine.service';
import { User } from './user';

@Injectable()
export class UserService {
    
    constructor(private cloudmineService: CloudmineService) { }
    currentUser: User;

    login(username, password): Promise<User> {
	return new Promise( (resolve, reject)=> {
	    this.cloudmineService.login(username, password).then( (result)=> {
		console.log("Logged in!", result);
		let user = new User();
		user.sessionToken = result.session_token;
		this.currentUser = user;
		resolve(user);
	    });
	});
    }

    logout(): Promise<any> {
	this.currentUser = null;
	return this.cloudmineService.logout();
    }
    
    register(username, password): Promise<User> {
	return new Promise( (resolve, reject)=> {
	    this.cloudmineService.register(username, password).then( (result)=> {
		let user = new User();
		console.log("register result", result);
		user.username = username;
		this.currentUser = user;
		resolve(user);
	    }).catch( (err)=> {
		reject(err);
	    });
	});
    }
}
