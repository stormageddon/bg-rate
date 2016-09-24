import { Component, OnInit, Pipe } from '@angular/core';

import { Game } from './game';
import { GameService } from './game.service';
import { BggService } from './bgg.service';

declare var cloudmine: any;
let webService = new cloudmine.WebService({appid: '9f16996a04afcd4da039daa5a51d8716', apikey: 'b776889b290a4e2ca85b97ba7c070a56'})

@Component({
	selector: 'my-app',
	providers: [GameService, BggService],
	template: `
	  <h1>{{title}}</h1>
	  <div class="new-game-form-container">
	    <p>New game:</p>
	    <input type="text" [(ngModel)]="gameName" placeholder="Name" />
	    <input type="text" [(ngModel)]="gameRating" placeholder="Rating" />
	    <input type="text" [(ngModel)]="conceptScore" placeholder="Concept" />
	    <input type="text" [(ngModel)]="artScore" placeholder="Art" />
	    <input type="text" [(ngModel)]="interest" placeholder="Interest" />
	    <input type="text" [(ngModel)]="partnerInterest" placeholder="Partner Interest" />
	    <input type="text" [(ngModel)]="complexity" placeholder="BGG Complexity" />
    	    <input type="text" [(ngModel)]="price" placeholder="Price ($USD)" />
	    <button (click)="addGame()">Add Game</button>
	  </div>
	  <div class='float-left'>
  	    <h2>Game List</h2>
	    <ul class="games">
	      <li *ngFor="let game of games" (click)="onSelect(game)" [class.selected]="game === selectedGame">
	        <span class="badge">{{getBadgeValue(game)}}</span>
	        <span>{{game.name}}</span>
	        <span class="rating">{{game.weightedValue}}</span>
	      </li>
	    </ul>
	  </div>
	  <div class="float-right">
            <my-game-detail [game]="selectedGame"></my-game-detail>
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
  .float-left {
    display: inline-block;
    float: left;
  }
  .float-right {
    background: #CFD8DC;
    margin-left: -10px;
    padding: 16px;
    display: inline-block;
    width: inherit;
    position: absolute;
    float: right;
  }
`]
})

export class AppComponent implements OnInit {
  constructor(private gameService: GameService, private bggService: BggService) { }
  title = 'Board Game Rater';
  games: Game[];
  selectedGame: Game;
  gameName: string;
  gameRating: number;
  conceptScore: number;
  artScore: number;
  interest: number;
  partnerInterest: number;
  complexity: number;
  price: number;
  webService: any;
  sortParameter: string = 'weightedValue';

  ngOnInit(): void {
    this.getGames();
    console.log("CloudMine?", webService);
  }

  onSelect(game: Game): void {
    this.selectedGame = game;
    console.log('The selected game is', this.selectedGame);
  }

  getGames(): void {
    this.gameService.getGames().then( (games)=> {
      console.log("FETCHED GAMES:", games);
      this.games = games;
      this.onSelect(this.games[0]);
    });
  }

  addGame(): void {
    let newGame = new Game(this.bggService, this.games.length + 1, this.gameName, this.gameRating, this.conceptScore, this.artScore, this.interest, this.partnerInterest, this.complexity, this.price);

    newGame.finalizeGame().then((finalizedGame)=> {
      console.log("Unweighted: " + newGame.calculateUnweightedScore());
      console.log("Weighted: " + newGame.calculateWeightedScore());
      console.log("ratign:" + newGame.bggGeekRating);    
      this.games = this.gameService.addGame(finalizedGame)
      webService.update(finalizedGame.id, finalizedGame.getSafeJSON());
    });
    
    this.clearInputs();
  }

  clearInputs(): void {
    this.gameName = null;
    this.gameRating = null;
    this.conceptScore = null;
    this.artScore = null;
    this.interest = null;
    this.partnerInterest = null;
    this.complexity = null;
    this.price = null;
  }

  getBadgeValue(game): string {
    return game[this.sortParameter];		   
  }

}
