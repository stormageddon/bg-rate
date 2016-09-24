import { Component, Input } from '@angular/core';
import { Game } from './game';

@Component({
  selector: 'my-game-detail',
  template: `
  	    <p> My Game Detail </p>
  	    <div *ngIf="game">
  	      <h2> {{game.name}} details</h2>
	      <img src="{{game.thumbnail}}" width="50" height="50" alt="{{game.name}} thumbnail"/>
	      <p> Weighted value: {{game.weightedValue}} </p>
	      <p> Unweighted valud: {{game.unweightedValue}} </p>
	      <p> BGG Geek Rating: {{game.bggGeekRating}} </p>
	      <p> BGG Average Rating: {{game.bggAverageRating}} </p>
	      <h3> Description </h3>
	      <p [innerHTML]="game.description"></p>
	    </div>
	  `
})

export class GameDetailComponent {
       @Input()
       game: Game;
}