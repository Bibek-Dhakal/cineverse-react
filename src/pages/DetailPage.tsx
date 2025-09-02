// src/pages/DetailPage.tsx

import React, {useCallback} from 'react';
import {useParams} from 'react-router-dom';
import {useApi} from '../hooks/useApi';
import {getImageUrl, getMovieDetails, getTvShowDetails} from '../services/api';
import type {Media} from '../types/Media';
import styles from '../styles/MovieDetailPage.module.css';
import pageStyles from '../styles/PageStyles.module.css';

interface DetailPageProps {
    mediaType: 'movie' | 'tv';
}

const DetailPage: React.FC<DetailPageProps> = ({mediaType}) => {
    const {id} = useParams<{ id: string }>();

    const fetchDetails = useCallback(() => {
        if (!id) {
            // Return a promise that resolves to null or rejects
            return Promise.reject(new Error("No ID provided"));
        }
        return mediaType === 'movie' ? getMovieDetails(id) : getTvShowDetails(id);
    }, [id, mediaType]); // Dependencies for this callback

    const {data: media, loading, error} = useApi<Media>(fetchDetails);

    // ... rest of the component is unchanged
    if (loading) return <div className={pageStyles.message}>Loading...</div>;
    if (error) return <div className={`${pageStyles.message} ${pageStyles.error}`}>{error}</div>;
    if (!media) return null;

    const title = 'title' in media ? media.title : media.name;
    const releaseDate = 'release_date' in media ? media.release_date : media.first_air_date;
    const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
    const backdropUrl = media.backdrop_path ? getImageUrl(media.backdrop_path, 'w1280') : '';
    const posterUrl = media.poster_path ? getImageUrl(media.poster_path) : 'https://via.placeholder.com/500x750.png?text=No+Image';

    return (
        <div className={styles.detailPage}>
            <div
                className={styles.backdrop}
                style={{backgroundImage: `url(${backdropUrl})`}}
            >
                <div className={styles.overlay}></div>
            </div>
            <div className={`${styles.content} container`}>
                <img
                    src={posterUrl}
                    alt={title}
                    className={styles.poster}
                />
                <div className={styles.info}>
                    <h1 className={styles.title}>{title} ({year})</h1>
                    <div className={styles.meta}>
                        <span className={styles.rating}>⭐ {media.vote_average.toFixed(1)}</span>
                        <span>{releaseDate}</span>
                    </div>
                    <div className={styles.genres}>
                        {media.genres.map(genre => <span key={genre.id} className={styles.genre}>{genre.name}</span>)}
                    </div>
                    <h2>Overview</h2>
                    <p className={styles.overview}>{media.overview}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
