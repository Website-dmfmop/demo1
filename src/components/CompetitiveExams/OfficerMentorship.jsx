import React, { useState } from 'react';

const OfficerMentorship = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;
        
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setEmail('');
            
            // Reset success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        }, 1500);
    };

    return (
        <section className="relative w-full py-24 bg-[#000080] overflow-hidden">
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF9933] rounded-full mix-blend-overlay filter blur-[120px] transform translate-x-1/3 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white rounded-full mix-blend-overlay filter blur-[120px] transform -translate-x-1/3 translate-y-1/2"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FF9933] font-bold text-sm tracking-widest uppercase mb-8 shadow-lg">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        Exclusive Officer Mentorship
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Learn Directly from Those Who <span className="text-[#FF9933] italic">Cleared It</span>
                    </h2>
                    
                    <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Gain unparalleled access to strategies, mindset training, and answer-writing techniques directly from serving bureaucrats and subject matter experts.
                    </p>

                    {/* Subscription Form */}
                    <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
                        <h3 className="text-white font-semibold text-lg mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Subscribe for Free Mock Papers & Lecture Updates
                        </h3>
                        
                        <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-gray-400">mail</span>
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border-none outline-none focus:ring-4 focus:ring-[#FF9933]/50 text-gray-900 font-medium text-lg bg-white placeholder-gray-400 transition-all shadow-inner"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-2 ${
                                    isSuccess 
                                    ? 'bg-green-500 text-white hover:bg-green-600' 
                                    : 'bg-[#FF9933] text-[#000080] hover:bg-white hover:text-[#000080]'
                                }`}
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                {isSubmitting ? (
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                ) : isSuccess ? (
                                    <>
                                        <span className="material-symbols-outlined">check_circle</span>
                                        Subscribed
                                    </>
                                ) : (
                                    <>
                                        Get Access <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                                    </>
                                )}
                            </button>
                        </form>
                        
                        <p className="text-white/50 text-sm mt-4 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                            We respect your privacy. No spam, only high-quality resources.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default OfficerMentorship;
