import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { BggItem } from './bgg-item';
import { GAME_IDS } from './mock-game-ids';

const BGG_API_URL = 'https://bgg-json.azurewebsites.net/thing/';
const BGG_QUERY_URL = 'http://www.boardgamegeek.com/xmlapi2/search?query=';



@Injectable()
export class BggService {

  constructor(private http: Http) { }


  /** Not currently operational due to CORS issue **/
  getGameIDFromName(gameName): Promise<number> {
    let gameId = +GAME_IDS[gameName.toLowerCase()];
    console.log("Game IDS:", GAME_IDS);
    console.log("Game id:", gameId);
    return Promise.resolve(gameId);

/*    let headers = new Headers();
    headers.append('Accept', 'application/xml');

    return this.http.get(BGG_QUERY_URL + gameName, {
      headers: headers
    })
    .toPromise()
    .then( (response) => {
      console.log('response xml:', response)
      return Promise.resolve(1);
    });*/
    
  }

  getBoardGame(gameID): Promise<BggItem> {
    return this.http.get(BGG_API_URL + gameID)
    	   .toPromise()
	   .then( (response) => {
	     console.log("Response:", response.json());
	     console.log("Response:", response.json().body);
	     let body = response.json();
	     let item = new BggItem(body.gameId, body.name, body.description, body.bggRating, body.averageRating, body.minPlayers, body.maxPlayers, body.playTime);
	     item.thumbnail = body.thumbnail;
	     
	     return Promise.resolve(item);
	   })
	   .catch( err => console.log("Error", err) );



/*    let mockBggItem = { "gameId": 143986, "name": "CV", "description": "CV the game", "bggRating": 6.55093, "averageRating": 6.84941 };
    return Promise.resolve(mockBggItem);*/


  }
}