import React, { useState } from 'react';
import { API_URL } from '../config/api';

const ProfileTab = ({ currentUser, onProfileUpdate }) => {
    const [form, setForm] = useState({ 
        name: currentUser?.name || '', 
        password: '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        profileImage: currentUser?.profileImage || ''
    });
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
                    email: form.email,
                    phone: form.phone,
                    profileImage: form.profileImage,
                    ...(form.password ? { password: form.password } : {}) 
                })
            });
            
            const data = await res.json();
            if (res.ok) {
                alert('Profile updated successfully!');
                setForm(prev => ({ ...prev, password: '' })); // clear password field
                // Update session storage manually so that refresh keeps the new data
                const storedUser = JSON.parse(sessionStorage.getItem('adminUser') || '{}');
                const updatedSessionUser = { ...storedUser, ...data };
                sessionStorage.setItem('adminUser', JSON.stringify(updatedSessionUser));
                
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
        <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-3xl text-primary">manage_accounts</span>
                <div>
                    <h3 className="font-headline font-bold text-2xl text-gray-800 leading-tight">My Profile</h3>
                    <p className="text-sm text-gray-500 font-medium">Manage your personal information and security settings</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Avatar & Summary Card */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="relative w-32 h-32 mb-4 group">
                            {form.profileImage ? (
                                <img src={form.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-white shadow-md" />
                            ) : (
                                <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center text-primary border-4 border-white shadow-md">
                                    <span className="material-symbols-outlined text-5xl">person</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                                <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-gray-800">{form.name || currentUser?.loginId}</h4>
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mt-2 uppercase tracking-wider">
                            {currentUser?.role?.replace(/_/g, ' ')}
                        </span>
                        
                        <div className="w-full mt-6 pt-6 border-t border-gray-100 text-left space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <span className="material-symbols-outlined text-[18px] text-gray-400">badge</span>
                                <strong>ID:</strong> {currentUser?.loginId}
                            </div>
                            {form.email && (
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span className="material-symbols-outlined text-[18px] text-gray-400">mail</span>
                                    <span className="truncate">{form.email}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Edit Form */}
                <div className="md:col-span-2">
                    <form onSubmit={updateProfile} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h4 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Personal Details</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">person</span>
                                    <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800" placeholder="Enter your full name" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">mail</span>
                                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800" placeholder="your.email@example.com" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">call</span>
                                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800" placeholder="+91 9876543210" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Upload Profile Image</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">upload_file</span>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                if (file.size > 2 * 1024 * 1024) {
                                                    alert('Image size should be less than 2MB');
                                                    return;
                                                }
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setForm({...form, profileImage: reader.result});
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer" 
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Max size: 2MB. Jpeg, Png.</p>
                            </div>
                        </div>

                        <h4 className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4 mt-8">Security</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Login ID (Username)</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">badge</span>
                                    <input type="text" disabled value={currentUser?.loginId || ''} className="w-full pl-10 pr-4 py-3 border border-gray-100 bg-gray-50 rounded-xl text-gray-500 cursor-not-allowed font-medium" />
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Your Login ID cannot be changed.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Change Password</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">lock</span>
                                    <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800" placeholder="Enter new password to change" />
                                </div>
                                <p className="text-xs text-gray-400 mt-2">Leave blank if you don't want to change it.</p>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button type="submit" disabled={loading} className="px-8 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover hover:-translate-y-0.5 disabled:opacity-50 transition-all shadow-md hover:shadow-lg flex items-center gap-2">
                                {loading ? (
                                    <>
                                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[20px]">save</span>
                                        Save Profile Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileTab;
