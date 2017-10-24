import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavigationComponent } from './common/partials/navigation/navigation.component';
import { AppRouterModule } from './app.router';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
