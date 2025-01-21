import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SuperHeroesService } from './super-heroes.service';
import { HttpInterceptorService } from './http-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { of } from 'rxjs';

describe('HttpInterceptorService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let superHeroesService: SuperHeroesService;

  let superHeroesServiceMock: jasmine.SpyObj<SuperHeroesService>;

  beforeEach(() => {
    superHeroesServiceMock = jasmine.createSpyObj('SuperHeroesService', ['showSpinner', 'hideSpinner']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: SuperHeroesService, useValue: superHeroesServiceMock },
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    superHeroesService = TestBed.inject(SuperHeroesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debe mostrar y ocultar el spinner durante la petición HTTP', () => {
    const testUrl = '/api/superheroes';
    
    httpClient.get(testUrl).subscribe();

    expect(superHeroesServiceMock.showSpinner).toHaveBeenCalled();

    const req = httpTestingController.expectOne(testUrl);
    req.flush({});

    expect(superHeroesServiceMock.hideSpinner).toHaveBeenCalled();
  });

  it('debe manejar errores de la petición y ocultar el spinner', () => {
    const testUrl = '/api/superheroes';

    httpClient.get(testUrl).subscribe({
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    expect(superHeroesServiceMock.showSpinner).toHaveBeenCalled();

    const req = httpTestingController.expectOne(testUrl);
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });

    expect(superHeroesServiceMock.hideSpinner).toHaveBeenCalled();
  });
});
