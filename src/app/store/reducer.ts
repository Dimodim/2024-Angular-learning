import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import * as fromActions from './actions';
import { TabelItem } from '../../shared/models/tabel-item.model';
import { Movie } from 'src/shared/models/movies.model';
import { MovieDetails } from 'src/shared/models/movie-details';

export interface IState {
  tableData: Array<TabelItem>;
  movies: Array<Movie>;
  movieDetails: MovieDetails | null;
  errorText: string;
  loading: boolean;
}

export const tableInitialState: IState = {
  tableData: [],
  movies: [],
  movieDetails: null,
  loading: false,
  errorText: '',
};

export const tableReducer = createReducer(
  tableInitialState,
  on(fromActions.getTableResults, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromActions.getTableResultsSuccess, (state, { payload }) => ({
    ...state,
    tableData: payload,
  })),
  on(fromActions.getTableResultsFailed, (state, { payload }) => ({
    ...state,
    errorText: payload,
  })),

  on(fromActions.getMovies, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromActions.getMoviesSuccess, (state, { payload }) => ({
    ...state,
    movies: payload.results,
  })),
  on(fromActions.getMoviesFailed, (state, { payload }) => ({
    ...state,
    errorText: payload,
  })),
  on(fromActions.getMovieDetails, (state) => ({
    ...state,
    loading: true,
  })),
  on(fromActions.getMovieDetailsSuccess, (state, { payload }) => ({
    ...state,
    movieDetails: payload,
  })),
  on(fromActions.getMovieDetailsFailed, (state, { payload }) => ({
    ...state,
    errorText: payload,
  }))
);

/////// SELECTORS ///////
const selectFeature = createFeatureSelector<IState>('tableFeature');

export const selectTableState = createSelector(
  selectFeature,
  (state) => state.movies
);

export const selectMovieDetailsState = createSelector(
  selectFeature,
  (state) => state.movieDetails
);
