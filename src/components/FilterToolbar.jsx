import React from 'react';

export const FilterSelect = ({ value, onChange, title, options, defaultLabel }) => {
    return (
        <select 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            title={title || ''}
            className="w-full sm:w-[160px] text-sm border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 font-medium text-gray-700 transition-colors cursor-pointer text-ellipsis overflow-hidden whitespace-nowrap box-border"
        >
            {defaultLabel && <option value="All">{defaultLabel}</option>}
            {options.map((opt, i) => (
                <option key={i} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    );
};

export const FilterSeparator = () => (
    <div className="w-px h-8 bg-gray-200 hidden md:block mx-1"></div>
);

export const FilterToolbar = ({ 
    searchQuery, 
    setSearchQuery, 
    searchPlaceholder = "Search...", 
    children 
}) => {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center">
            {setSearchQuery && (
                <div className="flex-1 w-full relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
                    <input 
                        type="text" 
                        placeholder={searchPlaceholder} 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium text-gray-700 transition-colors"
                    />
                </div>
            )}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {children}
            </div>
        </div>
    );
};
