import { TestBed } from '@angular/core/testing';
import { SuperHeroesService } from './super-heroes.service';
import { mockSuperHeroes } from '../mock/super-heroes.mock';
import { SuperHeroes } from '../interface/super-hero.interface';

describe('SuperHeroesService', () => {
  let service: SuperHeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHeroesService);
  });

  it('debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener la lista de héroes', (done) => {
    const expectedHeroes = mockSuperHeroes;

    service.getHeroes().subscribe((heroes) => {
      expect(heroes).toEqual(expectedHeroes);
      done();
    });
  });

  it('debe buscar héroes por ID', (done) => {
    const searchTerm = '3';
    
    const expectedHero = mockSuperHeroes.find(hero => hero.id === Number(searchTerm));
  
    if (!expectedHero) {
      throw new Error(`No se encontró un héroe con el id ${searchTerm}`);
    }
    
    service.searchHeroes(searchTerm).subscribe((heroes) => {
      expect(heroes.length).toBe(1);
      expect(heroes[0]).toEqual(expectedHero);
      done();
    });
  });
  

  it('debe buscar héroes por nombre', (done) => {
    const searchTerm = 'Thor';
    
    const expectedHeroes = mockSuperHeroes.filter(hero => hero.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    service.searchHeroes(searchTerm).subscribe((heroes) => {
      expect(heroes).toEqual(expectedHeroes);
      done();
    });
  });
  
  it('debe devolver todos los héroes si no hay coincidencias en la búsqueda', (done) => {
    const searchTerm = 'NonExistingHero';
    
    service.searchHeroes(searchTerm).subscribe((heroes) => {
      expect(heroes).toEqual(mockSuperHeroes); 
      done();
    });
  });

  it('debe devolver todos los héroes cuando el término de búsqueda es vacío', (done) => {
    const searchTerm = '';
  
    service.searchHeroes(searchTerm).subscribe((heroes) => {
      expect(heroes).toEqual(mockSuperHeroes);
      done();
    });
  });

  it('debe buscar héroes por nombre de forma insensible a mayúsculas/minúsculas', (done) => {
    const searchTerm = 'thor';
  
    const expectedHeroes = mockSuperHeroes.filter(hero => hero.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
    service.searchHeroes(searchTerm).subscribe((heroes) => {
      expect(heroes).toEqual(expectedHeroes);
      done();
    });
  });

  it('debe devolver todos los héroes si el input de busqueda esta vacío', (done) => {
    const searchTerm = '';
  
    service.searchHeroes(searchTerm).subscribe((heroes) => {
      expect(heroes).toEqual(mockSuperHeroes);
      done();
    });
  });
  

  it('debe crear un nuevo héroe', (done) => {
    const newHero: SuperHeroes = { id: 4, name: 'Iron Man' };

    service.createHero(newHero).subscribe((hero) => {
      expect(hero).toEqual(newHero);
      done();
    });
  });

  it('debe actualizar un héroe existente', (done) => {
    const updatedHero: SuperHeroes = { id: 1, name: 'Spiderman - Updated' };

    service.updateHero(updatedHero, 1).subscribe((hero) => {
      expect(hero?.name).toBe('Spiderman - Updated');
    });
    done();
  });

  it('debe eliminar un héroe existente', (done) => {
    const heroId = 1; 

    service.deleteHero(heroId).subscribe((result) => {
      expect(result).toBe(true);
      done();
    });
  });

  it('debe retornar false cuando se intenta eliminar un héroe inexistente', (done) => {
    const heroId = 999;

    service.deleteHero(heroId).subscribe((result) => {
      expect(result).toBe(false);
      done();
    });
  });
});
