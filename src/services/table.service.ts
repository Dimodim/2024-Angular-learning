import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TabelItem } from '../shared/models/tabel-item.model';
import { createTableItem } from '../shared/mocks/factories/table-item';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/shared/models/movies.model';
import { Cacheable } from 'src/shared/decorators/cashable';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  @Cacheable(60)
  getPopularMovies(): Observable<Array<Movie>> {
    const request = this.http.get<Array<Movie>>(
      `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}`
    );

    return request;
  }

  getTableResults(): Observable<Array<TabelItem>> {
    return of([
      createTableItem(),
      createTableItem({ name: 'test2', link: 'test-2-link', id: '2' }),
    ]);
  }
}
