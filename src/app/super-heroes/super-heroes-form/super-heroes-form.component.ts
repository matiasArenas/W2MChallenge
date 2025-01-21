import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperHeroesService } from '../../services/super-heroes.service';
import { Subscription } from 'rxjs';
import { SuperHeroes } from '../../interface/super-hero.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-super-heroes-form',
  templateUrl: './super-heroes-form.component.html',
  styleUrls: ['./super-heroes-form.component.scss'],
  standalone: false,
})
export class SuperHeroesFormComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
   heroesSubscription: Subscription = new Subscription();
  isEditMode = false;
  title = '';
  heroName = '';
  heroId!: number;
  lastHeroId!:number;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private superHeroesService: SuperHeroesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getHeroId();
    this.getLastHeroId();
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      id: [this.isEditMode ? this.heroId : this.lastHeroId , [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      name: [
        this.isEditMode ? this.heroName : '',
        [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)],
      ],
    });
  }

  getHeroId() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.heroesSubscription.add(
        this.superHeroesService.getHeroeById(parseInt(id)).subscribe((data) => { console.log('data',data)
          if (data) {
            this.heroName = data?.name;
            this.heroId = data?.id;
          }
        })
      );
    }
    this.setTitle(this.isEditMode);
  }

  getLastHeroId(){
    this.heroesSubscription.add(
      this.superHeroesService.heroesSubject.subscribe((data:SuperHeroes[])=>{
        data.map((h)=>{
          this.lastHeroId = h.id + 1;
        })
      })
    );
  }

  setTitle(editHero: boolean) {
    this.title = editHero ? 'Edicion de super héroes' : 'Alta de super héroes';
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isEditMode) {
        this.heroesSubscription.add(
          this.superHeroesService.updateHero(this.form.value, this.heroId).subscribe((data)=>{
            if(data){
              this.showSnackbar('Héroe editado exitosamente', 'Cerrar');
              this.router.navigate(['']);
            }
          })
        );
      } else {
        this.heroesSubscription.add(
          this.superHeroesService.createHero(this.form.value).subscribe((data)=>{
            if(data){
              this.showSnackbar('Héroe cargado exitosamente', 'Cerrar');
              this.router.navigate(['']);
            }
          })
        );
      }
    }
  }

  showSnackbar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }

  ngOnDestroy(): void {
    this.heroesSubscription.unsubscribe();
  }
}
