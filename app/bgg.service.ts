import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { BggItem } from './bgg-item';
import { GAME_IDS } from './mock-game-ids';
import { CloudmineService } from './cloudmine.service';

const BGG_API_URL = 'https://bgg-json.azurewebsites.net/thing/';
const BGG_QUERY_URL = 'http://www.boardgamegeek.com/xmlapi2/search?query=';
const CM_BGG_SNIPPET_NAME = 'transform_xml';

/* declare var cloudmine: any; */
/* let webService = new cloudmine.WebService({appid: , apikey: }); */

@Injectable()
export class BggService {

    constructor(private http: Http, private cloudmineService: CloudmineService) { }


  /** Not currently operational due to CORS issue **/
    getGameIDFromName(gameName): Promise<number> {
      let params = {
      	name: gameName,
	exact: 1
      }

      return this.cloudmineService.runSnippet(CM_BGG_SNIPPET_NAME, params, {});
  }

  getBoardGame(gameID): Promise<BggItem> {
    return this.http.get(BGG_API_URL + gameID)
    	   .toPromise()
	   .then( (response) => {
	     console.log("Response:", response.json());
	     console.log("Response:", response.json().body);
	     let body = response.json();
	     let item = new BggItem(body.gameId, body.name, body.description, body.bggRating, body.averageRating, body.minPlayers, body.maxPlayers, body.playTime);
	     item.thumbnail = body.image;
	     
	     return Promise.resolve(item);
	   })
	   .catch( err => console.log("Error", err) );

  }
}
