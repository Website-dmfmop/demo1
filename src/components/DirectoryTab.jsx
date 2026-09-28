import React, { useState, useEffect } from 'react';
import { API_URL, authFetch } from '../config/api';

const DirectoryTab = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await authFetch(`${API_URL}/api/users`);
            const data = await res.json();
            if (res.ok) {
                // Filter out system accounts to only show real employees
                setUsers(data.filter(u => !u.isSystemAccount && u.role !== 'SYSTEM'));
            }
        } catch (err) {
            console.error('Failed to fetch users', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter(u => 
        (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
        (u.role || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-300 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[28px]">badge</span>
                    </div>
                    <div>
                        <h3 className="font-headline font-bold text-2xl text-gray-800 leading-tight">Employee Directory</h3>
                        <p className="text-sm text-gray-500 font-medium mt-1">View detailed profiles of all active team members</p>
                    </div>
                </div>

                <div className="relative w-full md:w-80">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input 
                        type="text" 
                        placeholder="Search by name, role, or email..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium text-gray-700"
                    />
                </div>
            </div>

            {/* Content Section */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
                    <span className="material-symbols-outlined animate-spin text-4xl text-primary/50">progress_activity</span>
                    <p className="font-medium">Loading employee profiles...</p>
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-gray-300">search_off</span>
                    </div>
                    <p className="font-medium text-lg">No employees found matching your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => (
                        <div key={user._id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group hover:-translate-y-1 duration-300 relative overflow-hidden flex flex-col h-full">
                            {/* Decorative Background Element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
                            
                            {/* Card Header (Avatar + Name/Role) */}
                            <div className="flex items-center gap-4 relative z-10 mb-6">
                                <div className="relative">
                                    {user.profileImage ? (
                                        <img src={user.profileImage} alt={user.name || user.loginId} className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-gray-100" />
                                    ) : (
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary shadow-sm border border-primary/10">
                                            <span className="font-bold text-xl uppercase">{(user.name || user.loginId).charAt(0)}</span>
                                        </div>
                                    )}
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                
                                <div>
                                    <h4 className="font-bold text-gray-800 text-lg leading-tight">{user.name || '-'}</h4>
                                    <p className="text-xs text-gray-400 font-medium mb-1.5">ID: {user.loginId}</p>
                                    <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg uppercase tracking-widest border border-blue-100/50 shadow-sm">
                                        {user.role.replace(/_/g, ' ')}
                                    </span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px w-full bg-gray-100 mb-5 relative z-10"></div>

                            {/* Contact Info */}
                            <div className="space-y-3 relative z-10 flex-grow">
                                <div className="flex items-center gap-3 group/item">
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover/item:bg-primary/10 group-hover/item:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[16px]">mail</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Email</p>
                                        <p className="text-sm text-gray-700 font-medium truncate" title={user.email || 'N/A'}>
                                            {user.email || <span className="text-gray-300 italic">Not provided</span>}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 group/item">
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover/item:bg-primary/10 group-hover/item:text-primary transition-colors">
                                        <span className="material-symbols-outlined text-[16px]">call</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Phone</p>
                                        <p className="text-sm text-gray-700 font-medium truncate">
                                            {user.phone || <span className="text-gray-300 italic">Not provided</span>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Footer */}
                            {user.role === 'SUPER_ADMIN' && (
                                <div className="mt-5 pt-4 border-t border-gray-50 text-center relative z-10">
                                    <span className="text-xs font-bold text-primary flex items-center justify-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">shield_person</span>
                                        System Administrator
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DirectoryTab;
