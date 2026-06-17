import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ProfileTab = ({ currentUser, onProfileUpdate }) => {
    const [form, setForm] = useState({ name: currentUser?.name || '', password: '' });
    const [loading, setLoading] = useState(false);

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/api/users/profile`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({ 
                    name: form.name, 
                    ...(form.password ? { password: form.password } : {}) 
                })
            });
            
            const data = await res.json();
            if (res.ok) {
                alert('Profile updated successfully!');
                setForm(prev => ({ ...prev, password: '' })); // clear password field
                if (onProfileUpdate) onProfileUpdate(data);
            } else {
                alert(data.error || 'Failed to update profile');
            }
        } catch (err) {
            alert('Error updating profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <h3 className="font-headline font-bold text-2xl text-gray-800">Profile Settings</h3>
            
            <form onSubmit={updateProfile} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 max-w-lg">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Login ID (Cannot be changed)</label>
                        <input type="text" disabled value={currentUser?.loginId || ''} className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                        <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" placeholder="Enter your name" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
                        <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-primary" placeholder="Leave blank to keep current password" />
                    </div>
                </div>
                <div className="mt-6 text-right">
                    <button type="submit" disabled={loading} className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover disabled:opacity-50 transition-colors">
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileTab;
