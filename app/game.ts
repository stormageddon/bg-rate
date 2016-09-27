import { BggService } from './bgg.service';
import { CloudmineService } from './cloudmine.service';

export class Game {
  constructor(private bggService: BggService, _name: string, _concept: number, _art: number, _interest: number, _partnerInterest: number, _complexity: number, _price: number) {

    this.name = _name;
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

    /* Properties from spread sheet */
  price: number;
  rawCost: number;
  unweightedValue: number;
  weightedValue: number;
  costIndependentWeightedValue: number;
    costDependentWeightedValue: number;
    costIndependentUnweightedValue: number;
    costDependentUnweightedValue: number;
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
      if (!this.gameID) {
	  let self = this;
	  console.log("Game id?", self.gameID);	  
	  console.log("Find an id");
	  return self.bggService.getGameIDFromName(self.name).then( (gameID) => {
	      console.log("Got id from name", gameID);
	      self.gameID = gameID;

	      return this.getGameFromID(gameID)
	  }).catch( (err)=> {
	      console.log("Error getting ID", err);
	  });
      }
      else {
	  return this.getGameFromID(this.gameID);
      }
  }

    getGameFromID(bggID): Promise<Game> {
	let self = this;
	return new Promise( function(resolve, reject) {

            self.bggService.getBoardGame(bggID).then( (game) => {
		console.log("BGG Item:", game);
		self.bggGeekRating = +game.bggRating;
		self.bggAverageRating = +game.averageRating;
		self.description = game.description;
		self.thumbnail = game.thumbnail;
		self.minPlayers = game.minPlayers;
		self.maxPlayers = game.maxPlayers;
		let totalHours = Math.floor(game.playTime / 60);
		let totalMinutes = game.playTime % 60;
		self.hours = parseInt(+totalHours + '.' + +totalMinutes);

		resolve(self);
            }).catch( err => console.log("err:", err) );
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

    calculateCostIndependentUnweightedScore(): number {
	this.costIndependentUnweightedValue = +((this.bggGeekRating + this.bggAverageRating + this.concept + this.art + this.interest + this.partnerInterest + this.CInv) / 7).toFixed(2);

	return this.costIndependentUnweightedValue;
    }

    calculateCostIndependentWeightedScore(): number {
	this.costIndependentWeightedValue = +(((this.bggGeekRating * 0.04) + (this.bggAverageRating * 0.06) + (this.concept * 0.26) + (this.art * 0.13) + (this.interest * 0.18) + (this.partnerInterest * 0.08) + (this.CInv * 0.25))).toFixed(2);
	return this.costIndependentWeightedValue;
    }

    calculateCostDependentWeightedScore(): number {
	this.costDependentWeightedValue = +((this.bggGeekRating * 0.03) + (this.bggAverageRating * 0.06) + (this.concept * 0.125) + (this.art * 0.075) + (this.interest * 0.17) + (this.partnerInterest * 0.08) + (this.CInv * 0.2) + (this.PInv * 0.25)).toFixed(2);
	return this.costDependentWeightedValue;
    }
    
  getSafeJSON(): any {
    let safeObj = {
      name: this.name,
      price: this.price,
      rawCost: this.rawCost,
      unweightedValue: this.unweightedValue,
      weightedValue: this.weightedValue,
      costIndependentUnweightedValue: this.costIndependentUnweightedValue,
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
