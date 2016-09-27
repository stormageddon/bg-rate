import { Component, OnInit, Pipe, Input } from '@angular/core';

import { Game } from './game';
import { GameService } from './game.service';
import { BggService } from './bgg.service';
import { CloudmineService } from './cloudmine.service';

@Component({
	selector: 'my-app',
    providers: [BggService],
	template: `
	  <h1>{{title}}</h1>
          <a href="#" (click)="logout()" [hidden]="!loggedIn">logout</a>
          <div [hidden]="loggedIn">
            <p>You must login to add games!</p>
            <form (submit)=login()>
              <input type="text" [(ngModel)]="username" name="username" placeholder="Username" />
              <input type="password" [(ngModel)]="password" name="password" placeholder="Password" />
              <button>Login</button>
            </form>
          </div>
          <div [hidden]="!loggedIn">
  	    <form class="new-game-form-container" (submit)=addGame()>
	      <p>New game:</p>
	      <input type="text" [(ngModel)]="gameName" name="name" placeholder="Name" />
              <input type="text" [(ngModel)]="bggId" name="bggId" placeholder="BGG Id (optional)" />
	      <input type="text" [(ngModel)]="conceptScore" name="conceptScore" placeholder="Concept" />
	      <input type="text" [(ngModel)]="artScore" name="artScore" placeholder="Art" />
	      <input type="text" [(ngModel)]="interest" name="interest" placeholder="Interest" />
	      <input type="text" [(ngModel)]="partnerInterest" name="partnerInterest" placeholder="Partner Interest" />
	      <input type="text" [(ngModel)]="complexity" name="complexity" placeholder="BGG Complexity" />
    	      <input type="text" [(ngModel)]="price" name="price" placeholder="Price ($USD)" />
	      <button>Add Game</button>
	    </form>
	    <div class='inline-block'>
  	      <h2>Game List</h2>
              <sort-selector (select)="selectChanged($event)" style="text-align: center;"></sort-selector>
	      <ul class="games">
	        <li *ngFor="let game of games" (click)="onSelect(game)" [class.selected]="game === selectedGame">
	          <span class="badge">{{getBadgeValue(game)}}</span>
	          <span>{{game.name}}</span>
	        </li>
	      </ul>
	    </div>
	    <div class="float-right">
              <my-game-detail [game]="selectedGame"></my-game-detail>
	    </div>
          </div>
	`,
	styles: [`
  .new-game-form-container {
    margin: 8px;
    text-align: center;
  }
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .games {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 30em;
  }
  .games li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .games li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .games li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .games .text {
    position: relative;
    top: -3px;
  }
  .games .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
  .inline-block {
    display: inline-block;
  }
  .float-right {
    padding: 16px;
    display: inline-block;
    width: inherit;
    position: absolute;
    float: right;
  }
`]
})

export class AppComponent implements OnInit {
  @Input() select;
    
    constructor(private gameService: GameService, private bggService: BggService, private cloudmineService: CloudmineService) { }
    title = 'Board Game Rater';
    username: string;
    password: string;
    games: Game[];
    selectedGame: Game;
    gameName: string;
    bggId: number;
    conceptScore: number;
    artScore: number;
    interest: number;
    partnerInterest: number;
    complexity: number;
    price: number;
    sortParameter: string = 'weightedValue';
    loggedIn: boolean = false;

    ngOnInit(): void {
		  
    }

  onSelect(game: Game): void {
    this.selectedGame = game;
    console.log('The selected game is', this.selectedGame);
  }

  getGames(): void {
    this.gameService.getGames().then( (games)=> {
      console.log("FETCHED GAMES:", games);
      this.games = games;
    });
  }

  addGame(): void {
      let newGame = new Game(this.bggService, this.gameName, this.conceptScore, this.artScore, this.interest, this.partnerInterest, this.complexity * 2, this.price);
      console.log('bgg id:', this.bggId);
      if ( this.bggId != null ) {
	  newGame.gameID = this.bggId;
      }

      newGame.finalizeGame().then((finalizedGame)=> {
	  newGame.id = newGame.gameID;
  	newGame.calculateUnweightedScore();
	newGame.calculateWeightedScore();
	newGame.calculateCostIndependentUnweightedScore();
	newGame.calculateCostIndependentWeightedScore();
	newGame.calculateCostDependentWeightedScore();	
	
	this.games = this.gameService.addGame(finalizedGame);
	this.cloudmineService.update(newGame.gameID, finalizedGame.getSafeJSON());
    });
    
    this.clearInputs();
  }

  clearInputs(): void {
      this.gameName = null;
      this.bggId = null;
      this.conceptScore = null;
      this.artScore = null;
      this.interest = null;
      this.partnerInterest = null;
      this.complexity = null;
      this.price = null;
  }

  getBadgeValue(game): string {
    return game[this.select];		   
  }

  selectChanged($event): void {
    this.select = $event;
    console.log('event:', $event);
    if (this.games === null || this.games === undefined) {
      return;
    }
    this.games.sort(function(a,b) { return (a[$event] < b[$event]) ? 1 : ((b[$event] < a[$event]) ? -1 : 0); });    
  }

    login(): void {
	/** sign in as user **/
	this.cloudmineService.login(this.username, this.password).then( (result)=> {
	    this.getGames();
	    this.loggedIn = true;
	}).catch( (err)=> {
	    console.log("Mad failures yo");
	});
    }
    
    logout(): void {
	this.cloudmineService.logout().then( ( result )=> {
	    this.loggedIn = false;
	}).catch( ( err )=> {
	    console.log("failed to logout", err);
	});
    }

}
