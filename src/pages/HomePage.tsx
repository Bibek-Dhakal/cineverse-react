// src/pages/HomePage.tsx

import React from 'react';
import MediaListPage from '../components/MediaListPage';

const HomePage: React.FC = () => {
    return (
        <MediaListPage
            mediaType="movie"
            pageTitle="Discover Movies"
        />
    );
};

export default HomePage;
