import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutingModule } from '@fr-spl/core';

import { Comp1Component } from '../comp1/comp1.component';
import { Comp2Component } from '../comp2/comp2.component';
import { HomePageComponent } from '../home-page/home-page.component';

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'page1', component: Comp1Component },
  { path: 'page2', component: Comp2Component },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    /*
    * Management routing state now done in RoutingModule,
    * `todo` app or `user` app now does not have to care about `@ngrx/route-store` anymore,
    * just do its job: define root route for the app
    */
    RoutingModule.forRoot(),
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
