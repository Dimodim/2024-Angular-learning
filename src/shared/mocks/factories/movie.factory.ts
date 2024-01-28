import { Movie } from "src/shared/models/movies.model";

export function createMovie({
    id = 1,
    adult = false,
    backdrop_path = '',
    genre_ids = [],
    original_language = 'en',
    original_title = 'Wonka',
    overview = 'this si the overview for Wonka',
    popularity = 0,
    poster_path = '',
    release_date = '2023-12-12',
    title = '',
    video = false,
    vote_average = 10.000,
    vote_count = 10000
  } = {}) {
    return new Movie({
      id,
      adult,
      backdrop_path,
      genre_ids,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      title,
      video,
      vote_average,
      vote_count
    });
  }
  