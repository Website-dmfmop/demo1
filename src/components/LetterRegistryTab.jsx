import React, { useState, useEffect } from 'react';
import { FilterToolbar, FilterSelect, FilterSeparator } from './FilterToolbar';
import { API_URL } from '../config/api';
import { exportToExcel } from '../utils/exportUtils';

const LetterRegistryTab = ({ currentUser, setExportHandler }) => {
    const [letters, setLetters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    const initialFormState = {
        referenceNumber: '',
        dateOfIssue: new Date().toISOString().split('T')[0],
        recipientName: '',
        recipientOrganization: '',
        subject: '',
        letterType: 'General Correspondence',
        status: 'Dispatched',
        remarks: '',
        attachmentUrl: ''
    };
    const [form, setForm] = useState(initialFormState);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const token = sessionStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/api/letters`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setLetters(data);
            } else {
                setError('Failed to fetch letter records');
            }
        } catch (err) {
            setError('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const processedLetters = React.useMemo(() => {
        return letters.filter(l => {
            if (filterType !== 'All' && l.letterType !== filterType) return false;
            if (filterStatus !== 'All' && l.status !== filterStatus) return false;
            
            if (debouncedSearch) {
                const term = debouncedSearch.toLowerCase();
                const matchRef = (l.referenceNumber || '').toLowerCase().includes(term);
                const matchSubj = (l.subject || '').toLowerCase().includes(term);
                const matchRecip = (l.recipientName || '').toLowerCase().includes(term);
                const matchOrg = (l.recipientOrganization || '').toLowerCase().includes(term);
                if (!matchRef && !matchSubj && !matchRecip && !matchOrg) return false;
            }
            return true;
        });
    }, [letters, filterType, filterStatus, debouncedSearch]);

    useEffect(() => {
        if (!setExportHandler) return;
        const handleExport = () => {
            exportToExcel(processedLetters, 'Letter_Registry_Export.xlsx');
        };
        setExportHandler(() => handleExport);
        return () => setExportHandler(null);
    }, [processedLetters, setExportHandler]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingId ? `${API_URL}/api/letters/${editingId}` : `${API_URL}/api/letters`;
            const method = editingId ? 'PUT' : 'POST';
            
            const res = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                setForm(initialFormState);
                setFormOpen(false);
                setEditingId(null);
                fetchData();
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to save letter record');
            }
        } catch (err) {
            alert('Error saving record');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this letter record?')) return;
        try {
            const res = await fetch(`${API_URL}/api/letters/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}` }
            });
            if (res.ok) fetchData();
            else alert('Failed to delete letter');
        } catch (err) { alert('Error deleting letter'); }
    };

    const startEditing = (letter) => {
        setEditingId(letter._id);
        setForm({
            referenceNumber: letter.referenceNumber,
            dateOfIssue: new Date(letter.dateOfIssue).toISOString().split('T')[0],
            recipientName: letter.recipientName,
            recipientOrganization: letter.recipientOrganization || '',
            subject: letter.subject,
            letterType: letter.letterType,
            status: letter.status,
            remarks: letter.remarks || '',
            attachmentUrl: letter.attachmentUrl || ''
        });
        setFormOpen(true);
    };

    const statusColors = {
        'Draft': 'bg-gray-100 text-gray-700',
        'Dispatched': 'bg-blue-100 text-blue-700',
        'Delivered': 'bg-green-100 text-green-700',
        'Acknowledged': 'bg-purple-100 text-purple-700',
        'Cancelled': 'bg-red-100 text-red-700'
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            {error && <div className="p-4 bg-red-100 text-red-700 rounded-xl">{error}</div>}
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="font-headline font-bold text-2xl text-gray-800">Letter & Dispatch Registry</h3>
                <button onClick={() => {
                    if (formOpen) {
                        setFormOpen(false);
                        setEditingId(null);
                        setForm(initialFormState);
                    } else {
                        // Find the last letter issued by this user to auto-increment reference number
                        let nextRef = '';
                        const currentId = currentUser?._id || currentUser?.id;
                        const lastLetter = letters.find(l => {
                            const issuerId = l.issuedBy?._id || l.issuedBy;
                            return issuerId === currentId;
                        });
                        
                        if (lastLetter && lastLetter.referenceNumber) {
                            const lastRef = lastLetter.referenceNumber;
                            const match = lastRef.match(/(.*?)(\d+)$/);
                            if (match) {
                                const prefix = match[1];
                                const numStr = match[2];
                                const nextNum = parseInt(numStr, 10) + 1;
                                nextRef = prefix + nextNum.toString().padStart(numStr.length, '0');
                            } else {
                                nextRef = lastRef;
                            }
                        }

                        setForm({
                            ...initialFormState,
                            referenceNumber: nextRef
                        });
                        setFormOpen(true);
                    }
                }} className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover flex items-center gap-2 shadow-md">
                    <span className="material-symbols-outlined text-[18px]">{formOpen ? 'close' : 'add'}</span> 
                    {formOpen ? 'Cancel' : 'Log New Letter'}
                </button>
            </div>

            {!formOpen && (
                <div className="space-y-4 mb-6">
                    <FilterToolbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchPlaceholder="Search by reference, subject, or recipient...">
                        <FilterSelect 
                            value={filterType}
                            onChange={setFilterType}
                            title="Letter Type"
                            defaultLabel="All Types"
                            options={[
                                { value: 'Offer Letter', label: 'Offer Letter' },
                                { value: 'Warning Letter', label: 'Warning Letter' },
                                { value: 'Partnership Proposal', label: 'Partnership Proposal' },
                                { value: 'No Objection Certificate (NOC)', label: 'NOC' },
                                { value: 'Recommendation', label: 'Recommendation' },
                                { value: 'Experience Letter', label: 'Experience Letter' },
                                { value: 'General Correspondence', label: 'General Correspondence' },
                                { value: 'Other', label: 'Other' }
                            ]}
                        />
                        <FilterSelect 
                            value={filterStatus}
                            onChange={setFilterStatus}
                            title="Status"
                            defaultLabel="All Statuses"
                            options={[
                                { value: 'Draft', label: 'Draft' },
                                { value: 'Dispatched', label: 'Dispatched' },
                                { value: 'Delivered', label: 'Delivered' },
                                { value: 'Acknowledged', label: 'Acknowledged' },
                                { value: 'Cancelled', label: 'Cancelled' }
                            ]}
                        />
                    </FilterToolbar>
                </div>
            )}

            {formOpen && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h4 className="text-lg font-bold mb-4 border-b pb-2">{editingId ? 'Edit Letter Record' : 'Log New Letter'}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Reference Number</label>
                            <input type="text" required value={form.referenceNumber} onChange={e => setForm({...form, referenceNumber: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. DMF/2026/001" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Date of Issue</label>
                            <input type="date" required value={form.dateOfIssue} onChange={e => setForm({...form, dateOfIssue: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Subject / Purpose</label>
                            <input type="text" required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Recipient Name</label>
                            <input type="text" required value={form.recipientName} onChange={e => setForm({...form, recipientName: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Recipient Organization (Optional)</label>
                            <input type="text" value={form.recipientOrganization} onChange={e => setForm({...form, recipientOrganization: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Letter Type</label>
                            <select value={form.letterType} onChange={e => setForm({...form, letterType: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                                <option value="General Correspondence">General Correspondence</option>
                                <option value="Offer Letter">Offer Letter</option>
                                <option value="Warning Letter">Warning Letter</option>
                                <option value="Partnership Proposal">Partnership Proposal</option>
                                <option value="No Objection Certificate (NOC)">No Objection Certificate (NOC)</option>
                                <option value="Recommendation">Recommendation</option>
                                <option value="Experience Letter">Experience Letter</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none">
                                <option value="Draft">Draft</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Acknowledged">Acknowledged</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Attachment URL (Optional Document Link)</label>
                            <input type="url" value={form.attachmentUrl} onChange={e => setForm({...form, attachmentUrl: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="https://..." />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Remarks / Internal Notes (Optional)</label>
                            <textarea rows="3" value={form.remarks} onChange={e => setForm({...form, remarks: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"></textarea>
                        </div>
                    </div>
                    <div className="mt-6 text-right">
                        <button type="submit" className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 shadow-sm">{editingId ? 'Update Record' : 'Save Record'}</button>
                    </div>
                </form>
            )}

            {!formOpen && (
                loading ? (
                    <div className="text-center text-gray-500 py-8">Loading letter registry...</div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
                                        <th className="p-4 font-bold">Reference No.</th>
                                        <th className="p-4 font-bold">Date</th>
                                        <th className="p-4 font-bold">Subject & Type</th>
                                        <th className="p-4 font-bold">Recipient</th>
                                        <th className="p-4 font-bold">Status</th>
                                        <th className="p-4 font-bold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {processedLetters.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="p-8 text-center text-gray-500 font-medium">No records found.</td>
                                        </tr>
                                    ) : (
                                        processedLetters.map(letter => (
                                            <tr key={letter._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                <td className="p-4 font-bold text-gray-800">{letter.referenceNumber}</td>
                                                <td className="p-4 font-medium text-gray-600 whitespace-nowrap">
                                                    {new Date(letter.dateOfIssue).toLocaleDateString('en-GB')}
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-bold text-gray-800 line-clamp-1" title={letter.subject}>{letter.subject}</div>
                                                    <div className="text-xs font-semibold text-primary/70">{letter.letterType}</div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-bold text-gray-700">{letter.recipientName}</div>
                                                    {letter.recipientOrganization && <div className="text-xs text-gray-500">{letter.recipientOrganization}</div>}
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${statusColors[letter.status]}`}>
                                                        {letter.status}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        {letter.attachmentUrl && (
                                                            <a href={letter.attachmentUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Attachment">
                                                                <span className="material-symbols-outlined text-[18px]">attachment</span>
                                                            </a>
                                                        )}
                                                        <button onClick={() => startEditing(letter)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">edit</span>
                                                        </button>
                                                        <button onClick={() => handleDelete(letter._id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default LetterRegistryTab;
