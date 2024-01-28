export class Movie {
  id: number;
  adult: boolean;
  backdrop_path?: string; // backgroun for the details of the movie
  genre_ids: Array<number>;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  constructor(rawObject: IMovie) {
    this.id = rawObject.id;
    this.adult = rawObject.adult;
    this.backdrop_path = rawObject.backdrop_path;
    this.genre_ids = rawObject.genre_ids;
    this.original_language = rawObject.original_language;
    this.original_title = rawObject.original_title;
    this.overview = rawObject.overview;
    this.popularity = rawObject.popularity;
    this.poster_path = rawObject.poster_path;
    this.release_date = rawObject.release_date;
    this.title = rawObject.title;
    this.video = rawObject.video;
    this.vote_average = rawObject.vote_average;
    this.vote_count = rawObject.vote_count;
  }
}

export interface IMovie {
  id: number;
  adult: boolean;
  backdrop_path: string; // backgroun for the details of the movie
  genre_ids: Array<number>;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
