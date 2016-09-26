import { Component, Input } from '@angular/core';
import { GameService } from './game.service';
import { Game } from './game';

@Component({
    selector: 'my-game-detail',
    providers: [],
    template: `
  	    <div [hidden]="game === null" class="game-detail-container">
              <p> My Game Detail </p>
  	      <h2> {{game?.name}} details</h2>
	      <img src="{{game?.thumbnail}}" width="50" height="50" alt="{{game?.name}} thumbnail"/>
	      <p> Weighted value: {{game?.weightedValue}} </p>
	      <p> Unweighted valud: {{game?.unweightedValue}} </p>
	      <p> BGG Geek Rating: {{game?.bggGeekRating}} </p>
	      <p> BGG Average Rating: {{game?.bggAverageRating}} </p>
	      <h3> Description </h3>
	      <p [innerHTML]="game?.description"></p>
              <button (click)="remove()">Delete</button>
	    </div>
           `,
    styles: [`
      .game-detail-container {
        background: #CFD8DC;
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
