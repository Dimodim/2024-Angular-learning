import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TableService } from '../../services/table.service';

import * as fromActions from './actions';

@Injectable()
export class TableEffects {
  getTradingPartnersList$: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(fromActions.getTableResults),
      mergeMap(() =>
        this._tableService.getTableResults().pipe(
          map((response) => fromActions.getTableResultsSuccess({ payload: response })),
          catchError((error)=> of(fromActions.getTableResultsFailed({payload: error})))
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _tableService: TableService){}
}
