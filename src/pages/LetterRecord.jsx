import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LetterRegistryTab from '../components/LetterRegistryTab';
import { API_URL } from '../config/api';

const LetterRecord = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('adminToken'));
    const [currentUser, setCurrentUser] = useState(() => {
        const stored = sessionStorage.getItem('adminUser');
        return stored ? JSON.parse(stored) : null;
    });

    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ loginId, password })
            });
            const data = await res.json();
            if (res.ok) {
                const allowedRoles = ['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD', 'BRANCH_OFFICE'];
                if (!allowedRoles.includes(data.user.role)) {
                    alert('You do not have permission to access the Letter Registry.');
                    return;
                }
                
                sessionStorage.setItem('adminToken', data.token);
                sessionStorage.setItem('adminUser', JSON.stringify(data.user));
                setCurrentUser(data.user);
                setIsAuthenticated(true);
            } else {
                alert(data.error || 'Invalid credentials');
            }
        } catch (err) {
            alert('Error logging in');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminUser');
        setIsAuthenticated(false);
        setCurrentUser(null);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 md:p-14 border border-gray-100">
                    <div className="flex flex-col items-center mb-10 text-center gap-3">
                        <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-2">
                            <span className="material-symbols-outlined text-4xl">mark_email_read</span>
                        </div>
                        <h1 className="text-3xl font-headline font-bold text-gray-800">Letter Registry Login</h1>
                        <p className="text-gray-500 font-medium font-body">Please enter credentials to continue</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Login ID</label>
                            <input 
                                type="text" 
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                autoFocus
                                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold tracking-widest"
                                placeholder="office-id"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all font-bold tracking-widest"
                                placeholder="••••••••"
                            />
                        </div>
                        <button type="submit" className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold tracking-widest uppercase transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm mt-4">
                            Secure Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // Double check on render
    const allowedRoles = ['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD', 'BRANCH_OFFICE'];
    if (!allowedRoles.includes(currentUser?.role)) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center p-8">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                    <p className="text-gray-600 mb-6">You do not have permission to view the Letter Registry.</p>
                    <button onClick={handleLogout} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold">Logout</button>
                </div>
            </div>
        );
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
                    
                    <div className="flex gap-2">
                        {currentUser?.role !== 'BRANCH_OFFICE' && (
                            <button 
                                onClick={() => { navigate('/workspace'); }} 
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-lg transition-colors shadow-sm"
                            >
                                <span className="material-symbols-outlined text-[18px]">dashboard</span>
                                <span className="hidden md:inline">Workspace</span>
                            </button>
                        )}
                        <button 
                            onClick={handleLogout} 
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-bold rounded-lg transition-colors shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[18px]">logout</span>
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
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
