// src/components/MediaListPage.tsx

import React, {useCallback} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useApi} from '../hooks/useApi';
import {discoverMedia} from '../services/api';
import MediaCard from './MediaCard';
import Pagination from './Pagination';
import SortDropdown from './SortDropdown';
import SkeletonCard from './SkeletonCard';
import styles from '../styles/PageStyles.module.css';

interface MediaListPageProps {
    mediaType: 'movie' | 'tv';
    pageTitle: string;
}

const MediaListPage: React.FC<MediaListPageProps> = ({mediaType, pageTitle}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1', 10);
    const sortBy = searchParams.get('sort_by') || 'popularity.desc';

    const fetchMedia = useCallback(() => {
        return discoverMedia(mediaType, sortBy, page);
    }, [mediaType, sortBy, page]);

    const {data: apiResponse, loading, error} = useApi(fetchMedia);

    const handlePageChange = (newPage: number) => {
        setSearchParams({sort_by: sortBy, page: newPage.toString()});
        // window.scrollTo(0, 0);
    };

    const handleSortChange = (newSortBy: string) => {
        setSearchParams({sort_by: newSortBy, page: '1'});
    };

    if (loading) {
        return (
            <div>
                <div className={styles.pageHeader}>
                    <h1 className={styles.pageTitle}>{pageTitle}</h1>
                    <SortDropdown
                        sortBy={sortBy}
                        onChange={() => {
                        }} // Fake function during a load
                        mediaType={mediaType}
                    />
                </div>
                <div className={styles.grid}>
                    {/* Create an array to map over and render skeletons */}
                    {Array.from({length: 20}).map((_, index) => (
                        <SkeletonCard key={index}/>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return <div className={`${styles.message} ${styles.error}`}>{error}</div>;
    }

    const mediaItems = apiResponse?.results || [];
    const totalPages = apiResponse?.total_pages || 1;

    return (
        <div>
            <div className={styles.pageHeader} style={{
                marginBottom: '10px',
            }}>
                <h1 className={styles.pageTitle}>{pageTitle}</h1>
                <SortDropdown
                    sortBy={sortBy}
                    onChange={handleSortChange}
                    mediaType={mediaType}
                />
            </div>

            <div className={styles.grid}>
                {mediaItems.map((item) => (
                    <MediaCard
                        key={item.id}
                        media={item}
                        mediaType={mediaType}
                    />
                ))}
            </div>

            <Pagination
                currentPage={page}
                totalPages={totalPages > 500 ? 500 : totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default MediaListPage;
