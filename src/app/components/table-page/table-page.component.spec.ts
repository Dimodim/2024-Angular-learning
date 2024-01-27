import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { createTableItem } from '../../../shared/mocks/factories';
import { TablePageComponent } from './table-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as fromStore from '../../store';
import { Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TablePageComponent', () => {
  let component: TablePageComponent;
  let fixture: ComponentFixture<TablePageComponent>;
  let store: MockStore<fromStore.IState>;
  let router: Router;
  let storeSpy: jest.SpyInstance;

  const tableData = [createTableItem()];

  const selectElement = (selector: string) => {
    return fixture.nativeElement.querySelector(selector);
  };
  const selectElements = (selector: string) => {
    return fixture.nativeElement.querySelectorAll(selector);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablePageComponent],
      imports: [MatTableModule, RouterTestingModule,
        BrowserModule,
        NoopAnimationsModule,
        MatTableModule,
      ],
      providers: [provideMockStore()],
    });

    fixture = TestBed.createComponent(TablePageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject<MockStore<fromStore.IState>>(MockStore);
    store.overrideSelector(fromStore.selectTableState, tableData);
    router = TestBed.inject<Router>(Router);
    storeSpy = jest.spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getTableResults action on init', () => {
    expect(storeSpy).toHaveBeenCalledWith(fromStore.getTableResults());
  });

  it('should display table with correct number of rows', () => {
    expect(selectElements('#table tbody tr').length).toBe(1);
  });
  
  it('should have correct data in table', () => {
    const data = tableData[0];
    const nameCell = fixture.debugElement.query(By.css('#name-0'));
    const linkCell = fixture.debugElement.query(By.css('#link-0'));
    
    expect(nameCell.nativeElement.textContent).toContain(data.name);
    expect(linkCell.nativeElement.textContent).toContain(data.link);
  });

  it('should navigate on link button click', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    selectElement('#link-0').click();

    expect(navigateSpy).toHaveBeenCalledWith(['form-page/1']);
  });
});
