import { Component, Output, EventEmitter } from '@angular/core';

import { UserService } from './user.service';

@Component({
    selector: 'my-login',
    providers: [],
    template: `
        <div [hidden]=userService.currentUser>
          <p>You must login to add games!</p>
          <form (submit)=login()>
            <input type="text" [(ngModel)]="loginUsername" name="loginUsername" placeholder="Username" />
            <input type="password" [(ngModel)]="loginPassword" name="loginPassword" placeholder="Password" />
            <button>Login</button>
          </form>
          <p> Don't have an account yet? Go ahead and register! </p>
          <form (submit)=register()>
            <p class="error-text" [hidden]=!registerInvalid>{{registerErrorMessage}}</p>
            <input type="text" [(ngModel)]="registerUsername" name="registerUsername" placeholder="Username" />
            <input type="password" [(ngModel)]="registerPassword" name="registerPassword" placeholder="Password"/>
            <input type="password" [(ngModel)]="confirmPassword" name="confirmPassword" placeholder="Confirm Password" />
            <button>Register</button>
          </form>
        </div>
`,
    styles: [`
      .error-text {
        color: red;
      }
    `]

})

export class LoginComponent {
    @Output() userLoggedIn = new EventEmitter();
    loginUsername: string;
    loginPassword: string;
    registerUsername: string;
    registerPassword: string;
    confirmPassword: string;
    registerValid: boolean = true;
    registerErrorMessage: string;

    constructor(private userService: UserService) { }
    
    login(): void {
	this.userService.login(this.loginUsername, this.loginPassword).then( (result)=> {
	    console.log("Result!", result);
	    this.userLoggedIn.emit(result);
	}).catch( (err)=> {
	    console.log("Something went horribly wrong", err);
	});
    }

    register(): void {
	if ( this.registerPassword !== this.confirmPassword ) {
	    this.registerErrorMessage = 'Passwords must match';
	    this.registerValid = false;
	    return;
	}
	
	this.userService.register(this.registerUsername, this.registerPassword).then( (result)=> {
	    console.log("Registered!", result);
	    this.userLoggedIn.emit(result);
	}).catch( (err)=> {
	    console.log("Failed to register", err);
	});
    }
		  
}
