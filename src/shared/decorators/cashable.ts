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

      // Check if data is in local storage and not expired
      if (cachedDataString) {
        const cachedData = JSON.parse(cachedDataString);

        if (Date.now() - cachedData.timestamp < cacheDurationSeconds * 1000) {
          console.log(`Cache hit for ${propertyKey}`);
          return of(cachedData.data); // Use 'of' to create an Observable
        }
      }

      // If not in cache or expired, call the original method
      console.log(`Cache miss for ${propertyKey}`);
      const originalResult$ = originalMethod.apply(this, args);

      // Subscribe to the original method, cache the result, and return the original Observable
      return originalResult$.pipe(
        tap((data) => {
          const dataToCache = { data, timestamp: Date.now() };
          localStorage.setItem(cacheKey, JSON.stringify(dataToCache));
        }),
        catchError((error) => {
          // Handle errors if needed
          console.error(`Error in ${propertyKey}`, error);
          throw error; // Re-throw the error to propagate it to the subscriber
        })
      );
    };

    return descriptor;
  };
}
