import React, { createContext, useContext, useState } from 'react';

const CSRContext = createContext();

export const CSRProvider = ({ children }) => {
    const [currentView, setCurrentView] = useState('home'); // 'home' | 'directory'
    const [projects, setProjects] = useState([]);

    React.useEffect(() => {
        const fetchProjects = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const res = await fetch(`${API_URL}/api/projects`);
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            }
        };
        fetchProjects();
    }, []);

    const addProject = (project) => {
        setProjects(prev => [project, ...prev]);
    };

    return (
        <CSRContext.Provider value={{ currentView, setCurrentView, projects, setProjects, addProject }}>
            {children}
        </CSRContext.Provider>
    );
};

export const useCSRContext = () => useContext(CSRContext);
