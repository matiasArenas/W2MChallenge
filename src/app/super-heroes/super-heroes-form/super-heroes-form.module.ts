import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuperHeroesFormComponent } from './super-heroes-form.component';
import { SuperHeroesFormRoutingModule } from './super-heroes-form-routing.module';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomUppercaseDirective } from '../../directive/custom-uppercase.directive';



@NgModule({
  declarations: [SuperHeroesFormComponent, CustomUppercaseDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SuperHeroesFormRoutingModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class SuperHeroesFormModule { }
