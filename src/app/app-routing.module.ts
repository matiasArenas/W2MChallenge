import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperHeroesComponent } from './super-heroes/super-heroes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'super-heroes',
    pathMatch: 'full'
  },
  {
    path: 'super-heroes',
    component: SuperHeroesComponent
  },
  {
    path: 'super-heroes/form',
    loadChildren: () => import('./super-heroes/super-heroes-form/super-heroes-form.module').then(m => m.SuperHeroesFormModule)
  },
  {
    path: 'super-heroes/form/:id',
    loadChildren: () => import('./super-heroes/super-heroes-form/super-heroes-form.module').then(m => m.SuperHeroesFormModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
