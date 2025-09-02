// src/pages/SearchResultsPage.tsx

import {useSearchParams} from 'react-router-dom';
import {searchMovies, searchTvShows} from '../services/api';
import type {Movie} from '../types/Movie';
import type {TvShow} from '../types/TvShow';
import MediaCard from '../components/MediaCard';
import SkeletonCard from '../components/SkeletonCard';
import styles from '../styles/PageStyles.module.css';
import type {Media} from "../types/Media";
import React, {useEffect, useState} from "react";

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
                    searchMovies(query, 1),
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
    }, [query]);

    // --- NEW LOADING STATE UI ---
    if (loading) {
        return (
            <div>
                <h1 className={styles.pageTitle}>Searching for "{query}"...</h1>
                <section>
                    {/* Skeleton placeholder for the section title */}
                    <div className={`${styles.skeleton} ${styles.skeletonHeader}`}></div>
                    <div className={styles.grid}>
                        {Array.from({length: 10}).map((_, index) => (
                            <SkeletonCard key={index}/>
                        ))}
                    </div>
                </section>
                <section>
                    <div className={`${styles.skeleton} ${styles.skeletonHeader}`}></div>
                    <div className={styles.grid}>
                        {Array.from({length: 10}).map((_, index) => (
                            <SkeletonCard key={index}/>
                        ))}
                    </div>
                </section>
            </div>
        );
    }

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
                        {movies.map((movie: Media) => (
                            <MediaCard key={movie.id} media={movie} mediaType="movie"/>
                        ))}
                    </div>
                </section>
            )}

            {tvShows.length > 0 && (
                <section>
                    <h2 className={styles.sectionTitle}>TV Shows</h2>
                    <div className={styles.grid}>
                        {tvShows.map((show: Media) => (
                            <MediaCard key={show.id} media={show} mediaType="tv"/>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default SearchResultsPage;
