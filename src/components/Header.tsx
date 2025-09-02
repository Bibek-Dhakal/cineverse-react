// src/components/Header.tsx

import React, {useState} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import styles from '../styles/Header.module.css';

const Header: React.FC = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            // Navigate to the search page, passing the query
            navigate(`/search?query=${query}`);
            setQuery('');
        }
    };

    return (
        <header className={styles.header}>
            <div className={`${styles.headerContent} container`}>
                <div className={styles.leftSection}>
                    <Link to="/" className={styles.logo}>
                        CineVerse
                    </Link>
                    <nav className={styles.nav}>
                        {/* Use NavLink for active styling */}
                        <NavLink
                            to="/"
                            className={({isActive}) => (isActive ? styles.activeLink : styles.navLink)}
                            end // 'end' prop ensures it's only active for the exact path "/"
                        >
                            Movies
                        </NavLink>
                        <NavLink
                            to="/tv"
                            className={({isActive}) => (isActive ? styles.activeLink : styles.navLink)}
                        >
                            TV Shows
                        </NavLink>
                    </nav>
                </div>

                <form onSubmit={handleSearch} className={styles.searchForm}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a movie or show..."
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>Search</button>
                </form>
            </div>
        </header>
    );
};

export default Header;
