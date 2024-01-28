import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export function Cacheable(cacheDurationSeconds: number) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const cacheKey = `${propertyKey}_${JSON.stringify(args)}`;
      const cachedDataString = localStorage.getItem(cacheKey);

      if (cachedDataString) {
        const cachedData = JSON.parse(cachedDataString);

        if (Date.now() - cachedData.timestamp < cacheDurationSeconds * 1000) {
          return of(cachedData.data);
        }
      }

      const originalResult$ = originalMethod.apply(this, args);

      return originalResult$.pipe(
        tap((data) => {
          const dataToCache = { data, timestamp: Date.now() };
          localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
        }),
        catchError((error) => {
          console.error(`Error in ${propertyKey}`, error);
          throw error;
        })
      );
    };

    return descriptor;
  };
}
