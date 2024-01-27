import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TabelItem } from '../shared/models/tabel-item.model';
import { createTableItem } from '../shared/mocks/factories/table-item';

@Injectable({
  providedIn: 'root'
})
export class TableService {

constructor() { }

getTableResults(): Observable<Array<TabelItem>>{
  return of([createTableItem(),createTableItem({name:'test2',link:'test-2-link', id:'2'})])
}
}
