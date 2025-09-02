// src/components/SortDropdown.tsx

import React from 'react';

const options = [
    {value: 'popularity.desc', label: 'Popularity'},
    {value: 'vote_average.desc', label: 'Top Rated'},
    {value: 'primary_release_date.desc', label: 'Newest (Movies)'},
    {value: 'first_air_date.desc', label: 'Newest (TV)'},
];

interface SortDropdownProps {
    sortBy: string;
    onChange: (value: string) => void;
    mediaType: 'movie' | 'tv';
}

const SortDropdown: React.FC<SortDropdownProps> = ({sortBy, onChange, mediaType}) => {
    const relevantOptions = options.filter(opt =>
        mediaType === 'movie' ? !opt.value.includes('air_date') : !opt.value.includes('release_date')
    );

    return (
        <select value={sortBy} onChange={(e) => onChange(e.target.value)}>
            {relevantOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    );
};

export default SortDropdown;
