import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TasksTab = ({ currentUser, isSuperDelegate }) => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [form, setForm] = useState({ title: '', description: '', assignedTo: [], deadline: '', priority: 'Medium' });
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editTaskForm, setEditTaskForm] = useState({ title: '', description: '', assignedTo: '', deadline: '', priority: 'Medium' });
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState('list');
    const [filterPriority, setFilterPriority] = useState('All');
    const [sortBy, setSortBy] = useState('date');
    const [selectedDateTasks, setSelectedDateTasks] = useState(null);
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
            if (!form.assignedTo || form.assignedTo.length === 0) {
                alert('Please select at least one user');
                return;
            }

            let targets = [];
            if (form.assignedTo.includes('ALL')) {
                targets = users.filter(u => u.role !== 'SUPER_ADMIN').map(u => u._id);
            } else {
                targets = form.assignedTo;
            }

            const promises = targets.map(userId => 
                fetch(`${API_URL}/api/tasks`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                    },
                    body: JSON.stringify({ ...form, assignedTo: userId })
                })
            );
            
            const results = await Promise.all(promises);
            const failed = results.filter(res => !res.ok);
            
            if (failed.length > 0) {
                alert(`Failed to create task for ${failed.length} user(s).`);
            } else {
                setForm({ title: '', description: '', assignedTo: [], deadline: '', priority: 'Medium' });
                setFormOpen(false);
                fetchData();
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
        setEditTaskForm({ title: task.title, description: task.description, assignedTo: task.assignedTo?._id || '', deadline: formatDateTimeLocal(task.deadline), priority: task.priority || 'Medium' });
    };

    const statusColors = {
        'PENDING': 'bg-gray-100 text-gray-700',
        'IN_PROGRESS': 'bg-blue-100 text-blue-700',
        'REQUIRES_INPUT': 'bg-yellow-100 text-yellow-700',
        'REQUIRES_REVIEW': 'bg-purple-100 text-purple-700',
        'COMPLETED': 'bg-green-100 text-green-700'
    };

    const priorityColors = {
        'Critical': 'bg-red-100 text-red-700 border border-red-200',
        'High': 'bg-orange-100 text-orange-700 border border-orange-200',
        'Medium': 'bg-blue-100 text-blue-700 border border-blue-200',
        'Low': 'bg-green-100 text-green-700 border border-green-200'
    };

    const priorityDots = {
        'Critical': 'bg-red-500',
        'High': 'bg-orange-500',
        'Medium': 'bg-blue-500',
        'Low': 'bg-green-500'
    };

    const renderModalTask = (task) => (
        <div key={task._id} onClick={() => { setSelectedDateTasks(null); setViewMode('list'); setEditingTaskId(task._id); }} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:border-primary transition-colors flex flex-col gap-3">
            <div className="flex justify-between items-start gap-4">
                <h5 className="font-bold text-gray-800 text-base leading-tight">{task.title}</h5>
                <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${priorityColors[task.priority || 'Medium']}`}>{task.priority || 'Medium'}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${statusColors[task.status]}`}>{task.status.replace(/_/g, ' ')}</span>
                </div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">person</span>
                    <span>{task.assignedTo?.name || task.assignedTo?.loginId}</span>
                </div>
                {task.deadline && (
                    <div className="flex items-center gap-1 font-medium text-gray-600">
                        <span className="material-symbols-outlined text-[14px]">event</span>
                        <span>{new Date(task.deadline).toLocaleDateString()}</span>
                    </div>
                )}
            </div>
        </div>
    );

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
            const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            
            const assignedHere = [];
            const dueHere = [];
            const bothHere = [];

            tasks.forEach(t => {
                let isAssigned = false;
                let isDue = false;

                if (t.createdAt) {
                    const cDate = new Date(t.createdAt);
                    if (cDate.getDate() === i && cDate.getMonth() === currentMonth.getMonth() && cDate.getFullYear() === currentMonth.getFullYear()) {
                        isAssigned = true;
                    }
                }
                
                if (t.deadline) {
                    const dDate = new Date(t.deadline);
                    if (dDate.getDate() === i && dDate.getMonth() === currentMonth.getMonth() && dDate.getFullYear() === currentMonth.getFullYear()) {
                        isDue = true;
                    }
                }

                if (isAssigned && isDue) {
                    bothHere.push(t);
                } else if (isAssigned) {
                    assignedHere.push(t);
                } else if (isDue) {
                    dueHere.push(t);
                }
            });

            const displayTasks = [...bothHere, ...dueHere, ...assignedHere];
            const visibleTasks = displayTasks.slice(0, 3);
            const hiddenCount = displayTasks.length - 3;

            days.push(
                <div 
                    key={i} 
                    className="bg-white p-2 min-h-[120px] hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
                    onClick={() => setSelectedDateTasks({ date: currentDate, assigned: assignedHere, due: dueHere, both: bothHere })}
                >
                    <div className="font-bold text-gray-500 mb-2">{i}</div>
                    <div className="space-y-1">
                        {visibleTasks.map(t => {
                            const isBoth = bothHere.includes(t);
                            const isAssignedOnly = assignedHere.includes(t);
                            const bgClass = isAssignedOnly ? 'bg-blue-50 text-blue-700 border border-blue-200' : (statusColors[t.status] || 'bg-gray-100 text-gray-700');
                            
                            return (
                                <div key={t._id} className={`text-[10px] p-1.5 rounded leading-tight font-medium shadow-sm flex items-start gap-1 ${bgClass}`}>
                                    {isAssignedOnly ? (
                                        <span className="w-1.5 h-1.5 mt-0.5 rounded-full shrink-0 bg-blue-500"></span>
                                    ) : (
                                        <span className={`w-1.5 h-1.5 mt-0.5 rounded-full shrink-0 ${priorityDots[t.priority || 'Medium']}`}></span>
                                    )}
                                    <div className="overflow-hidden flex-1">
                                        <div className="font-bold truncate">{t.title}</div>
                                        <div className="truncate opacity-80 flex items-center justify-between gap-1">
                                            <span className="truncate">{t.assignedTo?.name || t.assignedTo?.loginId}</span>
                                            {isBoth && <span className="text-[8px] uppercase tracking-wider bg-black/10 px-1 rounded">Both</span>}
                                            {isAssignedOnly && !isBoth && <span className="text-[8px] uppercase tracking-wider bg-blue-200/50 px-1 rounded">New</span>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {hiddenCount > 0 && (
                            <div className="text-xs text-gray-400 font-bold text-center mt-1 pt-1 border-t border-gray-100">
                                +{hiddenCount} more
                            </div>
                        )}
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

            {viewMode === 'list' && (
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">filter_list</span>
                        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} className="flex-1 sm:flex-none text-sm border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 font-medium text-gray-700 transition-colors hover:bg-gray-100 cursor-pointer">
                            <option value="All">All Priorities</option>
                            <option value="Critical">Critical</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-gray-200"></div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <span className="material-symbols-outlined text-gray-400 text-[20px]">sort</span>
                        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="flex-1 sm:flex-none text-sm border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/50 font-medium text-gray-700 transition-colors hover:bg-gray-100 cursor-pointer">
                            <option value="date">Sort by Date</option>
                            <option value="priority">Sort by Priority</option>
                        </select>
                    </div>
                </div>
            )}

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
                            <div className="w-full border border-gray-300 rounded-lg overflow-hidden bg-white">
                                <div className="max-h-[160px] overflow-y-auto p-2 space-y-1">
                                    <label className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer transition-colors border border-transparent hover:border-gray-100">
                                        <input 
                                            type="checkbox" 
                                            checked={form.assignedTo.includes('ALL')}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setForm({...form, assignedTo: ['ALL']});
                                                } else {
                                                    setForm({...form, assignedTo: []});
                                                }
                                            }}
                                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer"
                                        />
                                        <span className="text-sm font-bold text-gray-800">Select All Users</span>
                                    </label>
                                    <div className="h-px bg-gray-100 my-1"></div>
                                    {users.filter(u => u.role !== 'SUPER_ADMIN').map(u => (
                                        <label key={u._id} className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors border border-transparent ${form.assignedTo.includes('ALL') ? 'opacity-50' : 'hover:bg-gray-50 hover:border-gray-100'}`}>
                                            <input 
                                                type="checkbox" 
                                                checked={form.assignedTo.includes(u._id) || form.assignedTo.includes('ALL')}
                                                onChange={(e) => {
                                                    if (form.assignedTo.includes('ALL')) return;
                                                    let newAssignedTo = [...form.assignedTo];
                                                    if (e.target.checked) {
                                                        newAssignedTo.push(u._id);
                                                    } else {
                                                        newAssignedTo = newAssignedTo.filter(id => id !== u._id);
                                                    }
                                                    setForm({...form, assignedTo: newAssignedTo});
                                                }}
                                                disabled={form.assignedTo.includes('ALL')}
                                                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer disabled:cursor-not-allowed"
                                            />
                                            <span className="text-sm text-gray-700">{u.name || u.loginId} <span className="text-xs text-gray-400 ml-1">({u.role.replace(/_/g, ' ')})</span></span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Deadline (Optional)</label>
                            <input type="datetime-local" value={form.deadline} onChange={e => setForm({...form, deadline: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Priority</label>
                            <select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary">
                                <option value="Critical">Critical</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
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
                    {(() => {
                        const processedTasks = [...tasks]
                            .filter(t => filterPriority === 'All' || (t.priority || 'Medium') === filterPriority)
                            .sort((a, b) => {
                                if (sortBy === 'priority') {
                                    const pWeight = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
                                    const aP = pWeight[a.priority || 'Medium'] || 2;
                                    const bP = pWeight[b.priority || 'Medium'] || 2;
                                    if (aP !== bP) return bP - aP;
                                }
                                return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now());
                            });

                        if (processedTasks.length === 0) {
                            return <p className="text-gray-500 text-center py-8">No tasks found.</p>;
                        }

                        return processedTasks.map(task => (
                            <div key={task._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                                <div className="flex justify-between items-start mb-4">
                                    {editingTaskId === task._id ? (
                                        <div className="w-full space-y-4 pr-4">
                                            <input type="text" value={editTaskForm.title} onChange={e => setEditTaskForm({...editTaskForm, title: e.target.value})} className="w-full text-xl font-bold px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                                            <textarea value={editTaskForm.description} onChange={e => setEditTaskForm({...editTaskForm, description: e.target.value})} rows="2" className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary"></textarea>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <select value={editTaskForm.assignedTo} onChange={e => setEditTaskForm({...editTaskForm, assignedTo: e.target.value})} className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary">
                                                    {users.filter(u => u.role !== 'SUPER_ADMIN').map(u => (
                                                        <option key={u._id} value={u._id}>{u.name || u.loginId} ({u.role.replace(/_/g, ' ')})</option>
                                                    ))}
                                                </select>
                                                <input type="datetime-local" value={editTaskForm.deadline} onChange={e => setEditTaskForm({...editTaskForm, deadline: e.target.value})} className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" title="Deadline" />
                                                <select value={editTaskForm.priority} onChange={e => setEditTaskForm({...editTaskForm, priority: e.target.value})} className="w-full text-sm px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary">
                                                    <option value="Critical">Critical</option>
                                                    <option value="High">High</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Low">Low</option>
                                                </select>
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
                                            <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider ${priorityColors[task.priority || 'Medium']}`}>{task.priority || 'Medium'}</span>
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
                                                <span className="font-bold text-gray-700">{h.changedBy?.name || h.changedBy?.loginId}</span> 
                                                {h.newStatus && h.newPriority ? (
                                                    <span>changed status to <span className="font-bold">{h.newStatus.replace(/_/g, ' ')}</span> and priority to <span className="font-bold">{h.newPriority}</span></span>
                                                ) : h.newPriority && !h.newStatus ? (
                                                    <span>changed priority to <span className="font-bold">{h.newPriority}</span></span>
                                                ) : (
                                                    <span>changed status to <span className="font-bold">{h.newStatus ? h.newStatus.replace(/_/g, ' ') : ''}</span></span>
                                                )}
                                                <span className="text-gray-400 ml-auto">{new Date(h.timestamp).toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ));
                    })()}
                </div>
            )}

            {selectedDateTasks && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="font-headline font-bold text-xl text-gray-800">
                                Tasks for {selectedDateTasks.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                            </h3>
                            <button onClick={() => setSelectedDateTasks(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center">
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        </div>
                        <div className="overflow-y-auto p-6 flex-1 space-y-8 bg-gray-50/50">
                            
                            {selectedDateTasks.both.length > 0 && (
                                <div>
                                    <h4 className="font-bold text-gray-700 flex items-center gap-2 mb-4"><span className="material-symbols-outlined text-[20px] text-purple-500">event_available</span> Assigned & Due Today</h4>
                                    <div className="space-y-3">
                                        {selectedDateTasks.both.map(t => renderModalTask(t))}
                                    </div>
                                </div>
                            )}

                            {selectedDateTasks.due.length > 0 && (
                                <div>
                                    <h4 className="font-bold text-gray-700 flex items-center gap-2 mb-4"><span className="material-symbols-outlined text-[20px] text-red-500">schedule</span> Due Today</h4>
                                    <div className="space-y-3">
                                        {selectedDateTasks.due.map(t => renderModalTask(t))}
                                    </div>
                                </div>
                            )}

                            {selectedDateTasks.assigned.length > 0 && (
                                <div>
                                    <h4 className="font-bold text-gray-700 flex items-center gap-2 mb-4"><span className="material-symbols-outlined text-[20px] text-blue-500">assignment</span> Assigned Today</h4>
                                    <div className="space-y-3">
                                        {selectedDateTasks.assigned.map(t => renderModalTask(t))}
                                    </div>
                                </div>
                            )}

                            {selectedDateTasks.both.length === 0 && selectedDateTasks.due.length === 0 && selectedDateTasks.assigned.length === 0 && (
                                <div className="text-center py-12 text-gray-400">
                                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">event_busy</span>
                                    <p className="font-medium">No tasks associated with this date.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TasksTab;
