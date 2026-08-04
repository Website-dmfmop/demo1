import React, { useState, useEffect } from 'react';
import { exportToCSV } from '../utils/exportUtils';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AttendanceTab = ({ currentUser, isSuperDelegate, setExportHandler }) => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedUserId, setSelectedUserId] = useState('');
    const [users, setUsers] = useState([]);

    const canViewAll = ['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'].includes(currentUser?.role) || isSuperDelegate;

    const fetchAttendance = async () => {
        try {
            setLoading(true);
            let url = `${API_URL}/api/attendance`;
            if (canViewAll && selectedUserId) {
                url += `?userId=${selectedUserId}`;
            }

            const res = await fetch(url, {
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}` }
            });
            const data = await res.json();
            if (res.ok) setAttendanceRecords(data);
        } catch (err) {
            console.error('Failed to fetch attendance');
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
        fetchAttendance();
    }, [selectedUserId, currentUser]);

    useEffect(() => {
        fetchUsers();
    }, [currentUser]);

    useEffect(() => {
        if (!setExportHandler) return;

        const handleExport = () => {
            if (!attendanceRecords || attendanceRecords.length === 0) {
                alert('No attendance data available to export.');
                return;
            }

            const exportData = attendanceRecords.map(r => {
                const dateObj = new Date(r.date);
                const dateStr = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
                const dayStr = dateObj.toLocaleDateString('en-US', { weekday: 'long' });

                const formatTime = (timeStr) => {
                    if (!timeStr) return '';
                    const t = new Date(timeStr);
                    if (isNaN(t.getTime())) return '';
                    return t.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true });
                };

                const calculateWorkingHours = (checkIn, checkOut) => {
                    if (!checkIn || !checkOut) return '';
                    const start = new Date(checkIn);
                    const end = new Date(checkOut);
                    if (isNaN(start) || isNaN(end)) return '';
                    const diffMs = end - start;
                    const hrs = Math.floor(diffMs / 3600000);
                    const mins = Math.floor((diffMs % 3600000) / 60000);
                    return `${String(hrs).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m`;
                };

                return {
                    'Employee Name': r.user?.name || r.user?.loginId || 'Unknown',
                    'Date': dateStr,
                    'Day': dayStr,
                    'Status': r.status || 'Present', // Derived from DB or default to Present
                    'Check In': formatTime(r.checkIn),
                    'Check Out': formatTime(r.logoutTime),
                    'Working Hours': calculateWorkingHours(r.checkIn, r.logoutTime)
                };
            });

            exportToCSV(exportData, `Attendance_Export_${new Date().toISOString().split('T')[0]}.csv`);
        };

        setExportHandler(() => handleExport);

        return () => setExportHandler(null);
    }, [attendanceRecords, setExportHandler]);

    const handleAction = async (action) => {
        try {
            const res = await fetch(`${API_URL}/api/attendance/${action}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}` }
            });
            if (res.ok) {
                fetchAttendance();
            } else {
                const data = await res.json();
                alert(data.error);
            }
        } catch (err) {
            alert(`Error processing ${action}`);
        }
    };

    // Determine today's status for the current user
    const todayStr = new Date().toISOString().split('T')[0];
    const currentUserId = currentUser?._id || currentUser?.id;
    const todayRecord = attendanceRecords.find(r => r.date === todayStr && (r.user?._id === currentUserId || r.user === currentUserId));
    const isCheckedIn = !!todayRecord;
    const isCheckedOut = isCheckedIn && !!todayRecord.logoutTime;

    // Calendar Helpers
    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

    const getWorkingDaysInMonth = (year, month) => {
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let sundays = 0;
        for (let i = 1; i <= daysInMonth; i++) {
            if (new Date(year, month, i).getDay() === 0) {
                sundays++;
            }
        }
        return daysInMonth - sundays;
    };

    const getUserPresentDays = (userId) => {
        const recordsInMonth = attendanceRecords.filter(r => {
            if (!r.date) return false;
            const d = new Date(r.date);
            const rUserId = r.user?._id || r.user;
            return rUserId === userId && 
                   d.getMonth() === currentMonth.getMonth() &&
                   d.getFullYear() === currentMonth.getFullYear() &&
                   d.getDay() !== 0; // Exclude Sundays
        });
        const distinctDays = new Set(recordsInMonth.map(r => r.date));
        return distinctDays.size;
    };

    const totalWorkingDays = getWorkingDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);
        const days = [];
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="bg-gray-50 p-2 min-h-[100px]"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const dayRecords = attendanceRecords.filter(r => r.date === dateStr);

            days.push(
                <div key={i} className="bg-white p-2 min-h-[120px] hover:bg-gray-50 transition-colors border border-gray-100 flex flex-col">
                    <div className="font-bold text-gray-500 mb-2">{i}</div>
                    <div className="space-y-1 flex-1 overflow-y-auto pr-1">
                        {dayRecords.map(r => (
                            <div key={r._id} className="text-[10px] p-1.5 rounded leading-tight font-medium shadow-sm bg-blue-50 text-blue-800 border border-blue-100">
                                {canViewAll && !selectedUserId && <div className="font-bold mb-1 truncate">{r.user?.name || r.user?.loginId}</div>}
                                <div className="flex items-center gap-1 text-green-700">
                                    <span className="material-symbols-outlined text-[10px]">login</span>
                                    {new Date(r.loginTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                {r.logoutTime && (
                                    <div className="flex items-center gap-1 text-red-700 mt-0.5">
                                        <span className="material-symbols-outlined text-[10px]">logout</span>
                                        {new Date(r.logoutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl font-bold text-gray-800">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h4>
                    <div className="flex gap-2">
                        <button onClick={prevMonth} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">chevron_left</span></button>
                        <button onClick={nextMonth} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center justify-center"><span className="material-symbols-outlined text-[20px]">chevron_right</span></button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <div className="min-w-[600px] grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="bg-gray-100 p-2 text-center text-xs font-bold text-gray-600 uppercase">{day}</div>
                        ))}
                        {days}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <div>
                    <h3 className="font-headline font-bold text-2xl text-gray-800">Attendance Tracker</h3>
                    <p className="text-sm text-gray-500 mt-1">Record your daily login and logout times.</p>
                </div>

                <div className="flex items-center gap-3">
                    {!isCheckedIn && (
                        <button onClick={() => handleAction('checkin')} className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-xl shadow-sm hover:bg-green-700 flex items-center gap-2 transition-transform active:scale-95">
                            <span className="material-symbols-outlined">login</span> LOGIN NOW
                        </button>
                    )}
                    {isCheckedIn && !isCheckedOut && (
                        <button onClick={() => handleAction('checkout')} className="px-6 py-2.5 bg-red-500 text-white font-bold rounded-xl shadow-sm hover:bg-red-600 flex items-center gap-2 transition-transform active:scale-95">
                            <span className="material-symbols-outlined">logout</span> LOGOUT NOW
                        </button>
                    )}
                    {isCheckedOut && (
                        <div className="px-6 py-2.5 bg-gray-100 text-gray-600 font-bold rounded-xl flex items-center gap-2 border border-gray-200">
                            <span className="material-symbols-outlined text-green-500">check_circle</span> Checked Out for Today
                        </div>
                    )}
                </div>
            </div>

            {canViewAll && (
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <label className="text-sm font-bold text-gray-700 whitespace-nowrap">Filter View:</label>
                        <select 
                            value={selectedUserId} 
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none max-w-xs w-full"
                        >
                            <option value="">All Employees</option>
                            {users.map(u => (
                                <option key={u._id} value={u._id}>
                                    {u.name || u.loginId} ({u.role.replace(/_/g, ' ')}) - {getUserPresentDays(u._id)}/{totalWorkingDays} days
                                </option>
                            ))}
                        </select>
                    </div>
                    {selectedUserId && (
                        <div className="md:ml-auto flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                            <span className="material-symbols-outlined text-blue-500">calendar_today</span>
                            <span className="text-sm text-blue-700 font-medium">Present this month:</span>
                            <span className="text-lg font-headline font-bold text-blue-800">{getUserPresentDays(selectedUserId)} <span className="text-sm text-blue-600 font-medium">/ {totalWorkingDays} days</span></span>
                        </div>
                    )}
                </div>
            )}

            {loading ? (
                <div className="text-center py-12 text-gray-500 font-medium animate-pulse">Loading calendar...</div>
            ) : (
                renderCalendar()
            )}
        </div>
    );
};

export default AttendanceTab;
