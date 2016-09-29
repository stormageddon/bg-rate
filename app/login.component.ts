import { Component, Output, EventEmitter } from '@angular/core';

import { UserService } from './user.service';

@Component({
    selector: 'my-login',
    providers: [],
    template: `
        <div [hidden]=userService.currentUser>
          <p>You must login to add games!</p>
          <form (submit)=login()>
            <input type="text" [(ngModel)]="username" name="username" placeholder="Username" />
            <input type="password" [(ngModel)]="password" name="password" placeholder="Password" />
            <button>Login</button>
          </form>
        </div>
`,
    styles: []

})

export class LoginComponent {
    @Output() userLoggedIn = new EventEmitter();
    username: string;
    password: string;

    constructor(private userService: UserService) { }
    
    login(): void {
	this.userService.login(this.username, this.password).then( (result)=> {
	    console.log("Result!", result);
	    this.userLoggedIn.emit(result);
	}).catch( (err)=> {
	    console.log("Something went horribly wrong", err);
	});
    }
}
