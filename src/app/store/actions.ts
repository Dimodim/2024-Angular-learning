
  import { createAction, props } from '@ngrx/store';
  
  export const getTableResults = createAction(
    '[Table] Get Table Results'
  );
  export const getTableResultsSuccess = createAction(
    '[Table] Get Table Results Success',
    props<{ payload: any }>()
  );
  export const getTableResultsFailed = createAction(
    '[Table] Get Table Results Failed',
    props<{ payload: string }>()
  );
  