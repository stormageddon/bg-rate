import { Component, OnInit, Pipe, Input, ViewChild } from '@angular/core';

import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { Game } from './game';
import { GameService } from './game.service';
import { BggService } from './bgg.service';
import { CloudmineService } from './cloudmine.service';
import { UserService } from './user.service';

@Component({
    selector: 'my-app',
    providers: [BggService],
    template: `
          <my-header [hidden]="!userService.currentUser"></my-header>
          <my-login (userLoggedIn)="getGames()"></my-login>
          <div [hidden]="!userService.currentUser">
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
              <ul>
                <li *ngFor="let game of games">
                  <span class="table-cell">{{getBadgeValue(game)}}</span>
                  <span class="table-cell">{{game.name}}</span>
                  <span class="table-cell">{{game.unweightedValue}}</span>
                  <span class="table-cell">{{game.weightedValue}}</span>
                  <span class="table-cell">{{game.costIndependentWeightedValue}}</span>
                  <span class="table-cell">{{game.costDependentWeightedValue}}</span>
                  <span class="table-cell">{{game.costDependentedUnweightedValue}}</span>
                </li>
              </ul>
            </div>


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
<modal #resultModal>
    <modal-header [show-close]="true">
        <h4 class="modal-title">{{modalTitle}}</h4>
    </modal-header>
    <modal-body>
        {{modalBody}}
    </modal-body>
    <modal-footer [show-default-buttons]="false">
      <button type="button" class="btn btn-primary" (click)="modal.close()">Ok</button>
    </modal-footer>
</modal>
	`,
	styles: [`
  .table-cell {
    border: 1px solid black;
  }
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
    height: 2.2em;
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
    height: 2.3em;
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
    @Input() createdUser;
    @ViewChild('resultModal')
    modal: ModalComponent;
    
    constructor(private gameService: GameService, private bggService: BggService, private cloudmineService: CloudmineService, private userService: UserService) { }
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

    /** Modal attributes **/
    'show-close': boolean = true;
    modalTitle: string;
    modalBody: string;

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
	  console.log("Are we here too?");
          newGame.id = newGame.gameID;
  	  newGame.calculateUnweightedScore();
	  newGame.calculateWeightedScore();
	  newGame.calculateCostIndependentUnweightedScore();
	  newGame.calculateCostIndependentWeightedScore();
	  newGame.calculateCostDependentWeightedScore();	
	
	  this.games = this.gameService.addGame(finalizedGame);
	  this.cloudmineService.update(newGame.gameID, finalizedGame.getSafeJSON());
	  this.clearInputs();	  
      }).catch( (err)=> {
	  this.modalTitle = "Unable to save game";
	  this.modalBody = err.message;
	  this.modal.open();
      });
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
	this.userService.logout();
    }

}
