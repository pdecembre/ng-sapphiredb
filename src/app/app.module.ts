import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RealtimeDatabaseModule} from 'ng-realtime-database';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Angular2PromiseButtonModule} from 'angular2-promise-buttons';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RealtimeDatabaseModule.config({
      serverBaseUrl: environment.serverBaseUrl,
      loginRedirect: 'account/login',
      unauthorizedRedirect: 'account/unauthorized',
      apiSecret: 'pw1234',
      apiKey: 'webapp',
      connectionType: 'sse'
    }),
    AppRoutingModule,
    Angular2PromiseButtonModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
