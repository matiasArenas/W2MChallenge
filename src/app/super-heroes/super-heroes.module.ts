import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperHeroesComponent } from './super-heroes.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { SuperHeroesFormModule } from './super-heroes-form/super-heroes-form.module';
import { FormsModule } from '@angular/forms';
import { ActionsModalModule } from '../shared/actions-modal/actions-modal.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '../services/http-interceptor.service';

@NgModule({
  declarations: [SuperHeroesComponent],
  imports: [
    CommonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    SuperHeroesFormModule,
    ActionsModalModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  exports: [SuperHeroesComponent],
})
export class SuperHeroesModule {}
