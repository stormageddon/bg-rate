import { Injectable } from '@angular/core';

import { Game } from './game';
import { GAMES } from './mock-games';
import { CloudmineService } from './cloudmine.service';

declare var cloudmine: any;
//let webService = new cloudmine.WebService({appid: '9f16996a04afcd4da039daa5a51d8716', apikey: 'b776889b290a4e2ca85b97ba7c070a56'});

@Injectable()
export class GameService {

  gameList: Game[] = [];

    constructor(private cloudmineService: CloudmineService) {
	console.log("Creating a new GameService");
    }
    
  getGames(): Promise<Game[]> {
    let self = this;
    return new Promise(function(resolve, reject) {
      let theSelf = self;            
      self.cloudmineService.get().then( function(response) {
        let innerSelf = theSelf;
        console.log('response!', response);

	Object.keys(response).forEach( function(key, value) {
	  console.log("KEY:", key);
	  console.log("value:", innerSelf.gameList);	  
	  innerSelf.gameList.push(response[key])
        })
	innerSelf.gameList.sort(function(a,b) { return (a.weightedValue < b.weightedValue) ? 1 : ((b.weightedValue < a.weightedValue) ? -1 : 0); });
        resolve(innerSelf.gameList);
      }).catch( function(err) {
        reject(err)
      });
    });
  }

    addGame(newGame): Game[] {
	console.log( "ADDING NEW GAME IN GAME SERVICE" );
	this.gameList.push(newGame);
	this.sortGames();
	return this.gameList;
    }

    sortGames(): void {
	this.gameList.sort(function(a,b) { return (a.weightedValue < b.weightedValue) ? 1 : ((b.weightedValue < a.weightedValue) ? -1 : 0); });
    }

    removeGame(gameToRemove): Promise<boolean> {
	let removed = this.gameList.splice(this.gameList.indexOf(gameToRemove), 1);
	console.log("Removed:", removed);
	console.log("new game list:", this.gameList);
	return this.cloudmineService.remove(gameToRemove.id);
    }

    getGameAtIndex(index: number): Game {
	if (index < 0 || index >= this.gameList.length) {
	    return this.gameList[0];
	}
	return this.gameList[index];
    }
    
}
