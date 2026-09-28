import React, { useState, useEffect } from 'react';
import { exportToCSV } from '../utils/exportUtils';
import { API_URL } from '../config/api';

const LeaveRequestTab = ({ currentUser, isSuperDelegate, setExportHandler }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Form state
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [type, setType] = useState('Casual');
    const [reason, setReason] = useState('');
    
    // Admin filtering
    const [selectedUserId, setSelectedUserId] = useState('');
    const [users, setUsers] = useState([]);

    const canManageLeaves = ['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'].includes(currentUser?.role) || isSuperDelegate;

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/leave-requests`, {
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}` }
            });
            let data = await res.json();
            
            if (res.ok) {
                if (canManageLeaves && selectedUserId) {
                    data = data.filter(r => r.user?._id === selectedUserId);
                }
                setRequests(data);
            }
        } catch (err) {
            console.error('Failed to fetch leave requests');
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        if (!canManageLeaves) return;
        try {
            const res = await fetch(`${API_URL}/api/users`, {
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}` }
            });
            const data = await res.json();
            if (res.ok) setUsers(data);
        } catch (err) { }
    };

    useEffect(() => {
        fetchRequests();
    }, [selectedUserId, currentUser]);

    useEffect(() => {
        fetchUsers();
    }, [currentUser]);

    useEffect(() => {
        if (!setExportHandler) return;

        const handleExport = () => {
            if (!requests || requests.length === 0) {
                alert('No leave requests available to export.');
                return;
            }

            const exportData = requests.map(r => ({
                'Employee Name': r.user?.name || r.user?.loginId || 'Unknown',
                'Type': r.type,
                'Start Date': new Date(r.startDate).toLocaleDateString('en-GB'),
                'End Date': new Date(r.endDate).toLocaleDateString('en-GB'),
                'Reason': r.reason,
                'Status': r.status,
                'Approved By': r.approvedBy ? (r.approvedBy.name || r.approvedBy.loginId) : 'N/A',
                'Applied At': new Date(r.createdAt).toLocaleString()
            }));

            exportToCSV(exportData, `Leave_Requests_Export_${new Date().toISOString().split('T')[0]}.csv`);
        };

        setExportHandler(() => handleExport);
        return () => setExportHandler(null);
    }, [requests, setExportHandler]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!startDate || !endDate || !reason.trim()) return alert('Please fill all required fields');
        if (new Date(startDate) > new Date(endDate)) return alert('End date cannot be before start date');

        try {
            const res = await fetch(`${API_URL}/api/leave-requests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({ startDate, endDate, type, reason })
            });

            if (res.ok) {
                setStartDate('');
                setEndDate('');
                setReason('');
                setType('Casual');
                fetchRequests();
                alert('Leave request submitted successfully!');
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to submit request');
            }
        } catch (err) {
            alert('Error submitting leave request');
        }
    };

    const handleStatusUpdate = async (id, status) => {
        if (!window.confirm(`Are you sure you want to mark this request as ${status}?`)) return;

        try {
            const res = await fetch(`${API_URL}/api/leave-requests/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({ status })
            });

            if (res.ok) {
                fetchRequests();
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to update status');
            }
        } catch (err) {
            alert('Error updating status');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
            case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        }
    };

    return (
        <div className="space-y-6">
            {/* Submit Form */}
            {currentUser?.role !== 'SUPER_ADMIN' && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">event_busy</span>
                    Apply for Leave
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
                            <input 
                                type="date" 
                                value={startDate} 
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
                            <input 
                                type="date" 
                                value={endDate} 
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Leave Type</label>
                            <select 
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none"
                            >
                                <option value="Casual">Casual Leave</option>
                                <option value="Sick">Sick Leave</option>
                                <option value="Vacation">Vacation</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Reason</label>
                        <textarea 
                            rows="3"
                            placeholder="Please provide a brief reason for your leave..."
                            value={reason} 
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="px-6 py-2 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-sm">
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
            )}

            {/* List View */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h3 className="text-lg font-bold text-gray-800">Leave Requests History</h3>
                    
                    {canManageLeaves && (
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
                    <div className="py-8 text-center text-gray-500">Loading requests...</div>
                ) : requests.length === 0 ? (
                    <div className="py-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        No leave requests found.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                                <tr>
                                    {canManageLeaves && <th className="px-4 py-3 rounded-tl-xl">Employee</th>}
                                    <th className={`px-4 py-3 ${!canManageLeaves ? 'rounded-tl-xl' : ''}`}>Date Range</th>
                                    <th className="px-4 py-3">Type & Reason</th>
                                    <th className="px-4 py-3">Status</th>
                                    {canManageLeaves && <th className="px-4 py-3 rounded-tr-xl">Actions</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {requests.map((req) => (
                                    <tr key={req._id} className="hover:bg-gray-50 transition-colors">
                                        {canManageLeaves && (
                                            <td className="px-4 py-4 text-gray-800 font-medium">
                                                {req.user?.name || req.user?.loginId || 'Unknown'}
                                            </td>
                                        )}
                                        <td className="px-4 py-4 text-gray-600">
                                            <div className="font-semibold">{new Date(req.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</div>
                                            <div className="text-xs text-gray-400">to {new Date(req.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</div>
                                        </td>
                                        <td className="px-4 py-4 text-gray-600 max-w-xs">
                                            <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs font-semibold mb-1">{req.type}</span>
                                            <p className="truncate text-xs" title={req.reason}>{req.reason}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(req.status)}`}>
                                                {req.status}
                                            </span>
                                            {req.approvedBy && req.status !== 'Pending' && (
                                                <p className="text-[10px] text-gray-400 mt-1">by {req.approvedBy.name || req.approvedBy.loginId}</p>
                                            )}
                                        </td>
                                        {canManageLeaves && (
                                            <td className="px-4 py-4">
                                                {req.status === 'Pending' ? (
                                                    <div className="flex gap-2">
                                                        <button 
                                                            onClick={() => handleStatusUpdate(req._id, 'Approved')}
                                                            className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
                                                            title="Approve"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">check</span>
                                                        </button>
                                                        <button 
                                                            onClick={() => handleStatusUpdate(req._id, 'Rejected')}
                                                            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                                                            title="Reject"
                                                        >
                                                            <span className="material-symbols-outlined text-[18px]">close</span>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-xs">Resolved</span>
                                                )}
                                            </td>
                                        )}
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

export default LeaveRequestTab;
