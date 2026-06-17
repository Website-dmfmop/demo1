import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TasksTab = ({ currentUser, isSuperDelegate }) => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [form, setForm] = useState({ title: '', description: '', assignedTo: '', deadline: '' });
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editTaskForm, setEditTaskForm] = useState({ title: '', description: '', assignedTo: '', deadline: '' });
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('list');
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const isCreatorOrAdmin = (task) => currentUser?.role === 'SUPER_ADMIN' || isSuperDelegate || currentUser?.id === task.assignedBy?._id || currentUser?._id === task.assignedBy?._id;

    const canCreateTask = ['SUPER_ADMIN', 'DIRECTOR', 'OPERATION_HEAD'].includes(currentUser?.role) || isSuperDelegate;

    const fetchData = async () => {
        try {
            setLoading(true);
            const token = sessionStorage.getItem('adminToken');
            
            const tasksRes = await fetch(`${API_URL}/api/tasks`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const tasksData = await tasksRes.json();
            if (tasksRes.ok) setTasks(tasksData);
            
            if (canCreateTask) {
                const usersRes = await fetch(`${API_URL}/api/users`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const usersData = await usersRes.json();
                if (usersRes.ok) setUsers(usersData);
            }
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentUser]);

    const createTask = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/api/tasks`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                setForm({ title: '', description: '', assignedTo: '', deadline: '' });
                setFormOpen(false);
                fetchData();
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to create task');
            }
        } catch (err) {
            alert('Error creating task');
        }
    };

    const updateTask = async (id, data) => {
        try {
            const res = await fetch(`${API_URL}/api/tasks/${id}/status`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(data)
            });
            if (res.ok) {
                fetchData();
            } else {
                const resData = await res.json();
                alert(resData.error || 'Failed to update task');
            }
        } catch (err) {
            alert('Error updating task');
        }
    };

    const deleteTask = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            const res = await fetch(`${API_URL}/api/tasks/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}` }
            });
            if (res.ok) fetchData();
            else alert('Failed to delete task');
        } catch (err) { alert('Error deleting task'); }
    };

    const submitEditTask = async (id) => {
        try {
            const res = await fetch(`${API_URL}/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(editTaskForm)
            });
            if (res.ok) {
                setEditingTaskId(null);
                fetchData();
            } else {
                alert('Failed to update task');
            }
        } catch (err) { alert('Error updating task'); }
    };

    const startEditing = (task) => {
        setEditingTaskId(task._id);
        const formatDateTimeLocal = (d) => {
            if (!d) return '';
            const date = new Date(d);
            return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
        };
        setEditTaskForm({ title: task.title, description: task.description, assignedTo: task.assignedTo?._id || '', deadline: formatDateTimeLocal(task.deadline) });
    };

    const statusColors = {
        'PENDING': 'bg-gray-100 text-gray-700',
        'IN_PROGRESS': 'bg-blue-100 text-blue-700',
        'REQUIRES_INPUT': 'bg-yellow-100 text-yellow-700',
        'REQUIRES_REVIEW': 'bg-purple-100 text-purple-700',
        'COMPLETED': 'bg-green-100 text-green-700'
    };

    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);
        const days = [];
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="bg-gray-50 p-2 min-h-[100px]"></div>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayTasks = tasks.filter(t => {
                if (!t.deadline) return false;
                const dDate = new Date(t.deadline);
                return dDate.getDate() === i && dDate.getMonth() === currentMonth.getMonth() && dDate.getFullYear() === currentMonth.getFullYear();
            });

            days.push(
                <div key={i} className="bg-white p-2 min-h-[120px] hover:bg-gray-50 transition-colors">
                    <div className="font-bold text-gray-500 mb-2">{i}</div>
                    <div className="space-y-1">
                        {dayTasks.map(t => (
                            <div key={t._id} onClick={() => { setViewMode('list'); setEditingTaskId(t._id); }} className={`text-[10px] p-1.5 rounded cursor-pointer leading-tight font-medium shadow-sm ${statusColors[t.status] || 'bg-gray-100 text-gray-700'}`}>
                                <div className="font-bold truncate">{t.title}</div>
                                <div className="truncate opacity-80">{t.assignedTo?.name || t.assignedTo?.loginId}</div>
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
            {error && <div className="p-4 bg-red-100 text-red-700 rounded-xl">{error}</div>}
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                    <h3 className="font-headline font-bold text-2xl text-gray-800">Workspace Tasks</h3>
                    <div className="bg-gray-100 p-1 rounded-lg flex items-center">
                        <button onClick={() => setViewMode('list')} className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${viewMode === 'list' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>List</button>
                        <button onClick={() => setViewMode('calendar')} className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors flex items-center gap-1 ${viewMode === 'calendar' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><span className="material-symbols-outlined text-[16px]">calendar_month</span> Calendar</button>
                    </div>
                </div>
                {canCreateTask && (
                    <button onClick={() => setFormOpen(!formOpen)} className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover flex items-center gap-2 shadow-md">
                        <span className="material-symbols-outlined text-[18px]">add</span> {formOpen ? 'Cancel' : 'Create Task'}
                    </button>
                )}
            </div>

            {formOpen && canCreateTask && (
                <form onSubmit={createTask} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Task Title</label>
                            <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                            <textarea required value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Assign To</label>
                            <select required value={form.assignedTo} onChange={e => setForm({...form, assignedTo: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary">
                                <option value="" disabled>Select User</option>
                                {users.filter(u => u.role !== 'SUPER_ADMIN').map(u => (
                                    <option key={u._id} value={u._id}>{u.name || u.loginId} ({u.role.replace(/_/g, ' ')})</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Deadline (Optional)</label>
                            <input type="datetime-local" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                    </div>
                    <div className="mt-6 text-right">
                        <button type="submit" className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700">Assign Task</button>
                    </div>
                </form>
            )}

            {loading ? (
                <div className="text-center text-gray-500 py-8">Loading tasks...</div>
            ) : viewMode === 'calendar' ? (
                renderCalendar()
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {tasks.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No tasks found.</p>
                    ) : (
                        tasks.map(task => (
                            <div key={task._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <div className="flex justify-between items-start mb-4">
                                    {editingTaskId === task._id ? (
                                        <div className="w-full space-y-4 pr-4">
                                            <input type="text" value={editTaskForm.title} onChange={e => setEditTaskForm({...editTaskForm, title: e.target.value})} className="w-full text-xl font-bold px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                                            <textarea value={editTaskForm.description} onChange={e => setEditTaskForm({...editTaskForm, description: e.target.value})} rows="2" className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary"></textarea>
                                            <div className="grid grid-cols-2 gap-4">
                                                <select value={editTaskForm.assignedTo} onChange={e => setEditTaskForm({...editTaskForm, assignedTo: e.target.value})} className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary">
                                                    {users.filter(u => u.role !== 'SUPER_ADMIN').map(u => (
                                                        <option key={u._id} value={u._id}>{u.name || u.loginId} ({u.role.replace(/_/g, ' ')})</option>
                                                    ))}
                                                </select>
                                                <input type="datetime-local" value={editTaskForm.deadline} onChange={e => setEditTaskForm({...editTaskForm, deadline: e.target.value})} className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" title="Deadline" />
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => submitEditTask(task._id)} className="px-4 py-1.5 bg-primary text-white text-sm font-bold rounded hover:bg-primary-hover">Save</button>
                                                <button onClick={() => setEditingTaskId(null)} className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-bold rounded hover:bg-gray-200">Cancel</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <h4 className="font-bold text-xl text-gray-800">{task.title}</h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Assigned by <span className="font-bold">{task.assignedBy?.name || task.assignedBy?.loginId}</span> to <span className="font-bold">{task.assignedTo?.name || task.assignedTo?.loginId}</span>
                                                {task.deadline && <span className="ml-3 text-red-500 font-semibold"><span className="material-symbols-outlined text-[14px] align-text-bottom mr-1">schedule</span>Deadline: {new Date(task.deadline).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} {new Date(task.deadline).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>}
                                            </p>
                                        </div>
                                    )}
                                    
                                    {editingTaskId !== task._id && (
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${statusColors[task.status]}`}>{task.status.replace(/_/g, ' ')}</span>
                                            <select 
                                                value={task.status}
                                                onChange={(e) => updateTask(task._id, { status: e.target.value })}
                                                className="text-sm border border-gray-200 rounded-lg px-2 py-1 bg-gray-50 outline-none"
                                            >
                                                <option value="PENDING">Pending</option>
                                                <option value="IN_PROGRESS">In Progress</option>
                                                <option value="REQUIRES_INPUT">Requires Input</option>
                                                <option value="REQUIRES_REVIEW">Requires Review</option>
                                                <option value="COMPLETED">Completed</option>
                                            </select>
                                            {isCreatorOrAdmin(task) && (
                                                <>
                                                    <button onClick={() => startEditing(task)} className="text-gray-400 hover:text-blue-500 transition-colors p-1" title="Edit Task">
                                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                                    </button>
                                                    <button onClick={() => deleteTask(task._id)} className="text-gray-400 hover:text-red-500 transition-colors p-1" title="Delete Task">
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                                {editingTaskId !== task._id && <p className="text-sm text-gray-600 mb-6">{task.description}</p>}
                                
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Submission Document (Drive URL)</label>
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="url" 
                                            placeholder="Paste Google Drive link here" 
                                            defaultValue={task.documentUrl || ''}
                                            onBlur={(e) => {
                                                if (e.target.value !== (task.documentUrl || '')) {
                                                    updateTask(task._id, { documentUrl: e.target.value });
                                                }
                                            }}
                                            className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 outline-none focus:ring-2 focus:ring-primary"
                                        />
                                        {task.documentUrl && (
                                            <a href={task.documentUrl} target="_blank" rel="noreferrer" className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center shrink-0">
                                                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Task History</h5>
                                    <div className="space-y-2">
                                        {task.history.map((h, i) => (
                                            <div key={i} className="text-xs text-gray-500 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                                <span className="font-bold text-gray-700">{h.changedBy?.name || h.changedBy?.loginId}</span> changed status to <span className="font-bold">{h.newStatus.replace(/_/g, ' ')}</span>
                                                <span className="text-gray-400 ml-auto">{new Date(h.timestamp).toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default TasksTab;
