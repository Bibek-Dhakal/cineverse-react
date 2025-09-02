// src/components/SkeletonDetailPage.tsx

import React from 'react';
import styles from '../styles/SkeletonDetailPage.module.css';

const SkeletonDetailPage: React.FC = () => {
    return (
        <div className={`${styles.content} container`}>
            {/* Left Column: Poster Skeleton */}
            <div className={`${styles.posterSkeleton} ${styles.skeleton}`}></div>

            {/* Right Column: Info Skeleton */}
            <div className={styles.infoSkeleton}>
                <div className={`${styles.titleSkeleton} ${styles.skeleton}`}></div>
                <div className={styles.metaGroup}>
                    <div className={`${styles.metaItemSkeleton} ${styles.skeleton}`}></div>
                    <div className={`${styles.metaItemSkeleton} ${styles.skeleton}`}></div>
                </div>
                <div className={styles.genreGroup}>
                    <div className={`${styles.genreSkeleton} ${styles.skeleton}`}></div>
                    <div className={`${styles.genreSkeleton} ${styles.skeleton}`}></div>
                    <div className={`${styles.genreSkeleton} ${styles.skeleton}`}></div>
                </div>
                <div className={`${styles.headingSkeleton} ${styles.skeleton}`}></div>
                <div className={`${styles.lineSkeleton} ${styles.w100} ${styles.skeleton}`}></div>
                <div className={`${styles.lineSkeleton} ${styles.w90} ${styles.skeleton}`}></div>
                <div className={`${styles.lineSkeleton} ${styles.w100} ${styles.skeleton}`}></div>
                <div className={`${styles.lineSkeleton} ${styles.w70} ${styles.skeleton}`}></div>
            </div>
        </div>
    );
};

export default SkeletonDetailPage;
