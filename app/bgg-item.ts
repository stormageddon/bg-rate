export class BggItem {
    constructor( _gameId: number, _name: string, _description: string, _bggRating: number, _averageRating: number) {
      this.gameId = _gameId;
      this.name = _name;
      this.description = _description;
      this.bggRating = _bggRating;
      this.averageRating = _averageRating;
    }
    gameId: number;
    name: string;
    description: string;
    bggRating: number;
    averageRating: number;
    thumbnail: string;
}
  