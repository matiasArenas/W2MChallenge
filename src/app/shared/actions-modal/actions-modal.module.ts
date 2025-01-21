import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ActionsModalComponent } from './actions-modal.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ActionsModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ActionsModalModule { }
