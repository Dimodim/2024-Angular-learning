import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TablePageComponent } from './table-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatButtonModule } from '@angular/material/button';

import * as fromStore from '../../store';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createMovie } from 'src/shared/mocks/factories/movie.factory';

describe('TablePageComponent', () => {
  let component: TablePageComponent;
  let fixture: ComponentFixture<TablePageComponent>;
  let store: MockStore<fromStore.IState>;
  let router: Router;
  let storeSpy: jest.SpyInstance;

  const mockMovies = [createMovie()];

  const selectElement = (selector: string) => {
    return fixture.nativeElement.querySelector(selector);
  };
  const selectElements = (selector: string) => {
    return fixture.nativeElement.querySelectorAll(selector);
  };

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
    });

    fixture = TestBed.createComponent(TablePageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject<MockStore<fromStore.IState>>(MockStore);
    store.overrideSelector(fromStore.selectTableState, mockMovies);
    router = TestBed.inject<Router>(Router);
    storeSpy = jest.spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getTableResults action on init', () => {
    expect(storeSpy).toHaveBeenCalledWith(fromStore.getMovies());
  });

  it('should display table with correct number of rows', () => {
    expect(selectElements('#table tbody tr').length).toBe(1);
  });

  it('should have correct data in table', () => {
    const data = mockMovies[0];
    const title = fixture.debugElement.query(By.css('#title-0'));
    const voteAverage = fixture.debugElement.query(By.css('#vote-average-0'));
    const voteCount = fixture.debugElement.query(By.css('#vote-count-0'));
    const releaseDate = fixture.debugElement.query(By.css('#release-date-0'));
    const language = fixture.debugElement.query(By.css('#language-0'));

    expect(title.nativeElement.textContent).toContain(data.original_title);
    expect(voteAverage.nativeElement.textContent.trim()).toContain(
      data.vote_average + ''
    );
    expect(voteCount.nativeElement.textContent.trim()).toContain(""+data.vote_count);
    expect(releaseDate.nativeElement.textContent).toContain(data.release_date);
    expect(language.nativeElement.textContent).toContain(
      data.original_language
    );
    expect(selectElement('#navigate-button-0').textContent).toContain('Details');
  });

  it('should navigate on details button click', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    selectElement('#navigate-button-0').click();

    expect(navigateSpy).toHaveBeenCalledWith(['movies/1']);
  });
});
