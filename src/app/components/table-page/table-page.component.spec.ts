import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TablePageComponent } from './table-page.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import * as fromStore from '../../store';
import { Router } from '@angular/router';
import { createMovie } from 'src/shared/mocks/factories/movie.factory';

describe('TablePageComponent', () => {
  let component: TablePageComponent;
  let fixture: ComponentFixture<TablePageComponent>;
  let store: MockStore<fromStore.IState>;
  let router: Router;

  const mockMovies = [createMovie()];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablePageComponent],
      imports: [
        MatButtonModule,
        MatTableModule,
        RouterTestingModule,
        BrowserModule,
        NoopAnimationsModule,
        MatTableModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(TablePageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.overrideSelector(fromStore.selectTableState, mockMovies);
    router = TestBed.inject(Router);
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(router, 'navigate').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getTableResults action on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(fromStore.getMovies());
  });

  it('should display table with correct number of rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('#table tbody tr');
    expect(rows.length).toBe(mockMovies.length);
  });

  it('should have correct data in table', () => {
    const data = mockMovies[0];
    const title = fixture.debugElement.query(By.css('#title-0')).nativeElement;
    const voteAverage = fixture.debugElement.query(By.css('#vote-average-0')).nativeElement;
    const voteCount = fixture.debugElement.query(By.css('#vote-count-0')).nativeElement;
    const releaseDate = fixture.debugElement.query(By.css('#release-date-0')).nativeElement;
    const language = fixture.debugElement.query(By.css('#language-0')).nativeElement;

    expect(title.textContent).toContain(data.original_title);
    expect(voteAverage.textContent.trim()).toContain(`${data.vote_average}`);
    expect(voteCount.textContent.trim()).toContain(`${data.vote_count}`);
    expect(releaseDate.textContent).toContain(data.release_date);
    expect(language.textContent).toContain(data.original_language);
    expect(fixture.nativeElement.querySelector('#navigate-button-0').textContent).toContain('Details');
  });

  it('should navigate on details button click', () => {
    const navigateButton = fixture.debugElement.query(By.css('#navigate-button-0')).nativeElement;
    navigateButton.click();
    expect(router.navigate).toHaveBeenCalledWith(['movies/1']);
  });
});
