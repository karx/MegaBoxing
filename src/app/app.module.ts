import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HandlefetchComponent } from './handlefetch/handlefetch.component';
import { VendingComponent } from './vending/vending.component';
import { FinalComponent } from './final/final.component';
import {FormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs';




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
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
