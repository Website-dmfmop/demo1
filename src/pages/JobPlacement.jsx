import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const JobPlacement = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Enrollment Modal State
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [enrollForm, setEnrollForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    useEffect(() => {
        fetch(`${API_URL}/api/jobs`)
            .then(res => res.json())
            .then(data => {
                setJobs(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching jobs:', err);
                setLoading(false);
            });
    }, []);

    const openEnrollModal = (job) => {
        setSelectedJob(job);
        setShowEnrollModal(true);
    };

    const handleEnrollSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const payload = {
                jobId: selectedJob._id,
                jobRole: selectedJob.jobRole,
                name: enrollForm.name,
                email: enrollForm.email,
                phone: enrollForm.phone,
                message: enrollForm.message
            };

            const res = await fetch(`${API_URL}/api/job-applications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert(`Application Successful!\n\nYour application for ${selectedJob.jobRole} has been submitted. Our team will contact you shortly.`);
                setShowEnrollModal(false);
                setEnrollForm({ name: '', email: '', phone: '', message: '' });
            } else {
                alert('Application failed. Please try again.');
            }
        } catch (err) {
            console.error('Application error:', err);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden pt-28 pb-20 font-body bg-surface">
            {/* Background elements */}
            <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-secondary-container/20 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center space-y-6 mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-widest">
                        <span className="material-symbols-outlined text-[18px]">work</span>
                        Job Placements
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-primary leading-[1.1]">
                        Discover Your Next <span className="text-secondary-container">Career Opportunity</span>
                    </h1>
                    <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
                        Explore global job openings curated by Dr. Dnyaneshwar Mulay Foundation to help you build a successful career.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    </div>
                ) : jobs.length === 0 ? (
                    <div className="bg-white border border-outline-variant/30 rounded-3xl p-12 text-center shadow-lg">
                        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">work_off</span>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Job Postings Yet</h3>
                        <p className="text-gray-500">Check back later for new opportunities and career advancements.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {jobs.map(job => (
                            <div key={job._id} className="bg-white border border-outline-variant/20 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all group flex flex-col h-full relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors"></div>
                                
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 font-headline mb-1 group-hover:text-primary transition-colors">{job.jobRole}</h3>
                                        <p className="text-lg font-medium text-gray-600">{job.companyName}</p>
                                    </div>
                                    <div className="bg-secondary-container/20 text-secondary-container px-3 py-1 rounded-lg text-sm font-bold tracking-widest flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                                        {job.country}
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">groups</span>
                                        {job.openings || 1} {job.openings === 1 ? 'Opening' : 'Openings'}
                                    </span>
                                </div>

                                <div className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow whitespace-pre-wrap">
                                    {job.description}
                                </div>

                                <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-xs text-gray-400 font-medium">
                                        Posted: {new Date(job.createdAt).toLocaleDateString()}
                                    </span>
                                    {job.jobLink ? (
                                        <a 
                                            href={job.jobLink.startsWith('http') ? job.jobLink : `https://${job.jobLink}`}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
                                        >
                                            Apply Now <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                                        </a>
                                    ) : (
                                        <button 
                                            onClick={() => openEnrollModal(job)}
                                            className="px-6 py-2.5 bg-secondary-container hover:bg-secondary-container/90 text-secondary font-bold rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
                                        >
                                            Enroll / Register <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ENROLLMENT MODAL */}
            {showEnrollModal && selectedJob && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="bg-gradient-to-r from-primary to-secondary-container p-6 text-white flex justify-between items-center">
                            <div>
                                <h3 className="font-headline font-bold text-2xl">Apply for Job</h3>
                                <p className="text-white/80 text-sm mt-1">Role: {selectedJob.jobRole}</p>
                            </div>
                            <button onClick={() => setShowEnrollModal(false)} className="w-10 h-10 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleEnrollSubmit} className="p-8 space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                                <input required type="text" value={enrollForm.name} onChange={e => setEnrollForm({...enrollForm, name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                                <input required type="email" value={enrollForm.email} onChange={e => setEnrollForm({...enrollForm, email: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                                <input required type="tel" value={enrollForm.phone} onChange={e => setEnrollForm({...enrollForm, phone: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="+91 98765 43210" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Message / Cover Letter (Optional)</label>
                                <textarea value={enrollForm.message} onChange={e => setEnrollForm({...enrollForm, message: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all resize-none" rows="3" placeholder="Why are you a good fit?"></textarea>
                            </div>
                            <div className="pt-2">
                                <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
                                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobPlacement;
