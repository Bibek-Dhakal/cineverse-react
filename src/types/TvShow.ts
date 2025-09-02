// src/types/TvShow.ts

export interface TvShow {
    id: number;
    name: string; // Note: 'name' instead of 'title'
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    first_air_date: string; // Note: 'first_air_date'
    genres: { id: number; name: string }[];
}

export interface TvShowAPIResponse {
    page: number;
    results: TvShow[];
    total_pages: number;
    total_results: number;
}
