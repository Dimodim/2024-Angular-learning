import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TabelItem } from '../shared/models/tabel-item.model';
import { createTableItem } from '../shared/mocks/factories/table-item';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movie } from 'src/shared/models/movies.model';
import { Cacheable } from 'src/shared/decorators/cashable';
import { CacheService } from './cashe.service';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  @Cacheable(60)
  getPopularMovies(): Observable<Array<Movie>> {
    const request = this.http.get<Array<Movie>>(
      `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}`
    );

    return request;
  }

  getMovieDetails(id: string): Observable<Movie> {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${this.apiKey}`;

    return this.cacheService.getData<Movie>(url, () =>
      this.http.get<Movie>(url)
    );
  }
}
