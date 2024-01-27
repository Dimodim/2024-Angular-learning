import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IState } from 'src/app/store';

import * as fromStore from '../../store';
import { Router } from '@angular/router';
// import { CacheService } from 'src/services/cashe.service';

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
})
export class TablePageComponent implements OnInit {
  state$ = this._store.select(fromStore.selectTableState);
  displayedColumns = ['title', 'rating', 'votes', 'realease', 'language'];
  constructor(private _store: Store<IState>, private _router: Router) {}

  ngOnInit() {
    this._store.dispatch(fromStore.getMovies());
  }

  onNavigate(id: string) {
    this._router.navigate([`form-page/${id}`]);
  }
}
