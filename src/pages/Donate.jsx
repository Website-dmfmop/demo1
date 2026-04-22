import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Donate() {
    const [amount, setAmount] = useState(100);
    const [customAmount, setCustomAmount] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleAmountClick = (val) => {
        setAmount(val);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e) => {
        setCustomAmount(e.target.value);
        setAmount(e.target.value ? parseInt(e.target.value) : 0);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDonation = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const finalAmount = customAmount ? parseInt(customAmount) : amount;
            if (!finalAmount || finalAmount <= 0) {
                setStatus('error');
                return;
            }

            const res = await fetch(`${API_URL}/api/donations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    amount: finalAmount,
                    message: formData.message,
                })
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div>



            <main>

                <section className="relative h-[716px] flex items-center overflow-hidden signature-gradient">
                    <div className="absolute inset-0 z-0">
                        <img alt="Empowerment" className="w-full h-full object-cover" src="/Images/2.png" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 via-primary/20 to-transparent"></div>
                    </div>
                    <div className="relative max-w-7xl mx-auto px-8 w-full">
                        <div className="max-w-2xl">
                            <span className="font-label text-secondary-container uppercase tracking-widest font-semibold text-sm mb-4 block">GIVE FOR THE FUTURE</span>
                            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tighter mb-6">
                                Fuel the <span className="text-secondary-container">Change</span>
                            </h1>
                            <p className="text-white/90 text-xl leading-relaxed max-w-xl font-body">
                                Your contribution provides the structural support needed for education, legal empowerment, and sustainable healthcare in underserved communities.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-8 -mt-24 relative z-10 mb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        <div className="lg:col-span-7 bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-2xl border-t-4 border-secondary-container relative overflow-hidden">
                            {status === 'success' ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                                        <span className="material-symbols-outlined text-4xl">check_circle</span>
                                    </div>
                                    <h3 className="text-3xl font-display font-bold text-primary mb-3">Thank You!</h3>
                                    <p className="text-on-surface-variant mb-8 text-lg">Your generosity fuels the change. We have received your donation info.</p>
                                    <button
                                        onClick={() => setStatus('')}
                                        className="px-8 py-3 bg-secondary-container hover:bg-secondary text-white rounded-lg transition-colors font-medium"
                                    >
                                        Donate Again
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleDonation}>
                                    <div className="flex items-center justify-between mb-10">
                                        <h2 className="font-headline text-3xl font-bold text-primary">Make a Donation</h2>
                                        <div className="flex bg-surface-container rounded-full p-1">
                                            <button type="button" className="px-6 py-2 rounded-full text-sm font-semibold transition-all bg-primary text-white">One-time</button>
                                            <button type="button" className="px-6 py-2 rounded-full text-sm font-semibold transition-all text-on-surface-variant hover:bg-surface-variant">Monthly</button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                        {[25, 50, 100, 500].map((val) => (
                                            <button
                                                key={val}
                                                type="button"
                                                onClick={() => handleAmountClick(val)}
                                                className={`py-4 border-2 rounded-xl font-headline font-bold text-xl transition-all ${amount === val && !customAmount
                                                    ? 'border-secondary-container bg-secondary-container/10 text-secondary scale-[1.02]'
                                                    : 'border-outline-variant hover:border-secondary-container hover:text-secondary focus:ring-2 focus:ring-secondary-container'
                                                    }`}
                                            >
                                                ₹{val}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="relative mb-8">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline font-bold text-xl">₹</span>
                                        <input
                                            className="w-full pl-10 pr-4 py-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary font-body text-lg"
                                            placeholder="Custom Amount"
                                            type="number"
                                            value={customAmount}
                                            onChange={handleCustomAmountChange}
                                        />
                                    </div>
                                    <div className="space-y-4 mb-10">
                                        <input
                                            required
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-4 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="Full Name *"
                                            type="text"
                                        />
                                        <input
                                            required
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-4 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="Email Address *"
                                            type="email"
                                        />
                                        <div className="relative">
                                            <span className="absolute left-4 top-4 material-symbols-outlined text-outline text-xl">chat</span>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                className="w-full pl-12 pr-4 py-4 bg-surface-container-low border border-transparent rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[100px] resize-none"
                                                placeholder="Message (Optional)"
                                            ></textarea>
                                        </div>
                                    </div>

                                    {status === 'error' && (
                                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm">
                                            There was an error processing your donation. Please try again.
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full py-5 bg-primary text-white font-headline font-bold text-lg rounded-xl hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(254,152,50,0.3)] transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
                                    >
                                        {status === 'submitting' ? (
                                            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined" data-weight="fill">favorite</span>
                                                COMPLETE DONATION
                                            </>
                                        )}
                                    </button>
                                    <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-outline font-label text-xs uppercase tracking-widest">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-on-tertiary-container">verified_user</span>
                                            100% Transparency
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-on-tertiary-container">lock</span>
                                            Secure SSL Encryption
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>

                        <div className="lg:col-span-5 space-y-6">
                            <div className="bg-surface-container-low p-8 rounded-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/10 rounded-bl-full -mr-10 -mt-10"></div>
                                <h3 className="font-headline text-2xl font-bold text-primary mb-6">Where Your Money Goes</h3>
                                <div className="space-y-8">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 shrink-0 bg-primary text-white rounded-lg flex items-center justify-center">
                                            <span className="material-symbols-outlined">school</span>
                                        </div>
                                        <div>
                                            <h4 className="font-headline font-bold text-on-surface">Universal Education</h4>
                                            <p className="text-on-surface-variant text-sm mt-1">Funding scholarships and digital labs for underprivileged rural students.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 shrink-0 bg-secondary-container text-white rounded-lg flex items-center justify-center">
                                            <span className="material-symbols-outlined">gavel</span>
                                        </div>
                                        <div>
                                            <h4 className="font-headline font-bold text-on-surface">Legal Empowerment</h4>
                                            <p className="text-on-surface-variant text-sm mt-1">Providing legal aid and awareness workshops for marginalized communities.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 shrink-0 bg-tertiary-container text-on-tertiary-container rounded-lg flex items-center justify-center">
                                            <span className="material-symbols-outlined">medical_services</span>
                                        </div>
                                        <div>
                                            <h4 className="font-headline font-bold text-on-surface">Mobile Medical Units</h4>
                                            <p className="text-on-surface-variant text-sm mt-1">Deploying healthcare professionals to remote areas with limited access.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-primary p-8 rounded-xl text-white">
                                <h3 className="font-headline text-xl font-bold mb-4">Corporate Partnerships</h3>
                                <p className="text-white/80 text-sm mb-6 leading-relaxed">Join hands with the foundation for sustainable CSR initiatives. Let's build a legacy together.</p>
                                <a className="inline-flex items-center gap-2 text-secondary-container font-bold hover:gap-4 transition-all uppercase text-xs tracking-widest" href="#">
                                    Become a Partner
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-surface-container py-24 px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary uppercase tracking-widest font-semibold text-xs mb-2 block">OTHER METHODS</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary">Alternative Ways to Give</h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-surface-container-lowest p-8 rounded-xl border-l-4 border-primary">
                                <span className="material-symbols-outlined text-primary text-4xl mb-4">account_balance</span>
                                <h3 className="font-headline font-bold text-xl mb-3">Bank Transfer</h3>
                                <p className="text-on-surface-variant text-sm mb-4">Direct wire transfers for larger contributions or recurring support.</p>
                                <div className="text-xs font-mono bg-surface-container p-3 rounded text-on-surface-variant">
                                    Foundation A/C: 9876543210<br />
                                    IFSC: DMF0001234
                                </div>
                            </div>
                            <div className="bg-surface-container-lowest p-8 rounded-xl border-l-4 border-secondary-container">
                                <span className="material-symbols-outlined text-secondary-container text-4xl mb-4">featured_seasonal_and_gifts</span>
                                <h3 className="font-headline font-bold text-xl mb-3">Legacy Gifts</h3>
                                <p className="text-on-surface-variant text-sm mb-4">Bequests, endowments, or naming rights for infrastructure projects.</p>
                                <a className="text-primary font-bold text-xs uppercase tracking-widest hover:underline" href="#">Contact Advisory</a>
                            </div>
                            <div className="bg-surface-container-lowest p-8 rounded-xl border-l-4 border-tertiary-container">
                                <span className="material-symbols-outlined text-on-tertiary-container text-4xl mb-4">volunteer_activism</span>
                                <h3 className="font-headline font-bold text-xl mb-3">In-Kind Donations</h3>
                                <p className="text-on-surface-variant text-sm mb-4">Donating technology, medical equipment, or educational materials.</p>
                                <a className="text-primary font-bold text-xs uppercase tracking-widest hover:underline" href="#">View Needs List</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 px-8 bg-surface">
                    <div className="max-container flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2 relative">
                            <div className="w-full aspect-[4/5] overflow-hidden rounded-xl shadow-2xl">
                                <img alt="Social Impact" className="w-full h-full object-cover" data-alt="A thoughtful environmental portrait of a community elder being assisted by a volunteer in a bright, clean, modern medical clinic" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_I_viR-kRK3PnVcL6SVNH6u7t6nmRJsrKHWlL5ZFFvBSQPlvzrxojAnCzI_1mkISQbXoQa5_i-rpN8mqfcHKLFz7lCcXv79S1RqRoqAsdyta29CvrB-hwdEnZ5SpcD-oklmZAkRqAixwPH8PMScQCShsLdQRJg35OIaj_rprhGcfsW3IIPiKy-ppTQOgiOcVuX7Bae7p194jK_r636_-7Vz7LZ_g2qLPDBBrs7vHemGN0KN86XQi1Gsa12Kcrbb0i-dES2ylmGI7J" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-secondary-container p-8 rounded-xl text-white shadow-xl hidden md:block">
                                <div className="text-4xl font-extrabold font-headline">150k+</div>
                                <div className="text-xs uppercase font-bold tracking-widest opacity-90">Lives Impacted</div>
                            </div>
                        </div>
                        <div className="md:w-1/2 space-y-6">
                            <h2 className="font-headline text-4xl font-extrabold text-primary leading-tight">Your trust is our greatest <span className="text-secondary-container">asset</span>.</h2>
                            <p className="text-lg text-on-surface-variant leading-relaxed font-body">
                                The Dr. Dyaneshawar Mulay Foundation operates with extreme fiscal responsibility. Every cent is audited and tracked to ensure the maximum possible impact on the ground.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 font-semibold text-primary">
                                    <span className="material-symbols-outlined text-on-tertiary-container">check_circle</span>
                                    Quarterly Impact Reports
                                </li>
                                <li className="flex items-center gap-3 font-semibold text-primary">
                                    <span className="material-symbols-outlined text-on-tertiary-container">check_circle</span>
                                    Zero Admin Fee Options
                                </li>
                                <li className="flex items-center gap-3 font-semibold text-primary">
                                    <span className="material-symbols-outlined text-on-tertiary-container">check_circle</span>
                                    Real-time Project Updates
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>

        </div>
    );
}
