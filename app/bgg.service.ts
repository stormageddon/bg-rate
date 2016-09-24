import { Injectable } from '@angular/core';

import { BggItem } from './bgg-item';

@Injectable()
export class BggService {
  getBoardGame(gameName): Promise<BggItem> {
    let mockBggItem = { "gameId": 143986, "name": "CV", "description": "CV the game", "bggRating": 6.55093, "averageRating": 6.84941 };
    return Promise.resolve(mockBggItem);
  }
}