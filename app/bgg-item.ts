export class BggItem {
    constructor( _gameId: number, _name: string, _description: string, _bggRating: number, _averageRating: number, _minPlayers: number, _maxPlayers: number, _playTime: number) {
      this.gameId = _gameId;
      this.name = _name;
      this.description = _description;
      this.bggRating = _bggRating;
      this.averageRating = _averageRating;
      this.minPlayers = _minPlayers;
      this.maxPlayers = _maxPlayers;
      this.playTime = _playTime;      
    }
    gameId: number;
    name: string;
    description: string;
    bggRating: number;
    averageRating: number;
    thumbnail: string;
    minPlayers: number;
    maxPlayers: number;
    playTime: number;
}
  