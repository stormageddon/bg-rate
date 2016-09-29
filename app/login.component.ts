import { Component } from '@angular/core';

import { UserService } from './user.service';

@Component({
    selector: 'my-login',
    providers: [],
    template: `
        <p>You must login to add games!</p>
        <form (submit)=login()>
            <input type="text" [(ngModel)]="username" name="username" placeholder="Username" />
            <input type="password" [(ngModel)]="password" name="password" placeholder="Password" />
            <button>Login</button>
        </form>
`,
    styles: []

})

export class LoginComponent {
    username: string;
    password: string;

    constructor(private userService: UserService) { }
    
    login(): void {
	this.userService.login(this.username, this.password).then( (result)=> {
	    console.log("Result!", result);
	}).catch( (err)=> {
	    console.log("Something went horribly wrong", err);
	});
    }
}
