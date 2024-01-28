import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, any>();

  constructor() {}

  /**
   * Gets data from cache or fetches from the server if not available in cache.
   * @param key The key to store the response under in the cache.
   * @param fetchFn The function to fetch data from the server.
   */
  getData<T>(key: string, fetchFn: () => Observable<T>): Observable<T> {
    if (this.cache.has(key)) {
      // Serve from cache
      return of(this.cache.get(key));
    } else {
      // Fetch from server and cache the result
      return fetchFn().pipe(tap((data) => this.cache.set(key, data)));
    }
  }

  /**
   * Invalidates a single cache entry by key.
   * @param key The cache key to invalidate.
   */
  invalidateCache(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clears the entire cache.
   */
  clearCache(): void {
    this.cache.clear();
  }
}
