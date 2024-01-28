import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../../store';
import { Store } from '@ngrx/store';
import { IState } from 'src/app/store';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  state$ = this._store.select(fromStore.selectMovieDetailsState);

  constructor(
    private _store: Store<IState>,
    private route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this._store.dispatch(fromStore.getMovieDetails({ payload: id }));
      }
    });
  }

  onBackClick() {
    this._router.navigate([`movies`]);
  }
}
