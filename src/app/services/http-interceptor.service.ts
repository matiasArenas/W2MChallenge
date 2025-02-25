import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SuperHeroesService } from './super-heroes.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private supeHeroesService: SuperHeroesService) {}

  intercept = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    this.supeHeroesService.showSpinner();
    return next.handle(req).pipe(
      finalize(() => {
        this.supeHeroesService.hideSpinner();
      })
    );
  };
}
