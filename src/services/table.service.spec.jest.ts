import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TableService } from './table.service';
import { environment } from 'src/environments/environment';
import { CacheService } from './cashe.service';
import { of } from 'rxjs';
import { createMovieDetails } from 'src/shared/mocks/factories/movie-details.factory';
import { createMovie } from 'src/shared/mocks/factories/movie.factory';

describe('TableService', () => {
  let service: TableService;
  let httpTestingController: HttpTestingController;
  let cacheService: CacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TableService,
        { provide: CacheService, useValue: { getData: jest.fn() } },
      ],
    });

    service = TestBed.inject(TableService);
    httpTestingController = TestBed.inject(HttpTestingController);
    cacheService = TestBed.inject(CacheService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getPopularMovies', () => {
    it('should make a GET request for popular movies', () => {
      const mockMovies = [createMovie()];

      service.getPopularMovies().subscribe((movies) => {
        expect(movies).toEqual(mockMovies);
      });

      const req = httpTestingController.expectOne(
        `https://api.themoviedb.org/3/discover/movie?api_key=${environment.apiKey}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(mockMovies);
    });
  });

  describe('getMovieDetails', () => {
    it('should use CacheService to get movie details', () => {
      const mockMovieDetails = createMovieDetails();
      const movieId = mockMovieDetails.id;
      jest.spyOn(cacheService, 'getData').mockReturnValue(of(mockMovieDetails));

      service.getMovieDetails(movieId).subscribe((details) => {
        expect(details).toEqual(mockMovieDetails);
      });

      expect(cacheService.getData).toHaveBeenCalledWith(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${environment.apiKey}`,
        expect.any(Function)
      );
    });
  });
});
