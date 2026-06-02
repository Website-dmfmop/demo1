import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';

const ProjectGrid = ({ projects, onProjectClick }) => {

    if (!projects || projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-16 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-center">
                <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">search_off</span>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No projects found</h3>
                <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
            </div>
        );
    }

    return (
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence>
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} onClick={() => onProjectClick(project)} />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProjectGrid;
