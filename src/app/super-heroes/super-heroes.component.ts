import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SuperHeroes } from '../interface/super-hero.interface';
import { mockSuperHeroes } from '../mock/super-heroes.mock';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SuperHeroesService } from '../services/super-heroes.service';
import { filter, finalize, Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActionsModalComponent } from '../shared/actions-modal/actions-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-super-heroes',
  standalone: false,
  templateUrl: './super-heroes.component.html',
  styleUrl: './super-heroes.component.scss',
})
export class SuperHeroesComponent implements OnInit, OnChanges, OnDestroy {
  heroesSubscription: Subscription = new Subscription();
  searchInputValue: string = '';
  superHeroes: SuperHeroes[] = mockSuperHeroes;
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  dataSource = new MatTableDataSource<SuperHeroes>([]);
  loading$: Observable<boolean>;
  searchDisclaimer!:string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: Router,
    private superHeroesService: SuperHeroesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.loading$ = this.superHeroesService.loading$;
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cdr.detectChanges();
    this.setPaginator();
  }

  getHeroes() {
    this.heroesSubscription.add(
      this.superHeroesService.getHeroes().pipe(
        finalize(() => {
          this.cdr.detectChanges();
          this.setPaginator();
        })
      ).subscribe(data => {
        this.dataSource.data = data;
      })
    );
  }

  setPaginator() {
    this.dataSource.paginator = this.paginator;
  }

  onSearchChange(term: string) {
    this.heroesSubscription.add(
      this.superHeroesService.searchHeroes(term).subscribe((filteredHeroes) => {
          this.dataSource.data = filteredHeroes;
          this.searchDisclaimer = this.superHeroesService.heroDisclaimer;
        if (this.paginator) {
          this.setPaginator();
        }
      })
    );
  }

  clearSearch() {
    this.searchInputValue = '';
    this.searchDisclaimer = '';
    this.getHeroes();
  }

  goToAddNewHero() {
    this.router.navigate(['super-heroes/form']);
  }

  goToEditHero(id: number) {
    this.router.navigate([`super-heroes/form/${id}`]);
  }

  deleteHero(id: number) {
    this.heroesSubscription.add(
      this.superHeroesService.deleteHero(id).subscribe((data) => {
        if (data) {
          this.showSnackbar('Héroe eliminado exitosamente', 'Cerrar');
          this.getHeroes();
        }
      })
    );
  }

  openDeleteDialog(id: number): void {
    const dialogRef = this.dialog.open(ActionsModalComponent, {
      width: '250px',
    });
    this.heroesSubscription.add(
      dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
        if (result) {
          this.deleteHero(id);
        }
      })
    );
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
