import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, throwError } from 'rxjs';
import { TableEffects } from './effects';
import { TableService } from '../../services/table.service';
import { errorMessage } from '../../shared/mocks/messages/messages';
import { createMovie } from 'src/shared/mocks/factories/movie.factory';
import { createMovieDetails } from 'src/shared/mocks/factories/movie-details.factory';

import * as fromActions from './actions';

describe('TableEffects', () => {
  let actions: any;
  let effects: TableEffects;
  let tableService: jest.Mocked<TableService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TableEffects,
        provideMockActions(() => actions),
        {
          provide: TableService,
          useValue: {
            getPopularMovies: jest.fn(),
            getMovieDetails: jest.fn(),
          },
        },
      ],
    });

    effects = TestBed.inject(TableEffects);
    tableService = TestBed.inject(TableService) as jest.Mocked<TableService>;
  });

  it('should return getMoviesSuccess on successful API call', (done) => {
    const mockMovies = [createMovie()];

    actions = of(fromActions.getMovies());
    tableService.getPopularMovies.mockReturnValue(of(mockMovies));

    effects.getMovies$.subscribe((result) => {
      expect(result).toEqual(
        fromActions.getMoviesSuccess({ payload: mockMovies })
      );
      expect(tableService.getPopularMovies).toHaveBeenCalled();
      done();
    });
  });

  it('should return getMoviesFailed on failed API call', (done) => {
    actions = of(fromActions.getMovies());
    tableService.getPopularMovies.mockReturnValue(
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
    const mockMovie = createMovieDetails();

    actions = of(fromActions.getMovieDetails({ payload: '1' }));
    tableService.getMovieDetails.mockReturnValue(of(mockMovie));

    effects.getMovieDetails$.subscribe((result) => {
      expect(result).toEqual(
        fromActions.getMovieDetailsSuccess({ payload: mockMovie })
      );
      expect(tableService.getMovieDetails).toHaveBeenCalled();
      done();
    });
  });

  it('should return getMovieDetailsFailed on failed API call', (done) => {
    actions = of(fromActions.getMovieDetails({ payload: '1' }));
    tableService.getMovieDetails.mockReturnValue(
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
