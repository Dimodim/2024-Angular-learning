import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, any>();

  constructor() {}

  getData<T>(key: string, fetchFn: () => Observable<T>): Observable<T> {
    if (this.cache.has(key)) {
      return of(this.cache.get(key));
    } else {
      return fetchFn().pipe(tap((data) => this.cache.set(key, data)));
    }
  }

  invalidateCache(key: string): void {
    this.cache.delete(key);
  }

  clearCache(): void {
    this.cache.clear();
  }
}
