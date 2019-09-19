import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HandlefetchComponent } from './handlefetch/handlefetch.component';
import { VendingComponent } from './vending/vending.component';
import { FinalComponent } from './final/final.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HandlefetchComponent,
    VendingComponent,
    FinalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
