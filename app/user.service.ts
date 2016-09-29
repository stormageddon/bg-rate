import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    constructor(private cloudmineService: CloudmineService) { }

    login(username: string, password: string) Promise<User> {
	return this.cloudmineService.login(username, password).then( (result)=> {
	    console.log("Logged in!", result);
	});
    });
}
