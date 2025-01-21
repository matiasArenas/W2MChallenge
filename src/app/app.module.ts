import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { SuperHeroesModule } from './super-heroes/super-heroes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    SuperHeroesModule,
    MatDividerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
