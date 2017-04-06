import { Component } from '@angular/core';

import { UserService } from './user.service';

@Component({
    selector: 'my-header',
    template: `
<div class="container-fluid title-bar">
  <div class="row row-flex row-flex-wrap">
    <div class="col-md-1 hero-container">
      <img class="hero-icon" src="img/meeple.png" alt="BG Rater Icon">
    </div>
    <div class="col-md-10">
      <h1>Board Game Rater</h1>
    </div>
    <div class="clearfix visible-xs-block"></div>
    <div id="logout-div" class="col-md-1">
      <a id="logout-link" href="#" (click)="logout()">logout</a>
    </div>
  </div>
</div>
`,
    styles: [`
.title-bar {
  background-color: purple;
  color: #fff;
}

.hero-icon {
  height: 50px;
  width: auto;
}

.hero-container {
  margin: 0 auto;
  height: 75px;
  padding-top: 10px;
  width: 60px;
}

#logout-div {
  margin-top: 25px;
  float: right;
}

#logout-link {
  color: #fff;
}
`]
})

export class HeaderComponent {
    constructor(private userService: UserService) { }
    
    logout(): void {
	this.userService.logout();
    }
}
