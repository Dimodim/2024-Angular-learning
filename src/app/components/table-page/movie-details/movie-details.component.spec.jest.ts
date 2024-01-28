import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import * as fromStore from '../../../store';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createMovieDetails } from 'src/shared/mocks/factories/movie-details.factory';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let store: MockStore<fromStore.IState>;
  let router: Router;
  let storeSpy: jest.SpyInstance;
  let navigateSpy: jest.SpyInstance;

  const mockActivatedRoute = {
    paramMap: of(new Map([['id', '1']])),
  };
  const mockMovieDetails = createMovieDetails();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        NoopAnimationsModule,
        MatButtonModule,
        BrowserModule,
      ],
      declarations: [MovieDetailsComponent],
      providers: [
        provideMockStore(),
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;

    store = TestBed.inject<MockStore<fromStore.IState>>(MockStore);
    store.overrideSelector(fromStore.selectMovieDetailsState, mockMovieDetails);
    router = TestBed.inject<Router>(Router);
    storeSpy = jest.spyOn(store, 'dispatch');
    navigateSpy = jest.spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getMovieDetails action on init with route param', () => {
    expect(storeSpy).toHaveBeenCalledWith(
      fromStore.getMovieDetails({ payload: '1' })
    );
  });

  it('should dispatch bustCashe action on button click', () => {
    fixture.nativeElement.querySelector('#clear-cashe-button').click();
    expect(storeSpy).toHaveBeenCalledWith(
      fromStore.clearMovieDetailsCashe()
    );
  });

  it('should display movie details correctly', () => {
    const titleElement =
      fixture.debugElement.nativeElement.querySelector('#title');
    expect(titleElement.textContent).toContain(mockMovieDetails.title);
  });

  it('should navigate back to movies list on back click', () => {
    fixture.nativeElement.querySelector('#navigate-button').click();

    expect(navigateSpy).toHaveBeenCalledWith(['movies']);
  });
});
