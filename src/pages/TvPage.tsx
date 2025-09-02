// src/pages/TvPage.tsx

import React from 'react';
import MediaListPage from '../components/MediaListPage';

const TvPage: React.FC = () => {
    return (
        <MediaListPage
            mediaType="tv"
            pageTitle="Discover TV Shows"
        />
    );
};

export default TvPage;
