import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, throwError } from 'rxjs';
import { TableEffects } from './effects';
import { TableService } from '../../services/table.service';
import { errorMessage } from '../../shared/mocks/messages/messages';
import { createTableItem } from '../../shared/mocks/factories';

import * as fromActions from './actions';

describe('TableEffects', () => {
  let actions: any;
  let effects: TableEffects;
  let tableService: jest.Mocked<TableService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TableEffects,
        provideMockActions(() => actions),
        {
          provide: TableService,
          useValue: {
            getTableResults: jest.fn(),
          },
        },
      ],
    });

    effects = TestBed.inject(TableEffects);
    tableService = TestBed.inject(TableService) as jest.Mocked<TableService>;
  });

  it('should return getTableResultsSuccess on successful API call', (done) => {
    const mockResponse = [createTableItem()];
    tableService.getTableResults.mockReturnValue(of(mockResponse));

    actions = of(fromActions.getTableResults());

    effects.getTradingPartnersList$.subscribe((result) => {
      expect(result).toEqual(fromActions.getTableResultsSuccess({ payload: mockResponse }));
      done();
    });
  });

  it('should return getTableResultsFailed on API call failure', (done) => {
    
    tableService.getTableResults.mockReturnValue(throwError(()=>errorMessage));

    actions = of(fromActions.getTableResults());

    effects.getTradingPartnersList$.subscribe((result) => {
      expect(result).toEqual(fromActions.getTableResultsFailed({ payload: errorMessage }));
      done();
    });
  });
});
