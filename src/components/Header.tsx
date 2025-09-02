// src/components/Header.tsx

import React, {useRef, useState} from 'react';
import {Link, NavLink, useLocation, useNavigate} from 'react-router-dom';
import styles from '../styles/Header.module.css';
import {ChevronDown} from "lucide-react";
import useClickOutside from "../hooks/useClickOutside.ts";

const Header: React.FC = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const mobileNavRef = useRef<HTMLDivElement>(null);

    useClickOutside<HTMLDivElement | null>(mobileNavRef, () => setIsMobileNavOpen(false));

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            // Navigate to the search page, passing the query
            navigate(`/search?query=${query}`);
            setQuery('');
        }
    };

    const Nav = () => (
        <nav className={styles.nav}>
            {/* Use NavLink for active styling */}
            <NavLink
                to="/"
                className={({isActive}) => (isActive ? styles.activeLink : styles.navLink)}
                end // 'end' prop ensures it's only active for the exact path "/"
                onClick={() => setIsMobileNavOpen(false)}
            >
                Movies
            </NavLink>
            <NavLink
                to="/tv"
                className={({isActive}) => (isActive ? styles.activeLink : styles.navLink)}
                onClick={() => setIsMobileNavOpen(false)}
            >
                TV Shows
            </NavLink>
        </nav>
    );

    return (
        <header className={styles.header}>
            <div className={`${styles.headerContent} container`}>
                <div className={styles.leftSection}>
                    <Link to="/" className={styles.logo}>
                        CineVerse
                    </Link>
                    <div className={styles.navWrapper}>
                        <Nav/>
                    </div>
                    <div className={styles.mobileNavWrapper}>
                        <button
                            type="button"
                            className={styles.mobileNavButton}
                            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                        >
                            {pathname === '/' ? "Movies" : "TV Shows"} <ChevronDown/>
                        </button>
                        <div
                            ref={mobileNavRef}
                            className={`${styles.mobileNav} ${isMobileNavOpen ? styles.mobileNavOpen : ''}`}
                        >
                            <Nav/>
                        </div>
                    </div>
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
