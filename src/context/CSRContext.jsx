import React, { createContext, useContext, useState } from 'react';

const CSRContext = createContext();

export const CSRProvider = ({ children }) => {
    const [currentView, setCurrentView] = useState('home'); // 'home' | 'directory'
    const [projects, setProjects] = useState([]);
    const [csrPartners, setCsrPartners] = useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                const [projRes, partRes] = await Promise.all([
                    fetch(`${API_URL}/api/projects`),
                    fetch(`${API_URL}/api/csr-partners`)
                ]);
                if (projRes.ok) {
                    const data = await projRes.json();
                    setProjects(data);
                }
                if (partRes.ok) {
                    const data = await partRes.json();
                    // only store approved partners for the public directory
                    setCsrPartners(data.filter(p => p.status === 'Approved'));
                }
            } catch (error) {
                console.error("Failed to fetch CSR data:", error);
            }
        };
        fetchData();
    }, []);

    const addProject = (project) => {
        setProjects(prev => [project, ...prev]);
    };

    return (
        <CSRContext.Provider value={{ currentView, setCurrentView, projects, setProjects, addProject, csrPartners, setCsrPartners }}>
            {children}
        </CSRContext.Provider>
    );
};

export const useCSRContext = () => useContext(CSRContext);
