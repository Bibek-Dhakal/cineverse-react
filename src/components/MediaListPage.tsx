// src/components/MediaListPage.tsx

import React, {useCallback} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useApi} from '../hooks/useApi';
import {discoverMedia} from '../services/api';
import MediaCard from './MediaCard';
import Pagination from './Pagination';
import SortDropdown from './SortDropdown';
import styles from '../styles/PageStyles.module.css';

interface MediaListPageProps {
    mediaType: 'movie' | 'tv';
    pageTitle: string;
}

const MediaListPage: React.FC<MediaListPageProps> = ({mediaType, pageTitle}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1', 10);
    const sortBy = searchParams.get('sort_by') || 'popularity.desc';

    // 1. Create a memoized version of our API call function
    const fetchMedia = useCallback(() => {
        return discoverMedia(mediaType, sortBy, page);
    }, [mediaType, sortBy, page]); // <-- This function will only be recreated if these values change

    // 2. Pass the stable, memoized function to our hook
    const {data: apiResponse, loading, error} = useApi(fetchMedia);

    // ... rest of the component is unchanged
    const handlePageChange = (newPage: number) => {
        setSearchParams({sort_by: sortBy, page: newPage.toString()});
        window.scrollTo(0, 0);
    };
    const handleSortChange = (newSortBy: string) => {
        setSearchParams({sort_by: newSortBy, page: '1'});
    };
    if (loading) return <div className={styles.message}>Loading...</div>;
    if (error) return <div className={`${styles.message} ${styles.error}`}>{error}</div>;
    const mediaItems = apiResponse?.results || [];
    const totalPages = apiResponse?.total_pages || 1;

    return (
        <div>
            <div className={styles.pageHeader}>
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
