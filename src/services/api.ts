// src/services/api.ts

import axios from 'axios';
import type {Movie, MovieAPIResponse} from '../types/Movie';
import type {TvShow, TvShowAPIResponse} from "../types/TvShow.ts";

// Create an instance of axios with a base URL and default params
const apiClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
    },
});

// A function to fetch popular movies with pagination
export const getPopularMovies = async (page: number = 1): Promise<MovieAPIResponse> => {
    const response = await apiClient.get<MovieAPIResponse>('/movie/popular', {
        params: {page},
    });
    return response.data;
};

// A function to search for movies with pagination
export const searchMovies = async (query: string, page: number = 1): Promise<MovieAPIResponse> => {
    const response = await apiClient.get<MovieAPIResponse>('/search/movie', {
        params: {query, page},
    });
    return response.data;
};

// A function to fetch details for a single movie
export const getMovieDetails = async (id: string): Promise<Movie> => {
    const response = await apiClient.get<Movie>(`/movie/${id}`);
    return response.data;
};

export const getPopularTvShows = async (page: number = 1): Promise<TvShowAPIResponse> => {
    const response = await apiClient.get<TvShowAPIResponse>('/tv/popular', {params: {page}});
    return response.data;
};

export const getTvShowDetails = async (id: string): Promise<TvShow> => {
    const response = await apiClient.get<TvShow>(`/tv/${id}`);
    return response.data;
};

// We can search both movies and TV shows, or we can make a specific TV search
export const searchTvShows = async (query: string, page: number = 1): Promise<TvShowAPIResponse> => {
    const response = await apiClient.get<TvShowAPIResponse>('/search/tv', {
        params: {query, page}
    });
    return response.data;
};

// A function to discover movies or TV shows based on a specific criteria
export const discoverMedia = async (
    mediaType: 'movie' | 'tv',
    sortBy: string,
    page: number
): Promise<MovieAPIResponse | TvShowAPIResponse> => {
    const response = await apiClient.get(`/discover/${mediaType}`, {
        params: {
            sort_by: sortBy,
            page,
        },
    });
    return response.data;
};

// Helper to get the full image URL
export const getImageUrl = (path: string, size: string = 'w500') => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
};
