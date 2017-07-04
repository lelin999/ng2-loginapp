import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { Auth, BiglyStuff } from './UI';
import { ApiService, AuthService } from './services';
import { routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    Auth,
    BiglyStuff,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    routes,
    HttpModule,
    FormsModule
  ],
  providers: [
  	ApiService,
  	AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }