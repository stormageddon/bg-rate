import { NgModule }		from '@angular/core';
import { BrowserModule } 	from '@angular/platform-browser';
import { FormsModule } 	 	from '@angular/forms';
import { HttpModule }		from '@angular/http';

import { AppComponent } 	from './app.component';
import { GameDetailComponent }  from './game-detail.component';
import { LoginComponent }       from './login.component';
import { GameService } from './game.service';
import { CloudmineService } from './cloudmine.service';
import { SortSelector } from './sort-selector';


@NgModule({
    imports: [ BrowserModule, FormsModule, HttpModule ],
    declarations: [ AppComponent, GameDetailComponent, SortSelector, LoginComponent ],
    providers: [ GameService, CloudmineService ],
    bootstrap: [ AppComponent]
})
export class AppModule { }
