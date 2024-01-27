import { tableInitialState, tableReducer } from './reducer';
import { createTableItem } from '../../shared/mocks/factories/table-item';

import * as fromActions from './actions';

describe('Table Reducer', () => {
  it('should set loading to true on getTableResults action', () => {
    const initialState = tableInitialState;

    const newState = tableReducer(initialState, fromActions.getTableResults());

    expect(newState.loading).toBe(true);
  });

  it('should set table data on getTableResultsSuccess action', () => {
    const initialState = tableInitialState;
    const payload = [createTableItem()];

    const newState = tableReducer(initialState, fromActions.getTableResultsSuccess({ payload }));

    expect(newState.tableData).toEqual(payload);
  });

  it('should set error text on getTableResultsFailed action', () => {
    const initialState = tableInitialState;
    const payload = 'error';

    const newState = tableReducer(initialState, fromActions.getTableResultsFailed({ payload }));

    expect(newState.errorText).toEqual(payload);
  });
});