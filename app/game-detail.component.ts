import { Component, Input } from '@angular/core';
import { Game } from './game';

@Component({
  selector: 'my-game-detail',
  template: `
  	    <p> My Game Detail </p>
  	    <div *ngIf="game">
  	      <h2> {{game.name}} details</h2>
	      <p> Rating: {{game.rating}} </p>
	    </div>
	  `
})

export class GameDetailComponent {
       @Input()
       game: Game;
}