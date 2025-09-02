// src/types/Movie.ts

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    genres: { id: number; name: string }[];
}

// The API response for a list of movies is nested under a 'results' key
export interface MovieAPIResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}
