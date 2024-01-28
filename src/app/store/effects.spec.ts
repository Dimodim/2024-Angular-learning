import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { TableEffects } from './effects';
import { TableService } from '../../services/table.service';
import { errorMessage } from '../../shared/mocks/messages/messages';
import { createMovie } from 'src/shared/mocks/factories/movie.factory';
import { createMovieDetails } from 'src/shared/mocks/factories/movie-details.factory';

import * as fromActions from './actions';

describe('TableEffects', () => {
  let actions$: Observable<any>;
  let effects: TableEffects;
  let tableService: TableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TableEffects,
        provideMockActions(() => actions$),
        {
          provide: TableService,
          useValue: jasmine.createSpyObj('TableService', [
            'getPopularMovies',
            'getMovieDetails',
          ]),
        },
      ],
    });

    effects = TestBed.inject(TableEffects);
    tableService = TestBed.inject(TableService);
  });

  it('should return getMoviesSuccess on successful API call', (done) => {
    const mockMovies = [createMovie()];
    actions$ = of(fromActions.getMovies());
    (tableService.getPopularMovies as jasmine.Spy).and.returnValue(
      of(mockMovies)
    );

    effects.getMovies$.subscribe((result) => {
      expect(result).toEqual(
        fromActions.getMoviesSuccess({ payload: mockMovies })
      );
      expect(tableService.getPopularMovies).toHaveBeenCalled();
      done();
    });
  });

  it('should return getMoviesFailed on failed API call', (done) => {
    actions$ = of(fromActions.getMovies());
    (tableService.getPopularMovies as jasmine.Spy).and.returnValue(
      throwError(() => errorMessage)
    );

    effects.getMovies$.subscribe((result) => {
      expect(result).toEqual(
        fromActions.getMoviesFailed({ payload: errorMessage })
      );
      expect(tableService.getPopularMovies).toHaveBeenCalled();
      done();
    });
  });

  it('should return getMovieDetailsSuccess on successful API call', (done) => {
    const mockMovieDetails = createMovieDetails();
    actions$ = of(fromActions.getMovieDetails({ payload: '1' }));
    (tableService.getMovieDetails as jasmine.Spy).and.returnValue(
      of(mockMovieDetails)
    );

    effects.getMovieDetails$.subscribe((result) => {
      expect(result).toEqual(
        fromActions.getMovieDetailsSuccess({ payload: mockMovieDetails })
      );
      expect(tableService.getMovieDetails).toHaveBeenCalled();
      done();
    });
  });

  it('should return getMovieDetailsFailed on failed API call', (done) => {
    actions$ = of(fromActions.getMovieDetails({ payload: '1' }));
    (tableService.getMovieDetails as jasmine.Spy).and.returnValue(
      throwError(() => errorMessage)
    );

    effects.getMovieDetails$.subscribe((result) => {
      expect(result).toEqual(
        fromActions.getMovieDetailsFailed({ payload: errorMessage })
      );
      expect(tableService.getMovieDetails).toHaveBeenCalled();
      done();
    });
  });
});
