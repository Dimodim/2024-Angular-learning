import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TableService } from '../../services/table.service';

import * as fromActions from './actions';
import { CacheService } from 'src/services/cashe.service';

@Injectable()
export class TableEffects {
  getMovies$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(fromActions.getMovies),
      mergeMap(() =>
        this._tableService.getPopularMovies().pipe(
          map((response) =>
            fromActions.getMoviesSuccess({ payload: response })
          ),
          catchError((error) =>
            of(fromActions.getMoviesFailed({ payload: error }))
          )
        )
      )
    )
  );

  getMovieDetails$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(fromActions.getMovieDetails),
      mergeMap(({ payload }) =>
        this._tableService.getMovieDetails(payload).pipe(
          map((response) =>
            fromActions.getMovieDetailsSuccess({ payload: response })
          ),
          catchError((error) =>
            of(fromActions.getMovieDetailsFailed({ payload: error }))
          )
        )
      )
    )
  );

  clearMovieDetailsCashe$: Observable<Action> = createEffect(
    () =>
      this._actions$.pipe(
        ofType(fromActions.clearMovieDetailsCashe),
        tap(() => this._casheService.clearCache())
      ),
    { dispatch: false }
  );

  constructor(
    private _actions$: Actions,
    private _tableService: TableService,
    private _casheService: CacheService
  ) {}
}
