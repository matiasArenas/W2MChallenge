import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperHeroesFormComponent } from './super-heroes-form.component';

const routes: Routes = [
  {
    path: '',
    component: SuperHeroesFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperHeroesFormRoutingModule {}
