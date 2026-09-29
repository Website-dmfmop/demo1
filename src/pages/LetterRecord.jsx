import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LetterRegistryTab from '../components/LetterRegistryTab';

const LetterRecord = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('adminToken'));
    const [currentUser, setCurrentUser] = useState(() => {
        const stored = sessionStorage.getItem('adminUser');
        return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
        if (!isAuthenticated) {
            // Redirect to workspace if not logged in
            navigate('/workspace');
            return;
        }

        // Additional security check: if the user manually navigates here, ensure they have access
        const allowedRoles = ['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD', 'BRANCH_OFFICE'];
        if (!allowedRoles.includes(currentUser?.role)) {
            navigate('/workspace');
        }
    }, [isAuthenticated, currentUser, navigate]);

    if (!isAuthenticated || !['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD', 'BRANCH_OFFICE'].includes(currentUser?.role)) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <header className="h-20 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-6 md:px-10 shrink-0 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-3xl text-primary">mark_email_read</span>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">Letter & Dispatch Registry</h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex flex-col text-right">
                        <span className="font-bold text-sm text-gray-800">{currentUser?.name || 'User'}</span>
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{currentUser?.role?.replace('_', ' ')}</span>
                    </div>
                    <button 
                        onClick={() => { navigate('/workspace'); }} 
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-lg transition-colors shadow-sm"
                    >
                        <span className="material-symbols-outlined text-[18px]">dashboard</span>
                        <span className="hidden md:inline">Workspace</span>
                    </button>
                </div>
            </header>
            <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
                <div className="max-w-[1400px] mx-auto">
                    <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mb-6 flex items-start gap-3">
                        <span className="material-symbols-outlined text-blue-500 mt-0.5">info</span>
                        <div>
                            <h4 className="font-bold text-blue-800 text-sm">Standalone Mode Active</h4>
                            <p className="text-sm text-blue-600">You are viewing the Letter Registry in full-screen standalone mode. You can export, edit, and create records from here just like in the workspace.</p>
                        </div>
                    </div>
                    <LetterRegistryTab currentUser={currentUser} setExportHandler={() => {}} />
                </div>
            </main>
        </div>
    );
};

export default LetterRecord;
