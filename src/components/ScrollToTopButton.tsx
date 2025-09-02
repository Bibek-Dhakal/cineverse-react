// src/components/ScrollToTopButton.tsx

import React, {useEffect, useState} from 'react';
import styles from '../styles/ScrollToTopButton.module.css';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when the page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set up the event listener
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        // Clean up the event listener
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Smooth scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            className={`${styles.button} ${isVisible ? styles.visible : ''}`}
            onClick={scrollToTop}
            aria-label="Go to top"
        >
            {/* Arrow Up SVG Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24"
                height="24"
            >
                <path
                    d="M11.9999 10.8284L7.05016 15.7782L5.63595 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
            </svg>
        </button>
    );
};

export default ScrollToTopButton;
