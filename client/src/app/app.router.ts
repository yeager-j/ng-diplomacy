import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {}
