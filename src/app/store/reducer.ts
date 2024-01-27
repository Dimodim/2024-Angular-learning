import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import * as fromActions from './actions';
import { TabelItem } from '../../shared/models/tabel-item.model';

export interface IState {
    tableData: Array<TabelItem>;
  errorText: string
  loading: boolean
}

export const tableInitialState: IState = {
  tableData: [],
  loading: false,
  errorText: '',
};

export const tableReducer = createReducer(
  tableInitialState,
  on(fromActions.getTableResults, (state) => ({
    ...state,
   loading: true
  })),
  on(fromActions.getTableResultsSuccess, (state, { payload }) => ({
    ...state,
    tableData: payload
  })),
  on(fromActions.getTableResultsFailed, (state, { payload }) => ({
    ...state,
    errorText: payload
  }))
);

/////// SELECTORS ///////
const selectFeature = createFeatureSelector<IState>('tableFeature');

export const selectTableState = createSelector(selectFeature, (state) => state.tableData);
