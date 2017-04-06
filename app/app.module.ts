/** Angular modules **/
import { NgModule }		from '@angular/core';
import { BrowserModule } 	from '@angular/platform-browser';
import { FormsModule } 	 	from '@angular/forms';
import { HttpModule }		from '@angular/http';

/** Custom components **/
import { AppComponent } 	from './app.component';
import { GameDetailComponent }  from './game-detail.component';
import { LoginComponent }       from './login.component';
import { HeaderComponent }      from './header.component';

/** Custom services **/
import { GameService } from './game.service';
import { CloudmineService } from './cloudmine.service';
import { UserService } from './user.service';

/** Custom models **/
import { SortSelector } from './sort-selector';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';


@NgModule({
    imports: [ BrowserModule, FormsModule, HttpModule, Ng2Bs3ModalModule ],
    declarations: [ AppComponent, GameDetailComponent, SortSelector, LoginComponent, HeaderComponent ],
    providers: [ GameService, CloudmineService, UserService ],
    bootstrap: [ AppComponent]
})
export class AppModule { }
