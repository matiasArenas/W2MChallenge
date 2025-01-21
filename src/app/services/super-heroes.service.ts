import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SuperHeroes } from '../interface/super-hero.interface';
import { mockSuperHeroes } from '../mock/super-heroes.mock';
import { delay, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroesService {
  heroes: SuperHeroes[] = mockSuperHeroes;
  heroesSubject = new BehaviorSubject<SuperHeroes[]>(this.heroes);
  heroes$ = this.heroesSubject.asObservable();
  heroDisclaimer = '';
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  showSpinner() {
    this.loadingSubject.next(true);
  }

  hideSpinner() {
    this.loadingSubject.next(false);
  }

  getHeroes(): Observable<SuperHeroes[]> {
    this.showSpinner();
    return of(this.heroes).pipe(
      delay(1000),
      finalize(() => this.hideSpinner())
    );
  }

  getHeroeById(id: number): Observable<SuperHeroes | undefined> {
    const heroe = this.heroes.find((h) => h.id === id);
    return of(heroe);
  }

  searchHeroes(term: string): Observable<SuperHeroes[]> {
    if (!term) {
      return of(this.heroes);
    }
    const lowerCaseTerm = term.toLowerCase();
    const isNumericTerm = !isNaN(Number(term));
    const result = this.heroes.filter((h) => {
      return (
        h.name.toLowerCase().includes(lowerCaseTerm) ||
        (isNumericTerm && h.id === Number(term))
      );
    });
    if (result.length > 0) {
      this.heroDisclaimer = '';
      return of(result);
    } else {
      this.heroDisclaimer =
        'No existen Héroes para el criterio de busqueda aplicado, intenta con otra opción';
      return of(this.heroes);
    }
  }

  createHero(heroe: SuperHeroes): Observable<SuperHeroes> {
    const newHero = { ...heroe };
    this.heroes.push(newHero);
    this.heroesSubject.next(this.heroes);
    return of(newHero);
  }

  updateHero(heroe: SuperHeroes, id: number): Observable<SuperHeroes> {
    const heroId = typeof heroe.id === 'string' ? Number(heroe.id) : heroe.id;
    const index = this.heroes.findIndex((h) => h.id === id);
    console.log(heroe, index);
    if (index !== -1) {
      this.heroes[index] = { id: heroId, name: heroe.name };
      this.heroesSubject.next(this.heroes);
      return of(heroe);
    } else {
      return of();
    }
  }

  deleteHero(id: number): Observable<boolean> {
    const index = this.heroes.findIndex((h) => h.id === id);
    if (index !== -1) {
      this.heroes.splice(index, 1);
      this.heroesSubject.next(this.heroes);
      return of(true);
    } else {
      return of(false);
    }
  }
}
