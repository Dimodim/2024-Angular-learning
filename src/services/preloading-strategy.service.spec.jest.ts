import { of } from 'rxjs';
import { PreloadStrategyService } from './preloading-strategy.service';

describe('PreloadStrategyService', () => {
  let service: PreloadStrategyService;

  beforeEach(() => {
    service = new PreloadStrategyService();
  });

  it('should preload the module when route.data.preload is true', (done) => {
    const route = {
      path: 'test',
      data: { preload: true }
    };
    const loadFunction = jest.fn(() => of('Module Loaded'));

    service.preload(route, loadFunction).subscribe((result: string) => {
      expect(loadFunction).toHaveBeenCalled();
      expect(result).toBe('Module Loaded');
      done();
    });
  });

  it('should not preload the module when route.data.preload is false', (done) => {
    const route = {
      path: 'test',
      data: { preload: false }
    };
    const loadFunction = jest.fn(() => of('Module Loaded'));

    service.preload(route, loadFunction).subscribe((result: null) => {
      expect(loadFunction).not.toHaveBeenCalled();
      expect(result).toBeNull();
      done();
    });
  });

  it('should not preload the module when route.data is undefined', (done) => {
    const route = {
      path: 'test'
    };
    const loadFunction = jest.fn(() => of('Module Loaded'));

    service.preload(route, loadFunction).subscribe((result: null) => {
      expect(loadFunction).not.toHaveBeenCalled();
      expect(result).toBeNull();
      done();
    });
  });
});
