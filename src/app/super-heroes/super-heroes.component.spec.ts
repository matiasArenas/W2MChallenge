import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperHeroesComponent } from './super-heroes.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SuperHeroesService } from '../services/super-heroes.service';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mockSuperHeroes } from '../mock/super-heroes.mock';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActionsModalComponent } from '../shared/actions-modal/actions-modal.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { fakeAsync, tick } from '@angular/core/testing';

describe('SuperHeroesComponent', () => {
  let component: SuperHeroesComponent;
  let fixture: ComponentFixture<SuperHeroesComponent>;
  let superHeroesServiceMock: jasmine.SpyObj<SuperHeroesService>;
  let routerMock: jasmine.SpyObj<Router>;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    superHeroesServiceMock = jasmine.createSpyObj('SuperHeroesService', [
      'getHeroes',
      'searchHeroes',
      'deleteHero',
      'heroDisclaimer',
    ]);
    superHeroesServiceMock.getHeroes.and.returnValue(of(mockSuperHeroes));
    superHeroesServiceMock.deleteHero.and.returnValue(of(true));

    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    // Mock para MatDialog
    const dialogRefMock = { afterClosed: jasmine.createSpy().and.returnValue(of(true)) };
    dialogMock.open.and.returnValue(dialogRefMock as any);

    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatPaginatorModule],
      declarations: [SuperHeroesComponent],
      providers: [
        { provide: SuperHeroesService, useValue: superHeroesServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: MatDialog, useValue: dialogMock },
        provideAnimations(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar los héroes al inicializar el componente', () => {
    superHeroesServiceMock.getHeroes.and.returnValue(of(mockSuperHeroes));

    component.ngOnInit();

    expect(superHeroesServiceMock.getHeroes).toHaveBeenCalled();
  });

  it('debe filtrar los héroes correctamente cuando se realiza una búsqueda', () => {
    const searchTerm = 'Spider';
    const filteredHeroes = mockSuperHeroes.filter(hero => hero.name.includes(searchTerm));
  
    superHeroesServiceMock.searchHeroes.and.returnValue(of(filteredHeroes));

    component.onSearchChange(searchTerm);
  
    expect(superHeroesServiceMock.searchHeroes).toHaveBeenCalledWith(searchTerm);
    expect(component.dataSource.data).toEqual(filteredHeroes);
  });

  it('debe limpiar la búsqueda y recargar los héroes', () => {
    component.clearSearch();

    expect(component.searchInputValue).toBe('');
    expect(component.searchDisclaimer).toBe('');
    expect(superHeroesServiceMock.getHeroes).toHaveBeenCalled();
  });

  it('debe navegar a la página de agregar un nuevo héroe', () => {
    component.goToAddNewHero();

    expect(routerMock.navigate).toHaveBeenCalledWith(['super-heroes/form']);
  });

  it('debe navegar a la página de editar un héroe', () => {
    const heroId = 1;
    component.goToEditHero(heroId);

    expect(routerMock.navigate).toHaveBeenCalledWith([`super-heroes/form/${heroId}`]);
  });

  it('debe eliminar un héroe correctamente', fakeAsync(() => {
    const heroId = 1;

    component.deleteHero(heroId);

    tick();

    expect(superHeroesServiceMock.deleteHero).toHaveBeenCalledWith(heroId);
    expect(snackBarMock.open).toHaveBeenCalledWith('Héroe eliminado exitosamente', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }));

  it('debe abrir el diálogo de confirmación para eliminar un héroe', fakeAsync(() => {
    const heroId = 1;

    component.openDeleteDialog(heroId);

    tick();

    expect(dialogMock.open).toHaveBeenCalledWith(ActionsModalComponent, { width: '250px' });
    expect(superHeroesServiceMock.deleteHero).toHaveBeenCalledWith(heroId);
  }));

  it('debe cancelar la suscripción en ngOnDestroy', () => {
    const unsubscribeSpy = spyOn(component.heroesSubscription, 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
