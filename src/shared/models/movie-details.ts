export class MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: ICollection;
  budget: number;
  genres: IGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProductionCompany[];
  production_countries: ICountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ILanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

  constructor(rawObject: any) {
    this.adult = rawObject.adult;
    this.backdrop_path = rawObject.backdrop_path;
    this.belongs_to_collection = rawObject.belongs_to_collection;
    this.budget = rawObject.budget;
    this.genres = rawObject.genres;
    this.homepage = rawObject.homepage;
    this.id = rawObject.id;
    this.imdb_id = rawObject.imdb_id;
    this.original_language = rawObject.original_language;
    this.original_title = rawObject.original_title;
    this.overview = rawObject.overview;
    this.popularity = rawObject.popularity;
    this.poster_path = rawObject.poster_path;
    this.production_companies = rawObject.production_companies;
    this.production_countries = rawObject.production_countries;
    this.release_date = rawObject.release_date;
    this.revenue = rawObject.revenue;
    this.runtime = rawObject.runtime;
    this.spoken_languages = rawObject.spoken_languages;
    this.status = rawObject.status;
    this.tagline = rawObject.tagline;
    this.title = rawObject.title;
    this.video = rawObject.video;
    this.vote_average = rawObject.vote_average;
    this.vote_count = rawObject.vote_count;
  }
}

export interface ICollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ICountry {
  iso_3166_1: string;
  name: string;
}

export interface ILanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
