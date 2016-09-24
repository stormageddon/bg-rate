import { Injectable } from '@angular/core';

import { Game } from './game';
import { GAMES } from './mock-games';

declare var cloudmine: any;
let webService = new cloudmine.WebService({appid: '9f16996a04afcd4da039daa5a51d8716', apikey: 'b776889b290a4e2ca85b97ba7c070a56'});

@Injectable()
export class GameService {

  gameList: Game[] = [];

  getGames(): Promise<Game[]> {

    return new Promise(function(resolve, reject) {

      webService.get().on('success', function(response) {
        let self = this;            
        console.log('response!', response);
	self.gameList = [];
	Object.keys(response).forEach( function(key, value) {
	  console.log("KEY:", key);
	  console.log("value:", self.gameList);	  
	  self.gameList.push(response[key])
        })
	self.gameList.sort(function(a,b) { return (a.weightedValue < b.weightedValue) ? 1 : ((b.weightedValue < a.weightedValue) ? -1 : 0); });
        resolve(self.gameList);
      }).on('error', function(err) {
        reject(err)
      });
    });
  }

  addGame(newGame): Game[] {
    this.gameList.push(newGame);
    return this.gameList;
  }
}