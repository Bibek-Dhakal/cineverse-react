// src/components/Pagination.tsx

import React from 'react';
import styles from '../styles/Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className={styles.pagination}>
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                &laquo; Previous
            </button>
            <span>
        Page {currentPage} of {totalPages}
      </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
                Next &raquo;
            </button>
        </div>
    );
};

export default Pagination;
