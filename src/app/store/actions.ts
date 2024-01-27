import { createAction, props } from '@ngrx/store';

export const getTableResults = createAction('[Table] Get Table Results');
export const getTableResultsSuccess = createAction(
  '[Table] Get Table Results Success',
  props<{ payload: any }>()
);
export const getTableResultsFailed = createAction(
  '[Table] Get Table Results Failed',
  props<{ payload: string }>()
);

export const getMovies = createAction('[Table] Get Movies');
export const getMoviesSuccess = createAction(
  '[Table] Get Movies Success',
  props<{ payload: any }>()
);
export const getMoviesFailed = createAction(
  '[Table] Get Movies Failed',
  props<{ payload: any }>()
);
