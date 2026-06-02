import React, { useState } from 'react';
import { useCSRContext } from '../../context/CSRContext';
import Button from '../ui/Button';
import ProjectGrid from './ProjectGrid';
import DirectoryControls from './DirectoryControls';
import FilterSidebar from './FilterSidebar';
import ActiveFiltersBar from './ActiveFiltersBar';
import ProjectDetailModal from './ProjectDetailModal';
import useProjectFilter from '../../hooks/useProjectFilter';

const ProjectDirectory = () => {
    const { setCurrentView, projects } = useCSRContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    
    const [filters, setFilters] = useState({
        sectors: [],
        zones: [],
        wards: [],
        status: [],
        budgetRange: [0, 500],
        sdgGoals: [],
        compliance: [],
        csr1Validated: false,
        nitiAayog: false,
        aspirationalDistrict: false,
        targetDemographics: [],
        overheadCap: 100, // percentage max
        coInvestment: false,
        auditLayer: []
    });

    const filteredProjects = useProjectFilter(projects, filters, searchQuery);

    const clearFilter = (key, value) => {
        if (key === 'ALL') {
            setFilters({
                sectors: [], zones: [], wards: [], status: [], budgetRange: [0, 500],
                sdgGoals: [], compliance: [], csr1Validated: false, nitiAayog: false,
                aspirationalDistrict: false, targetDemographics: [], overheadCap: 100,
                coInvestment: false, auditLayer: []
            });
            return;
        }

        setFilters(prev => {
            const next = { ...prev };
            if (Array.isArray(prev[key])) {
                next[key] = prev[key].filter(v => v !== value);
            } else if (typeof prev[key] === 'boolean') {
                next[key] = false;
            } else if (key === 'overheadCap') {
                next[key] = 100;
            } else if (key === 'budgetRange') {
                next[key] = [0, 500];
            }
            return next;
        });
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 pt-24 px-6 pb-12">
            <div className="max-w-7xl mx-auto">
                <Button 
                    variant="secondary" 
                    themeColor="#000080"
                    onClick={() => setCurrentView('home')}
                    className="mb-8"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                    Back to Ecosystem
                </Button>
                
                <div className="flex justify-between items-end mb-6">
                    <h1 style={{ fontFamily: 'Manrope, sans-serif' }} className="text-4xl font-bold text-gray-900">
                        Explore Projects
                    </h1>
                    {/* Mobile filter button */}
                    <button 
                        className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl font-medium text-gray-700 shadow-sm"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <span className="material-symbols-outlined text-[20px]">tune</span>
                        Filters
                    </button>
                </div>

                <DirectoryControls 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    activeFilters={filters.sectors}
                    toggleFilter={(sector) => {
                        setFilters(prev => ({
                            ...prev,
                            sectors: prev.sectors.includes(sector) 
                                ? prev.sectors.filter(s => s !== sector) 
                                : [...prev.sectors, sector]
                        }))
                    }}
                />
                
                <div className="flex flex-col md:flex-row gap-8">
                    <FilterSidebar 
                        filters={filters} 
                        setFilters={setFilters} 
                        isOpen={isSidebarOpen} 
                        onClose={() => setIsSidebarOpen(false)} 
                    />
                    
                    <div className="flex-1 overflow-hidden min-w-0">
                        <ActiveFiltersBar filters={filters} clearFilter={clearFilter} />
                        <ProjectGrid projects={filteredProjects} onProjectClick={setSelectedProject} />
                    </div>
                </div>
            </div>

            {selectedProject && (
                <ProjectDetailModal 
                    project={selectedProject} 
                    onClose={() => setSelectedProject(null)} 
                />
            )}
        </div>
    );
};

export default ProjectDirectory;
