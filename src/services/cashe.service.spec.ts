import { of } from 'rxjs';
import { CacheService } from './cashe.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    service = new CacheService();
  });

  it('should return cached data if available', (done) => {
    const key = 'testKey';
    const expectedData = { data: 'cachedData' };
    service['cache'].set(key, expectedData);

    service.getData(key, () => of({ data: 'newData' })).subscribe((data) => {
      expect(data).toEqual(expectedData);
      done();
    });
  });

  it('should fetch and cache data if not in cache', (done) => {
    const key = 'testKey';
    const expectedData = { data: 'newData' };

    const fetchFn = jasmine.createSpy('fetchFn').and.returnValue(of(expectedData));

    service.getData(key, fetchFn).subscribe((data) => {
      expect(data).toEqual(expectedData);
      expect(fetchFn).toHaveBeenCalledTimes(1);
      expect(service['cache'].get(key)).toEqual(expectedData);
      done();
    });
  });

  it('should invalidate specific cache entry', () => {
    const key = 'testKey';
    service['cache'].set(key, { data: 'cachedData' });
    expect(service['cache'].has(key)).toBeTruthy();

    service.invalidateCache(key);
    expect(service['cache'].has(key)).toBeFalsy();
  });

  it('should clear the entire cache', () => {
    service['cache'].set('key1', { data: 'data1' });
    service['cache'].set('key2', { data: 'data2' });
    expect(service['cache'].size).toBeGreaterThan(0);

    service.clearCache();
    expect(service['cache'].size).toBe(0);
  });
});
