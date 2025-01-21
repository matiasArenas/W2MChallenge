import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-actions-modal',
  standalone: false,
  templateUrl: './actions-modal.component.html',
  styleUrl: './actions-modal.component.scss'
})

export class ActionsModalComponent {
  @Input() title: string = 'Eliminar Heroe';
  @Input() message: string = '¿Deseas eliminar el hèroe seleccionado?';
  @Input() buttonTitle: string = 'Eliminar';

  constructor(private dialogRef: MatDialogRef<ActionsModalComponent>){}

  onConfirm(){
    this.dialogRef.close(true);
  }

  onCancel(){
    this.dialogRef.close(false);
  }

}
