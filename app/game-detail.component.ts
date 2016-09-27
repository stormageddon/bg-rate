import { Component, Input } from '@angular/core';
import { GameService } from './game.service';
import { Game } from './game';

@Component({
    selector: 'my-game-detail',
    providers: [],
    template: `
  	    <div [hidden]="!game" class="game-detail-container">
  	      <h2 class="inline-block"> {{game?.name}} details</h2>
	      <img src="{{game?.thumbnail}}" alt="{{game?.name}} thumbnail" class="float-right game-img"/>
              <div class="main-game-detail-stats">
	        <p> Weighted value: {{game?.weightedValue}} </p>
  	        <p> Unweighted value: {{game?.unweightedValue}} </p>
	        <p> BGG Geek Rating: {{game?.bggGeekRating}} </p>
	        <p> BGG Average Rating: {{game?.bggAverageRating}} </p>
              </div>
              <h3> Description </h3>
              <p [innerHTML]="game?.description" class="game-description"></p>
              <button (click)="remove()">Delete</button>
	    </div>
           `,
    styles: [`
      .game-detail-container {
        background: #CFD8DC;
        margin-left: -25px;
        padding: 0 0 32px 32px;
      }
      .inline-block {
        display: inline-block;
      }
      .float-right {
        padding: 32px;
        display: inline-block;
        width: inherit;
        float: right;
      }
      .main-game-detail-stats {
      }
      .game-description {
        padding-right: 32px;
      }
      .game-img {
        max-height: 200px;
      }`]
})

export class GameDetailComponent {
    @Input()
    game: Game;
    constructor(private gameService: GameService) { }
    
    remove(): void {
	this.gameService.removeGame(this.game).then((result)=> {
	    console.log("Removed " + this.game);
	    this.game = null;

	}).catch( (err) => {
	    console.log("Failed to remove game " + this.game);
	});
    }
	
}
