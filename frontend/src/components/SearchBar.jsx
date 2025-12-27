import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch, resultsCount }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, onSearch]);

    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="max-w-2xl mx-auto">
                {/* Search Input */}
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for games..."
                        className="search-input"
                    />

                    {searchTerm && (
                        <button
                            onClick={handleClear}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Results Count */}
                {resultsCount !== null && (
                    <div className="mt-4 text-white/80 text-sm">
                        Results found: <span className="font-semibold text-white">{resultsCount}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
