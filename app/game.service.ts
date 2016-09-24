import { Injectable } from '@angular/core';

import { Game } from './game';
import { GAMES } from './mock-games';

@Injectable()
export class GameService {

  gameList = GAMES;

  getGames(): Promise<Game[]> {
    return Promise.resolve(this.gameList);
  }

  addGame(newGame): Game[] {
    this.gameList.push(newGame);
    return this.gameList;
  }
}