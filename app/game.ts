import { BggService } from './bgg.service';

export class Game {
  constructor(private bggService: BggService, _id: number, _name: string, _rating: number, _concept: number, _art: number, _interest: number, _partnerInterest: number, _complexity: number, _price: number) {

    /**
     * These need to be fetched somehow.
     *
    * this.bggGeekRating = 6.55;
    * this.bggAverageRating = 6.85;
    * this.price = 29.07;
    * this.complexity = 3.72;
    */

    

    this.id = _id;
    this.name = _name;
    this.rating = +_rating;
    this.concept = +_concept;
    this.art = +_art;
    this.interest = +_interest;
    this.partnerInterest = +_partnerInterest;
    this.price = +_price;
    this.PRtg = this.price * .1;
    this.PInv = (10 - this.PRtg) + 1;
    this.complexity = +_complexity;
    this.CInv = (10 - this.complexity) + 2;      
  }
  
  id: number;
  name: string;
  rating: number;

  /* Properties from spread sheet */
  price: number;
  rawCost: number;
  unweightedValue: number;
  weightedValue: number;
  costIndependentWeightedValue: number;
  costDependentWeightedValue: number;
  onePlayerCostIndependent: number;
  onePlayerCostDependent: number;
  bggGeekRating: number;
  bggAverageRating: number;
  minPlayers: number;
  maxPlayers: number;
  hours: number;
  concept: number;
  art: number;
  interest: number;
  partnerInterest: number;
  complexity: number;
  CInv: number;
  CRaw: number;
  PRtg: number;
  PInv: number;
  description: string;
  gameID: number;
  thumbnail: string;

  /**
   * Fetch game data from external sources
   */
  finalizeGame(): Promise<Game> {
    let self = this;

    return self.bggService.getGameIDFromName(self.name).then( (gameID) => {
      self.gameID = gameID;
      return new Promise( function(resolve, reject) {

        self.bggService.getBoardGame(self.gameID).then( (game) => {
          console.log("BGG Item:", game);      						    
          self.bggGeekRating = +game.bggRating;
          self.bggAverageRating = +game.averageRating;
	  self.description = game.description;
	  self.thumbnail = game.thumbnail;

          console.log("PInv: ", self.PInv);
          console.log("CInv: ", self.CInv);

          console.log("bggGeekRating", self.bggGeekRating);
          console.log("avgGeekRating", self.bggAverageRating);
          console.log("description", game.description);

          resolve(self);
        }).catch( err => console.log("err:", err) );
      });
    });
    
  }

  /**
   * Unweighted value is found by:
   * ((bggGeekRating + bggAverageRating + concept + art + interest + partnerInterest + CInv + PInv)/8)
   */
  calculateUnweightedScore(): number {
    this.unweightedValue = +((this.bggGeekRating + this.bggAverageRating + this.concept + this.art + this.interest + this.partnerInterest + this.CInv + this.PInv) / 8).toFixed(2);

    return this.unweightedValue;
  }

  /**
   * Weighted value calculated by:
   * ((bggGeekRating*.04)+(bggAverageRating*.06)+(concept*.25)+(art*.1)+(interest*.15)+(partnerInterest*.08)+(CInv*.25)+(PInv*.07))
   */
  calculateWeightedScore(): number {
    console.log("avgGeekRating", this.bggAverageRating);  
    this.weightedValue = +((this.bggGeekRating*.04)+(this.bggAverageRating*.06)+(this.concept*.25)+(this.art*.1)+(this.interest*.15)+(this.partnerInterest*.08)+(this.CInv*.25)+(this.PInv*.07)).toFixed(2);

    return this.weightedValue;
  }

  getSafeJSON(): any {
    let safeObj = {
      name: this.name,
      price: this.price,
      rawCost: this.rawCost,
      unweightedValue: this.unweightedValue,
      weightedValue: this.weightedValue,
      costIndependentWeightedValue: this.costIndependentWeightedValue,
      costDependentWeightedValue: this.costDependentWeightedValue,
      onePlayerCostIndependent: this.onePlayerCostIndependent,
      onePlayerCostDependent: this.onePlayerCostDependent,
      bggGeekRating: this.bggGeekRating,
      bggAverageRating: this.bggAverageRating,
      minPlayers: this.minPlayers,
      maxPlayers: this.maxPlayers,
      hours: this.hours,
      concept: this.concept,
      art: this.art,
      interest: this.interest,
      partnerInterest: this.partnerInterest,
      complexity: this.complexity,
      CInv: this.CInv,
      CRaw: this.CRaw,
      PRtg: this.PRtg,
      PInv: this.PInv,
      description: this.description,
      gameID: this.gameID,
      thumbnail: this.thumbnail,
      id: this.id
    }
    return safeObj;
  }

}