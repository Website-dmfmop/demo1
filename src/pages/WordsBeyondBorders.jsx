import React from 'react';

export default function WordsBeyondBorders() {
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
                                    <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">Words Beyond Borders</p>
                                </div>
                                <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                    <span className="block mb-2">CELEBRATING</span>
                                    <span className="block mb-2">LITERATURE</span>
                                    <span className="block text-secondary-container mb-2">GLOBAL</span>
                                    <span className="block text-secondary-container">PERSPECTIVES.</span>
                                </h1>
                            </div>
                            {/* Right: Image */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                                <img alt="Words Beyond Borders" className="w-full h-full object-cover" src="/Images/words_beyound_borders.jpeg" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="words-beyond-borders" className="py-24 bg-surface px-8 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch">
                            <div className="flex flex-col justify-between">
                                <div>
                                    <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">DMF Initiative</span>
                                    <h2 className="font-headline text-4xl font-extrabold text-primary leading-tight mb-4">
                                        Words Beyond Borders
                                    </h2>
                                    <p className="text-secondary-container font-semibold text-sm mb-6 uppercase tracking-wider">An International Literary Gathering of Diplomat–Authors</p>
                                    <div className="w-16 h-1 bg-secondary-container mb-8"></div>
                                    <p className="text-on-surface-variant leading-relaxed mb-6">
                                        <strong className="text-primary">Words Beyond Borders</strong> is a unique international literary gathering that celebrates diplomats who have enriched the world of literature through their writings—across diplomacy, fiction, poetry, memoirs, essays, and other forms of creative and intellectual expression.
                                    </p>
                                    <p className="text-on-surface-variant leading-relaxed mb-8">
                                        Diplomats occupy a rare and powerful vantage point in the world. Through their work, they engage with diverse societies, cultures, political systems, and global challenges. They witness moments of conflict and cooperation, negotiation and transformation. Many translate these lived experiences into compelling literary works—offering insights that bridge nations, ideas, and human stories.
                                    </p>
                                </div>
                                <div className="bg-primary/5 border-l-4 border-secondary-container p-6 rounded-r-xl">
                                    <p className="italic text-primary font-medium leading-relaxed">
                                        "Through their unique experiences across borders and cultures, diplomat-authors offer the world a lens into the complexities of global affairs—stories that inspire understanding and connection."
                                    </p>
                                </div>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src="/Images/words_beyound_borders.jpeg"
                                    alt="Words Beyond Borders Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
