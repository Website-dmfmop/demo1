import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const JoinUs = () => {
    const [searchParams] = useSearchParams();
    const [purpose, setPurpose] = useState(searchParams.get('purpose') || 'Volunteer');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        message: ''
    });

    useEffect(() => {
        const p = searchParams.get('purpose');
        if (p) setPurpose(p);
    }, [searchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = { ...formData, purpose };
            const res = await fetch(`${API_URL}/api/joinees`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert(`Thank you for wanting to become a ${purpose}! Your request has been submitted. We will contact you soon.`);
                setFormData({ name: '', email: '', phone: '', address: '', message: '' });
            } else {
                alert('Submission failed. Please try again.');
            }
        } catch (err) {
            console.error('Join Us Error:', err);
            alert('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-24 min-h-screen bg-surface flex flex-col items-center pb-20 px-6">
            <div className="w-full max-w-3xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4 capitalize">
                        Become a {purpose}
                    </h1>
                    <p className="text-on-surface-variant max-w-xl mx-auto">
                        Fill out the form below to join our mission. Provide your details and our team will get back to you to finalize your status.
                    </p>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-outline-variant/30">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <input 
                                    type="text" required 
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <input 
                                    type="email" required 
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                <input 
                                    type="tel" required 
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Current Address</label>
                                <input 
                                    type="text" required 
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder-gray-400"
                                    placeholder="City, State, Country"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Why do you want to join? (Optional)</label>
                            <textarea 
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-5 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none placeholder-gray-400" 
                                rows="4"
                                placeholder={`Tell us a little about your motivation to become a ${purpose.toLowerCase()}...`}
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full md:w-auto px-10 py-4 bg-primary hover:bg-primary-hover text-white font-headline font-bold rounded-2xl shadow-md cursor-pointer transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Request'}
                                {!isSubmitting && <span className="material-symbols-outlined text-[20px]">send</span>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JoinUs;
