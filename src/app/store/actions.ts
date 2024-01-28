import { createAction, props } from '@ngrx/store';

export const getMovies = createAction('[Table] Get Movies');
export const getMoviesSuccess = createAction(
  '[Table] Get Movies Success',
  props<{ payload: any }>()
);
export const getMoviesFailed = createAction(
  '[Table] Get Movies Failed',
  props<{ payload: any }>()
);

export const getMovieDetails = createAction(
  '[Details] Get Movie Details',
  props<{ payload: any }>()
);
export const getMovieDetailsSuccess = createAction(
  '[Details] Get Movie Details Success',
  props<{ payload: any }>()
);
export const getMovieDetailsFailed = createAction(
  '[Details] Get Movie Details Failed',
  props<{ payload: any }>()
);

export const clearMovieDetailsCache = createAction(
  '[Details] Clear Movie Details Cache'
);
