// src/components/MediaCard.tsx

import React from 'react';
import {Link} from 'react-router-dom';
import type {Media} from '../types/Media';
import {getImageUrl} from '../services/api';
import styles from '../styles/MovieCard.module.css';

interface MediaCardProps {
    media: Media;
    mediaType: 'movie' | 'tv';
}

const MediaCard: React.FC<MediaCardProps> = ({media, mediaType}) => {
    const posterUrl = media.poster_path
        ? getImageUrl(media.poster_path)
        : 'https://via.placeholder.com/500x750.png?text=No+Image';

    // Handle differences between movie and tv show objects
    const title = 'title' in media ? media.title : media.name;
    const rating = media.vote_average.toFixed(1);

    return (
        <Link to={`/${mediaType}/${media.id}`} className={styles.card}>
            <img src={posterUrl} alt={title} className={styles.poster}/>
            <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                <span className={styles.rating}>⭐ {rating}</span>
            </div>
        </Link>
    );
};

export default MediaCard;
