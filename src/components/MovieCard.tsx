// src/components/MovieCard.tsx

import React from 'react';
import {Link} from 'react-router-dom';
import type {Movie} from '../types/Movie';
import {getImageUrl} from '../services/api';
import styles from '../styles/MovieCard.module.css';

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
    // Handle cases where the poster might be missing
    const posterUrl = movie.poster_path
        ? getImageUrl(movie.poster_path)
        : 'https://via.placeholder.com/500x750.png?text=No+Image';

    return (
        <Link to={`/movie/${movie.id}`} className={styles.card}>
            <img src={posterUrl} alt={movie.title} className={styles.poster}/>
            <div className={styles.info}>
                <h3 className={styles.title}>{movie.title}</h3>
                <span className={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</span>
            </div>
        </Link>
    );
};

export default MovieCard;
