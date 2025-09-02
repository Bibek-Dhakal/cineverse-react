// src/components/Footer.tsx

import React from 'react';
import styles from '../styles/Footer.module.css';
import tmdbLogo from '../assets/tmdb-logo.svg';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.footerContent} container`}>
                <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
                    <img src={tmdbLogo} alt="The Movie Database" className={styles.logo}/>
                </a>
                <p className={styles.text}>
                    This product uses the TMDB API but is not endorsed or certified by TMDB.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
