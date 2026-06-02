import React from 'react';

const SearchBar = ({ placeholder = 'Search...', value, onChange, themeColor = '#000080' }) => {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400">search</span>
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 sm:text-sm transition-colors"
                style={{ focusRingColor: themeColor, focusBorderColor: themeColor }}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {/* Inject a small style block to handle dynamic focus color if needed, but standard Tailwind outline ring works best. We will rely on inline styles or default tailwind ring. */}
            <style>{`
                input:focus {
                    border-color: ${themeColor} !important;
                    box-shadow: 0 0 0 1px ${themeColor} !important;
                }
            `}</style>
        </div>
    );
};

export default SearchBar;
