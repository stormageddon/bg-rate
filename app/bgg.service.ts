import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { BggItem } from './bgg-item';

const BGG_API_URL = 'https://bgg-json.azurewebsites.net/thing/';

@Injectable()
export class BggService {

  constructor(private http: Http) { }

  getBoardGame(gameName): Promise<BggItem> {

    return this.http.get(BGG_API_URL + 143986)
    	   .toPromise()
	   .then( (response) => {
	     console.log("Response:", response.json());
	     console.log("Response:", response.json().body);
	     let body = response.json();
	     let item = new BggItem(body.gameId, body.name, body.description, body.bggRating, body.averageRating);
	       
	     return Promise.resolve(item);
	   })
	   .catch( err => console.log("Error", err) );



/*    let mockBggItem = { "gameId": 143986, "name": "CV", "description": "CV the game", "bggRating": 6.55093, "averageRating": 6.84941 };
    return Promise.resolve(mockBggItem);*/


  }
}