import { BehaviorSubject, of, Subscription } from "rxjs";
import { SuperHeroesFormComponent } from "./super-heroes-form.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SuperHeroesService } from "../../services/super-heroes.service";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { SuperHeroes } from "../../interface/super-hero.interface";

describe('SuperHeroesFormComponent', () => {
  let component: SuperHeroesFormComponent;
  let fixture: ComponentFixture<SuperHeroesFormComponent>;
  let superHeroesServiceMock: jasmine.SpyObj<SuperHeroesService>;
  let snackBarMock: jasmine.SpyObj<MatSnackBar>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    superHeroesServiceMock = jasmine.createSpyObj('SuperHeroesService', [
      'getHeroeById',
      'heroesSubject',
      'createHero',
      'updateHero',
    ]);

    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    superHeroesServiceMock.heroesSubject = new BehaviorSubject<SuperHeroes[]>([
      { id: 1, name: 'Spiderman' },
      { id: 2, name: 'Iron Man' }
    ]);

    superHeroesServiceMock.getHeroeById.and.returnValue(of({ id: 1, name: 'Spiderman' }));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SuperHeroesFormComponent],
      providers: [
        FormBuilder,
        { provide: SuperHeroesService, useValue: superHeroesServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map([['id', '1']]),
            },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperHeroesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.heroesSubscription = new Subscription();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario correctamente en modo edición', () => {
    superHeroesServiceMock.getHeroeById.and.returnValue(of({ id: 1, name: 'Spiderman' }));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form.get('name')?.value).toBe('Spiderman');
    expect(component.form.get('id')?.value).toBe(1);
  });

  it('debe inicializar el título correctamente en modo edición', () => {
    superHeroesServiceMock.getHeroeById.and.returnValue(of({ id: 1, name: 'Spiderman' }));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.title).toBe('Edicion de super héroes');
  });

  it('debe editar un héroe correctamente cuando el formulario es válido', () => {
    const formValue = { id: 1, name: 'Spiderman' };
    component.form.setValue(formValue);

    superHeroesServiceMock.updateHero.and.returnValue(of(formValue));
    superHeroesServiceMock.getHeroeById.and.returnValue(of({ id: 1, name: 'Spiderman' }));

    component.onSubmit();

    expect(superHeroesServiceMock.updateHero).toHaveBeenCalledWith(formValue, 1);
    expect(snackBarMock.open).toHaveBeenCalledWith('Héroe editado exitosamente', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
    expect(routerMock.navigate).toHaveBeenCalledWith(['']);
  });

  it('debe cancelar la suscripción en ngOnDestroy', () => {
    const unsubscribeSpy = spyOn(component.heroesSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
