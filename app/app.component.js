"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var game_1 = require('./game');
var game_service_1 = require('./game.service');
var bgg_service_1 = require('./bgg.service');
var AppComponent = (function () {
    function AppComponent(gameService, bggService) {
        this.gameService = gameService;
        this.bggService = bggService;
        this.title = 'Board Game Rater';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getGames();
    };
    AppComponent.prototype.onSelect = function (game) {
        this.selectedGame = game;
        console.log('The selected game is', this.selectedGame);
    };
    AppComponent.prototype.getGames = function () {
        var _this = this;
        this.gameService.getGames().then(function (games) { return _this.games = games; });
    };
    AppComponent.prototype.addGame = function () {
        var _this = this;
        var newGame = new game_1.Game(this.bggService, this.games.length + 1, this.gameName, this.gameRating, this.conceptScore, this.artScore, this.interest, this.partnerInterest, this.complexity);
        newGame.finalizeGame().then(function (finalizedGame) {
            console.log("Unweighted: " + newGame.calculateUnweightedScore());
            console.log("Weighted: " + newGame.calculateWeightedScore());
            console.log("ratign:" + newGame.bggGeekRating);
            _this.games = _this.gameService.addGame(finalizedGame);
        });
        /*    this.games = this.gameService.addGame(newGame);*/
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            providers: [game_service_1.GameService, bgg_service_1.BggService],
            template: "\n\t  <h1>{{title}}</h1>\n\t  <div>\n\t    <p>New game:</p>\n\t    <input type=\"text\" [(ngModel)]=\"gameName\" placeholder=\"Name\" />\n\t    <input type=\"text\" [(ngModel)]=\"gameRating\" placeholder=\"Rating\" />\n\t    <input type=\"text\" [(ngModel)]=\"conceptScore\" placeholder=\"Concept\" />\n\t    <input type=\"text\" [(ngModel)]=\"artScore\" placeholder=\"Art\" />\n\t    <input type=\"text\" [(ngModel)]=\"interest\" placeholder=\"Interest\" />\n\t    <input type=\"text\" [(ngModel)]=\"partnerInterest\" placeholder=\"Partner Interest\" />\n\t    <input type=\"text\" [(ngModel)]=\"complexity\" placeholder=\"BGG Complexity\" />\t    \t    \n\t    <button (click)=\"addGame()\">Add Game</button>\n\t  </div>\n\t  <h2>Game List</h2>\n\t  <ul class=\"games\">\n\t    <li *ngFor=\"let game of games\" (click)=\"onSelect(game)\" [class.selected]=\"game === selectedGame\">\n\t      <span class=\"badge\">{{game.id}}</span> {{game.name}}\n\t      <span class=\"rating\">{{game.unweightedValue}}</span>\n\t    </li>\n\t  </ul>\n          <my-game-detail [game]=\"selectedGame\"></my-game-detail>\n\t",
            styles: ["\n  .selected {\n    background-color: #CFD8DC !important;\n    color: white;\n  }\n  .games {\n    margin: 0 0 2em 0;\n    list-style-type: none;\n    padding: 0;\n    width: 15em;\n  }\n  .games li {\n    cursor: pointer;\n    position: relative;\n    left: 0;\n    background-color: #EEE;\n    margin: .5em;\n    padding: .3em 0;\n    height: 1.6em;\n    border-radius: 4px;\n  }\n  .games li.selected:hover {\n    background-color: #BBD8DC !important;\n    color: white;\n  }\n  .games li:hover {\n    color: #607D8B;\n    background-color: #DDD;\n    left: .1em;\n  }\n  .games .text {\n    position: relative;\n    top: -3px;\n  }\n  .games .badge {\n    display: inline-block;\n    font-size: small;\n    color: white;\n    padding: 0.8em 0.7em 0 0.7em;\n    background-color: #607D8B;\n    line-height: 1em;\n    position: relative;\n    left: -1px;\n    top: -4px;\n    height: 1.8em;\n    margin-right: .8em;\n    border-radius: 4px 0 0 4px;\n  }\n"]
        }), 
        __metadata('design:paramtypes', [game_service_1.GameService, bgg_service_1.BggService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map