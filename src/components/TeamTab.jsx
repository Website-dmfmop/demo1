import React, { useState, useEffect } from 'react';
import { exportToCSV } from '../utils/exportUtils';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TeamTab = ({ currentUser, setExportHandler }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ name: '', loginId: '', password: '', role: 'TRAINER', customRole: '' });
    const [editingUserId, setEditingUserId] = useState(null);
    const [editUserForm, setEditUserForm] = useState({ name: '', password: '' });
    const [permissions, setPermissions] = useState([]);
    const [error, setError] = useState(null);

    const defaultRoles = ['DIRECTOR', 'OPERATION_HEAD', 'TECHNICAL_COORDINATOR', 'TECHNICAL_ASSOCIATE', 'TRAINER', 'INTERN', 'OTHER'];
    const rolesList = Array.from(new Set([...defaultRoles, ...users.map(u => u.role).filter(r => r !== 'SUPER_ADMIN')]));

    const fetchPermissions = async () => {
        try {
            const res = await fetch(`${API_URL}/api/permissions`, {
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}` }
            });
            const data = await res.json();
            if (res.ok) setPermissions(data);
        } catch (err) { }
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/users`, {
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}` }
            });
            const data = await res.json();
            if (res.ok) setUsers(data);
            else setError(data.error);
        } catch (err) {
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchPermissions();
    }, []);

    useEffect(() => {
        if (!setExportHandler) return;

        const handleExport = () => {
            if (!users || users.length === 0) {
                alert('No users available to export.');
                return;
            }
            exportToCSV(users, 'Team_Export.csv');
        };

        setExportHandler(() => handleExport);

        return () => setExportHandler(null);
    }, [users, setExportHandler]);

    const togglePermission = async (role, currentVal) => {
        try {
            const res = await fetch(`${API_URL}/api/permissions/${role}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({ canViewAllTasks: !currentVal })
            });
            if (res.ok) fetchPermissions();
            else alert('Failed to update permission');
        } catch(err) {
            alert('Error updating permission');
        }
    };

    const createUser = async (e) => {
        e.preventDefault();
        setError(null);
        
        let payload = { ...form };
        if (payload.role === 'OTHER') {
            payload.role = payload.customRole ? payload.customRole.trim().toUpperCase().replace(/\s+/g, '_') : '';
            if (!payload.role) {
                setError('Custom role cannot be empty');
                return;
            }
        }
        delete payload.customRole;

        try {
            const res = await fetch(`${API_URL}/api/users`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (res.ok) {
                setForm({ name: '', loginId: '', password: '', role: 'TRAINER', customRole: '' });
                fetchUsers();
                alert('User created successfully');
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError('Error creating user');
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            const res = await fetch(`${API_URL}/api/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}` }
            });
            if (res.ok) {
                fetchUsers();
                alert('User deleted successfully');
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to delete user');
            }
        } catch (err) {
            alert('Error deleting user');
        }
    };

    const startEditingUser = (user) => {
        setEditingUserId(user._id);
        setEditUserForm({ name: user.name || '', password: '' });
    };

    const submitEditUser = async (id) => {
        try {
            const res = await fetch(`${API_URL}/api/users/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({
                    name: editUserForm.name,
                    ...(editUserForm.password && { password: editUserForm.password })
                })
            });
            if (res.ok) {
                setEditingUserId(null);
                fetchUsers();
                alert('User updated successfully');
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to update user');
            }
        } catch (err) {
            alert('Error updating user');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            {error && <div className="p-4 bg-red-100 text-red-700 rounded-xl">{error}</div>}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <form onSubmit={createUser} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-3 mb-6">Create New User</h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" placeholder="Optional" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Login ID</label>
                                <input type="text" required value={form.loginId} onChange={e => setForm({...form, loginId: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                                <input type="password" required minLength={6} value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Role</label>
                                <select value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary">
                                    <option value="DIRECTOR">Director</option>
                                    <option value="OPERATION_HEAD">Operation Head</option>
                                    <option value="TECHNICAL_COORDINATOR">Technical Coordinator</option>
                                    <option value="TECHNICAL_ASSOCIATE">Technical Associate</option>
                                    <option value="TRAINER">Trainer</option>
                                    <option value="INTERN">Intern</option>
                                    <option value="OTHER">Other</option>
                                </select>
                                {form.role === 'OTHER' && (
                                    <div className="mt-2">
                                        <input type="text" placeholder="Type role here" required value={form.customRole} onChange={e => setForm({...form, customRole: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                                    </div>
                                )}
                            </div>
                            <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover shadow-sm">Create User</button>
                        </div>
                    </form>
                </div>

                <div className="md:col-span-2">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-3 mb-6">Active Team Members</h4>
                        {loading ? (
                            <div className="text-center text-gray-500 py-8">Loading...</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase">
                                        <tr>
                                            <th className="px-4 py-3 border-b">Name</th>
                                            <th className="px-4 py-3 border-b">Login ID</th>
                                            <th className="px-4 py-3 border-b">Role</th>
                                            <th className="px-4 py-3 border-b text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {users.map(u => (
                                            <tr key={u._id} className="hover:bg-gray-50">
                                                {editingUserId === u._id ? (
                                                    <td colSpan="4" className="px-4 py-3">
                                                        <div className="flex gap-2 items-center">
                                                            <input type="text" placeholder="Name" value={editUserForm.name} onChange={e => setEditUserForm({...editUserForm, name: e.target.value})} className="px-3 py-1 border border-gray-300 rounded text-sm w-1/3" />
                                                            <input type="password" placeholder="New Password (leave blank to keep)" value={editUserForm.password} onChange={e => setEditUserForm({...editUserForm, password: e.target.value})} className="px-3 py-1 border border-gray-300 rounded text-sm w-1/3" />
                                                            <button onClick={() => submitEditUser(u._id)} className="px-3 py-1 bg-primary text-white font-bold rounded text-sm hover:bg-primary-hover">Save</button>
                                                            <button onClick={() => setEditingUserId(null)} className="px-3 py-1 bg-gray-200 text-gray-700 font-bold rounded text-sm hover:bg-gray-300">Cancel</button>
                                                        </div>
                                                    </td>
                                                ) : (
                                                    <>
                                                        <td className="px-4 py-3 font-medium">{u.name || '-'}</td>
                                                        <td className="px-4 py-3 font-bold">{u.loginId}</td>
                                                        <td className="px-4 py-3 text-xs"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{u.role.replace(/_/g, ' ')}</span></td>
                                                        <td className="px-4 py-3 text-right">
                                                            {u.role !== 'SUPER_ADMIN' && (
                                                                <div className="flex justify-end gap-1">
                                                                    <button onClick={() => startEditingUser(u)} className="text-gray-400 hover:text-blue-500 transition-colors p-1" title="Edit User">
                                                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                                                    </button>
                                                                    <button onClick={() => deleteUser(u._id)} className="text-red-500 hover:text-red-700 transition-colors p-1" title="Delete User">
                                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
                <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-3 mb-6">Role Feature Permissions</h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase">
                            <tr>
                                <th className="px-4 py-3 border-b">Role</th>
                                <th className="px-4 py-3 border-b text-center">Can View All Workspace Tasks</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {rolesList.map(r => {
                                const perm = permissions.find(p => p.role === r) || { canViewAllTasks: false };
                                return (
                                    <tr key={r} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-bold text-xs"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{r.replace(/_/g, ' ')}</span></td>
                                        <td className="px-4 py-3 text-center">
                                            <button 
                                                onClick={() => togglePermission(r, perm.canViewAllTasks)}
                                                className={`w-12 h-6 rounded-full transition-colors relative shadow-inner ${perm.canViewAllTasks ? 'bg-green-500' : 'bg-gray-300'}`}
                                            >
                                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm absolute top-1 transition-all ${perm.canViewAllTasks ? 'left-7' : 'left-1'}`}></div>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeamTab;
