import { NgModule }		from '@angular/core';
import { BrowserModule } 	from '@angular/platform-browser';
import { FormsModule } 	 	from '@angular/forms';
import { HttpModule }		from '@angular/http';

import { AppComponent } 	from './app.component';
import { GameDetailComponent }  from './game-detail.component';

declare var WebService: any;

@NgModule({
	imports: [ BrowserModule, FormsModule, HttpModule ],
	declarations: [ AppComponent, GameDetailComponent ],
	bootstrap: [ AppComponent ]
})
export class AppModule { }