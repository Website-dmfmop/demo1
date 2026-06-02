import React from 'react';
import SearchBar from '../ui/SearchBar';

const SECTORS = [
    'Education & Skill Dev',
    'Healthcare & Sanitation',
    'Environmental Sustainability',
    'Rural Livelihood'
];

const DirectoryControls = ({ searchQuery, setSearchQuery, activeFilters, toggleFilter }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <div className="mb-6">
                <SearchBar 
                    placeholder="Search projects by title or description..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    themeColor="#000080"
                />
            </div>
            
            <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Filter by Sector:</p>
                <div className="flex flex-wrap gap-2">
                    {SECTORS.map(sector => {
                        const isActive = activeFilters.includes(sector);
                        return (
                            <button
                                key={sector}
                                onClick={() => toggleFilter(sector)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                                    isActive 
                                    ? 'bg-[#000080] text-white border-[#000080]' 
                                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                                }`}
                            >
                                {sector}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DirectoryControls;
