import { VendingComponent } from './vending/vending.component';
import { HandlefetchComponent } from './handlefetch/handlefetch.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinalComponent } from './final/final.component';


const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'handle',
    component: HandlefetchComponent
  },
  {
    path: 'vend',
    component: VendingComponent
  },
  {
    path: 'final',
    component: FinalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
