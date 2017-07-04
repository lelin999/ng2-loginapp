import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Auth, BiglyStuff } from './UI';
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }