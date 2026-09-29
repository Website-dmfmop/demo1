import React, { useState, useEffect } from 'react';
import { exportToExcel } from '../utils/exportUtils';
import { API_URL } from '../config/api';

const DailyTaskTab = ({ currentUser, isSuperDelegate, setExportHandler }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Form state
    const [description, setDescription] = useState('');
    const [links, setLinks] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    
    // Admin filtering
    const [selectedUserId, setSelectedUserId] = useState('');
    const [users, setUsers] = useState([]);

    const canViewAll = ['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'].includes(currentUser?.role) || isSuperDelegate;

    const fetchTasks = async () => {
        try {
            setLoading(true);
            let url = `${API_URL}/api/daily-tasks`;
            if (canViewAll && selectedUserId) {
                url += `?userId=${selectedUserId}`;
            }

            const res = await fetch(url, {
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}` }
            });
            const data = await res.json();
            if (res.ok) setTasks(data);
        } catch (err) {
            console.error('Failed to fetch daily tasks');
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        if (!canViewAll) return;
        try {
            const res = await fetch(`${API_URL}/api/users`, {
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}` }
            });
            const data = await res.json();
            if (res.ok) setUsers(data);
        } catch (err) { }
    };

    useEffect(() => {
        fetchTasks();
    }, [selectedUserId, currentUser]);

    useEffect(() => {
        fetchUsers();
    }, [currentUser]);

    useEffect(() => {
        if (!setExportHandler) return;

        const handleExport = () => {
            if (!tasks || tasks.length === 0) {
                alert('No daily tasks available to export.');
                return;
            }

            const exportData = tasks.map(t => ({
                'Employee Name': t.user?.name || t.user?.loginId || 'Unknown',
                'Date': new Date(t.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-'),
                'Description': t.description,
                'Links': t.links || 'N/A',
                'Submitted At': new Date(t.createdAt).toLocaleString()
            }));

            exportToExcel(exportData, `Daily_Tasks_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
        };

        setExportHandler(() => handleExport);
        return () => setExportHandler(null);
    }, [tasks, setExportHandler]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description.trim()) return alert('Description is required');

        try {
            const res = await fetch(`${API_URL}/api/daily-tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({ date, description, links })
            });

            if (res.ok) {
                setDescription('');
                setLinks('');
                fetchTasks();
                alert('Daily task submitted successfully!');
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to submit task');
            }
        } catch (err) {
            alert('Error submitting daily task');
        }
    };

    return (
        <div className="space-y-6">
            {/* Submit Form */}
            {currentUser?.role !== 'SUPER_ADMIN' && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">edit_document</span>
                    Write Daily Task Summary
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                            <input 
                                type="date" 
                                value={date} 
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Links / References (Optional)</label>
                            <input 
                                type="text" 
                                placeholder="Google Docs, Drive link, etc."
                                value={links} 
                                onChange={(e) => setLinks(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Task Description</label>
                        <textarea 
                            rows="4"
                            placeholder="Describe what you worked on today..."
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="px-6 py-2 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
                            Submit Report
                        </button>
                    </div>
                </form>
            </div>
            )}

            {/* List View */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h3 className="text-lg font-bold text-gray-800">Submission History</h3>
                    
                    {canViewAll && (
                        <div className="w-full md:w-64">
                            <select 
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                            >
                                <option value="">All Employees</option>
                                {users.map(u => (
                                    <option key={u._id} value={u._id}>{u.name || u.loginId}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="py-8 text-center text-gray-500">Loading records...</div>
                ) : tasks.length === 0 ? (
                    <div className="py-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        No daily task records found.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                                <tr>
                                    <th className="px-4 py-3 rounded-tl-xl">Date</th>
                                    {canViewAll && <th className="px-4 py-3">Employee</th>}
                                    <th className="px-4 py-3">Description</th>
                                    <th className="px-4 py-3">Links</th>
                                    <th className="px-4 py-3 rounded-tr-xl">Submitted</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {tasks.map((task) => (
                                    <tr key={task._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4 font-medium text-gray-800">
                                            {new Date(task.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                        {canViewAll && (
                                            <td className="px-4 py-4 text-gray-600">
                                                {task.user?.name || task.user?.loginId || 'Unknown'}
                                            </td>
                                        )}
                                        <td className="px-4 py-4 text-gray-600 max-w-xs truncate" title={task.description}>
                                            {task.description}
                                        </td>
                                        <td className="px-4 py-4 text-gray-600">
                                            {task.links ? (
                                                <a href={task.links} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Link</a>
                                            ) : '-'}
                                        </td>
                                        <td className="px-4 py-4 text-xs text-gray-400">
                                            {new Date(task.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DailyTaskTab;
