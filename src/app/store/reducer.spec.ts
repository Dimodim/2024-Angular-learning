import { tableInitialState, tableReducer } from './reducer';
import { createMovie } from 'src/shared/mocks/factories/movie.factory';
import { errorMessage } from 'src/shared/mocks/messages/messages';
import { createMovieDetails } from 'src/shared/mocks/factories/movie-details.factory';
import * as fromActions from './actions';

describe('Table Reducer', () => {
  it('should set loading to true on getMovies action', () => {
    const initialState = tableInitialState;

    const newState = tableReducer(initialState, fromActions.getMovies());

    expect(newState.loading).toBe(true);
  });

  it('should set movies on getMoviesSuccess action', () => {
    const movies = [createMovie()];
    const initialState = tableInitialState;

    const newState = tableReducer(
      initialState,
      fromActions.getMoviesSuccess({ payload: { results: movies } })
    );

    expect(newState.movies).toEqual([createMovie()]);
  });

  it('should set error on getMoviesFalse action', () => {
    const initialState = tableInitialState;

    const newState = tableReducer(
      initialState,
      fromActions.getMoviesFailed({ payload: errorMessage })
    );

    expect(newState.errorText).toBe(errorMessage);
  });

  it('should set loading to true on getMovieDetails action', () => {
    const initialState = tableInitialState;

    const newState = tableReducer(
      initialState,
      fromActions.getMovieDetails({ payload: '1' })
    );

    expect(newState.loading).toBe(true);
  });

  it('should set movieDetails on getMovieDetailsSuccess action', () => {
    const movie = createMovieDetails();
    const initialState = tableInitialState;

    const newState = tableReducer(
      initialState,
      fromActions.getMovieDetailsSuccess({ payload: movie })
    );

    expect(newState.movieDetails).toBe(movie);
  });

  it('should set error on getMovieDetailsFailed action', () => {
    const initialState = tableInitialState;

    const newState = tableReducer(
      initialState,
      fromActions.getMovieDetailsFailed({ payload: errorMessage })
    );

    expect(newState.errorText).toBe(errorMessage);
  });
});
