// src/components/SkeletonCard.tsx

import React from 'react';
import styles from '../styles/SkeletonCard.module.css';

const SkeletonCard: React.FC = () => {
    return (
        <div className={styles.card}>
            <div className={`${styles.poster} ${styles.skeleton}`}></div>
            <div className={styles.info}>
                <div className={`${styles.title} ${styles.skeleton}`}></div>
                <div className={`${styles.rating} ${styles.skeleton}`}></div>
            </div>
        </div>
    );
};

export default SkeletonCard;
