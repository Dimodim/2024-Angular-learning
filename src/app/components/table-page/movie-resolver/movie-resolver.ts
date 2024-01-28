import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { take, tap, switchMap, catchError } from 'rxjs/operators';
import * as fromStore from '../../../store';

@Injectable({
  providedIn: 'root',
})
export class MoviesResolver implements Resolve<boolean> {
  constructor(private store: Store<fromStore.IState>) {}

  resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(fromStore.selectTableState),
      tap((movies) => {
        if (!movies?.length) {
          this.store.dispatch(fromStore.getMovies());
        }
      }),
      take(1),
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }
}
