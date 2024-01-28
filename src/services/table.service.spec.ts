import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TableService } from './table.service';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import { createMovieDetails } from 'src/shared/mocks/factories/movie-details.factory';
import { createMovie } from 'src/shared/mocks/factories/movie.factory';
import { CacheService } from './cashe.service';

describe('TableService', () => {
  let service: TableService;
  let httpTestingController: HttpTestingController;
  let cacheService: CacheService;

  const mockMovieDetails = createMovieDetails();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TableService, CacheService],
    });

    service = TestBed.inject(TableService);
    httpTestingController = TestBed.inject(HttpTestingController);
    cacheService = TestBed.inject(CacheService);
    spyOn(cacheService, 'getData').and.returnValue(of(mockMovieDetails));
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getPopularMovies', () => {
    it('should make a GET request for popular movies', (done) => {
      const mockMovies = [createMovie()];

      service.getPopularMovies().subscribe({
        next: (response) => {
          expect(response).toEqual(mockMovies);
          done();
        },
        error: done.fail,
      });

      const request = httpTestingController.expectOne(
        `https://api.themoviedb.org/3/discover/movie?api_key=${environment.apiKey}`
      );
      expect(request.request.method).toBe('GET');

      request.flush(mockMovies);
    });
  });

  // describe('getMovieDetails', () => {
  //   it('should use CacheService to get movie details', () => {
  //     const movieId = 123;
  //     const testUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${environment.apiKey}`;

  //     // Call the getMovieDetails method
  //     service.getMovieDetails(movieId).subscribe((details) => {
  //       expect(details).toEqual(mockMovieDetails); // Verify the movie details
  //     });

  //     // Verify that the cacheService.getData spy was called with the correct arguments
  //     expect(cacheService.getData).toHaveBeenCalledWith(
  //       testUrl,
  //       jasmine.any(Function)
  //     );

  //     // No need to expect an HTTP request since we are returning from cache
  //     // httpTestingController.expectOne(...) not needed

  //     // Ensure no outstanding HTTP requests
  //     httpTestingController.verify();
  //   });
  // });
});
