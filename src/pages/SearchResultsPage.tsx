// src/pages/SearchResultsPage.tsx

import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {searchMovies, searchTvShows} from '../services/api';
import type {Movie} from '../types/Movie';
import type {TvShow} from '../types/TvShow';
import MediaCard from '../components/MediaCard';
import styles from '../styles/PageStyles.module.css';

const SearchResultsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');

    const [movies, setMovies] = useState<Movie[]>([]);
    const [tvShows, setTvShows] = useState<TvShow[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!query) {
            setMovies([]);
            setTvShows([]);
            return;
        }

        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                setError(null);
                // Use Promise.all to fetch movie and TV show results concurrently
                const [movieResponse, tvResponse] = await Promise.all([
                    searchMovies(query, 1), // For simplicity, we'll just get page 1 of results
                    searchTvShows(query, 1),
                ]);
                setMovies(movieResponse.results);
                setTvShows(tvResponse.results);
            } catch (err) {
                console.error('Error fetching search results:', err);
                setError('Failed to perform search. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults().catch(console.error);
    }, [query]); // Re-run search whenever the query parameter changes

    if (loading) return <div className={styles.message}>Searching...</div>;
    if (error) return <div className={`${styles.message} ${styles.error}`}>{error}</div>;

    const noResults = movies.length === 0 && tvShows.length === 0;

    return (
        <div>
            <h1 className={styles.pageTitle}>Search Results for "{query}"</h1>

            {noResults && <p className={styles.message}>No movies or TV shows found.</p>}

            {movies.length > 0 && (
                <section>
                    <h2 className={styles.sectionTitle}>Movies</h2>
                    <div className={styles.grid}>
                        {movies.map((movie) => (
                            <MediaCard key={movie.id} media={movie} mediaType="movie"/>
                        ))}
                    </div>
                </section>
            )}

            {tvShows.length > 0 && (
                <section>
                    <h2 className={styles.sectionTitle}>TV Shows</h2>
                    <div className={styles.grid}>
                        {tvShows.map((show) => (
                            <MediaCard key={show.id} media={show} mediaType="tv"/>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default SearchResultsPage;
