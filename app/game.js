"use strict";
var Game = (function () {
    function Game(bggService, _id, _name, _rating, _concept, _art, _interest, _partnerInterest, _complexity) {
        /**
         * These need to be fetched somehow.
         *
        * this.bggGeekRating = 6.55;
        * this.bggAverageRating = 6.85;
        *
        * this.complexity = 3.72;
        */
        this.bggService = bggService;
        this.price = 29.07;
        this.id = _id;
        this.name = _name;
        this.rating = +_rating;
        this.concept = +_concept;
        this.art = +_art;
        this.interest = +_interest;
        this.partnerInterest = +_partnerInterest;
        this.PRtg = this.price * .1;
        this.PInv = (10 - this.PRtg) + 1;
        this.complexity = +_complexity;
        this.CInv = (10 - this.complexity) + 2;
    }
    Game.prototype.finalizeGame = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.bggService.getBoardGame(self.name).then(function (game) {
                self.bggGeekRating = +game.bggRating;
                self.bggAverageRating = +game.averageRating;
                console.log("PInv: ", self.PInv);
                console.log("CInv: ", self.CInv);
                console.log("bggGeekRating", self.bggGeekRating);
                console.log("avgGeekRating", self.bggAverageRating);
                console.log("description", game.description);
                resolve(self);
            });
        });
    };
    /**
     * Unweighted value is found by:
     * ((bggGeekRating + bggAverageRating + concept + art + interest + partnerInterest + CInv + PInv)/8)
     */
    Game.prototype.calculateUnweightedScore = function () {
        this.unweightedValue = +((this.bggGeekRating + this.bggAverageRating + this.concept + this.art + this.interest + this.partnerInterest + this.CInv + this.PInv) / 8).toFixed(2);
        return this.unweightedValue;
    };
    /**
     * Weighted value calculated by:
     * ((bggGeekRating*.04)+(bggAverageRating*.06)+(concept*.25)+(art*.1)+(interest*.15)+(partnerInterest*.08)+(CInv*.25)+(PInv*.07))
     */
    Game.prototype.calculateWeightedScore = function () {
        console.log("avgGeekRating", this.bggAverageRating);
        this.weightedValue = +((this.bggGeekRating * .04) + (this.bggAverageRating * .06) + (this.concept * .25) + (this.art * .1) + (this.interest * .15) + (this.partnerInterest * .08) + (this.CInv * .25) + (this.PInv * .07)).toFixed(2);
        return this.weightedValue;
    };
    return Game;
}());
exports.Game = Game;
//# sourceMappingURL=game.js.map