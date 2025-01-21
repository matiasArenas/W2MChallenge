import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActionsModalComponent } from "./actions-modal.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

describe('ActionsModalComponent', () => {
  let component: ActionsModalComponent;
  let fixture: ComponentFixture<ActionsModalComponent>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<ActionsModalComponent>>;

  beforeEach(async () => {
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ActionsModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener valores predeterminados para los inputs', () => {
    expect(component.title).toBe('Eliminar Heroe');
    expect(component.message).toBe('¿Deseas eliminar el hèroe seleccionado?');
    expect(component.buttonTitle).toBe('Eliminar');
  });

  it('debe cerrar el diálogo con true cuando se confirma', () => {
    component.onConfirm();

    expect(dialogRefMock.close).toHaveBeenCalledWith(true); 
  });

  it('debe cerrar el diálogo con false cuando se cancela', () => {
    component.onCancel();

    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });
});
