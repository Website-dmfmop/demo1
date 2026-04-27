import React from 'react';

export default function SocialInnovationPath() {
    return (
        <div>
            <main>
                <section className="bg-primary mt-[88px] py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-6 md:px-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            {/* Left: Text */}
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-1 bg-secondary-container shrink-0"></div>
                                    <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">Social Innovation Path</p>
                                </div>
                                <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                    <span className="block mb-2">CO-CREATING</span>
                                    <span className="block mb-2">SOLUTIONS</span>
                                    <span className="block text-secondary-container mb-2">DRIVING</span>
                                    <span className="block text-secondary-container">IMPACT.</span>
                                </h1>
                            </div>
                            {/* Right: Image */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                                <img alt="Social Innovation Path" className="w-full h-full object-cover" src="/Images/Social_innovation_path.jpeg" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="social-innovation-path" className="py-24 bg-surface px-8 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
                            <div>
                                <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">DMF Initiative</span>
                                <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">Social Innovation Path</h2>
                                <div className="w-16 h-1 bg-secondary-container mb-6"></div>
                                <p className="text-on-surface-variant leading-relaxed mb-8">
                                    At Dr. Dnyaneshwar Mulay Foundation, we believe that real and lasting change emerges when innovation meets purpose. Our Social Innovation Labs are dynamic platforms where ideas, people, and resources come together to solve pressing social challenges — bringing together students, academicians, government stakeholders, industry experts, and community members to co-create practical, scalable, and impactful solutions.
                                </p>
                                <div className="bg-primary/5 border-l-4 border-secondary-container rounded-r-2xl p-6">
                                    <h3 className="font-headline text-xl font-bold text-primary mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-secondary-container">visibility</span> Our Vision
                                    </h3>
                                    <p className="text-on-surface-variant leading-relaxed">To build a vibrant ecosystem of innovation that empowers communities, strengthens institutions, and drives sustainable and inclusive development.</p>
                                </div>
                            </div>
                            <div className="relative">
                                <img
                                    src="/Images/Social_innovation_image.jpeg"
                                    alt="Social Innovation Path"
                                    className="w-full h-full object-cover rounded-2xl shadow-xl"
                                    style={{ maxHeight: '480px' }}
                                />
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10 pointer-events-none"></div>
                            </div>
                        </div>

                        <h3 className="font-headline text-2xl font-bold text-primary text-center mb-10">What Our Social Innovation Labs Do</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                            {[
                                { icon: 'handshake', title: 'Co-create Solutions', desc: 'We facilitate collaboration among diverse stakeholders to design solutions rooted in real-world needs.' },
                                { icon: 'lightbulb', title: 'Foster Innovation & Creativity', desc: 'We encourage out-of-the-box thinking and interdisciplinary approaches to address complex social issues.' },
                                { icon: 'science', title: 'Prototype & Test Ideas', desc: 'We provide a safe space to experiment, pilot, and refine innovative solutions before scaling them.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-surface-container-low rounded-2xl p-6 border-t-4 border-secondary-container hover:-translate-y-1 transition-all duration-300 shadow-sm">
                                    <span className="material-symbols-outlined text-secondary-container text-3xl mb-4 block">{item.icon}</span>
                                    <h4 className="font-headline font-bold text-primary mb-2">{item.title}</h4>
                                    <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                            {[
                                { icon: 'build', title: 'Build Capacities', desc: 'We train students, youth, and professionals in problem-solving, design thinking, and social innovation.' },
                                { icon: 'trending_up', title: 'Scale Impact', desc: 'We identify high-potential solutions and support their expansion across regions and sectors.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-surface-container-low rounded-2xl p-6 border-t-4 border-secondary-container hover:-translate-y-1 transition-all duration-300 shadow-sm">
                                    <span className="material-symbols-outlined text-secondary-container text-3xl mb-4 block">{item.icon}</span>
                                    <h4 className="font-headline font-bold text-primary mb-2">{item.title}</h4>
                                    <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                            <div className="rounded-2xl overflow-hidden shadow-xl border border-outline-variant/20 h-full">
                                <img
                                    src="/Images/Social_innovation_path.jpeg"
                                    alt="Social Innovation Path"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="bg-surface-container-low rounded-2xl p-10">
                            <h3 className="font-headline text-2xl font-bold text-primary mb-8 text-center">Our Approach</h3>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                {[
                                    { icon: 'groups', label: 'Collaboration', desc: 'Engaging multiple stakeholders for diverse perspectives' },
                                    { icon: 'lightbulb', label: 'Innovation', desc: 'Leveraging technology and creative thinking' },
                                    { icon: 'location_on', label: 'Community-Centric Design', desc: 'Inclusive and locally relevant solutions' },
                                    { icon: 'analytics', label: 'Evidence-Based Action', desc: 'Using data, research, and field insights' },
                                    { icon: 'eco', label: 'Sustainability', desc: 'Scalable and long-lasting models' },
                                ].map((a, i) => (
                                    <div key={i} className="text-center p-4 bg-surface-container-lowest rounded-xl">
                                        <span className="material-symbols-outlined text-primary text-3xl mb-3 block">{a.icon}</span>
                                        <div className="font-headline font-bold text-primary text-sm mb-2">{a.label}</div>
                                        <div className="text-on-surface-variant text-xs leading-relaxed">{a.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-on-surface-variant leading-relaxed mb-2">We invite partners, institutions, corporates, and individuals to collaborate with us in building a future driven by innovation and inclusive growth.</p>
                            <p className="font-headline font-bold text-primary text-lg">Together, let's create solutions that matter.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
