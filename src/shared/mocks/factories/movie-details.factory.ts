import { MovieDetails } from "src/shared/models/movie-details";

export function createMovieDetails({
    adult = false,
    backdrop_path = null,
    belongs_to_collection = null, // Assuming null as default for ICollection
    budget = 0,
    genres = [],
    homepage = '',
    id = 0,
    imdb_id = '1',
    original_language = 'en',
    original_title = 'Wonka',
    overview = 'this is the overview for Wonka',
    popularity = 0,
    poster_path = null,
    production_companies = [],
    production_countries = [],
    release_date = '2023-12-12',
    revenue = 0,
    runtime = 0,
    spoken_languages = [],
    status = '',
    tagline = '',
    title = '',
    video = false,
    vote_average = 10.000,
    vote_count = 10000
  } = {}) {
    return new MovieDetails({
      adult,
      backdrop_path,
      belongs_to_collection,
      budget,
      genres,
      homepage,
      id,
      imdb_id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      production_companies,
      production_countries,
      release_date,
      revenue,
      runtime,
      spoken_languages,
      status,
      tagline,
      title,
      video,
      vote_average,
      vote_count
    });
  }
  