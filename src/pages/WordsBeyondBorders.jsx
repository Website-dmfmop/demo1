import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { subPageTranslations } from '../translations/subPages';

export default function WordsBeyondBorders() {
    const { language } = useLanguage();
    const t = subPageTranslations[language];
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
                                    <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">{language === 'hi' ? 'वर्ड्स बियॉन्ड बॉर्डर्स' : 'Words Beyond Borders'}</p>
                                </div>
                                <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                    <span className="block mb-2">{language === 'hi' ? 'साहित्य का' : 'CELEBRATING'}</span>
                                    <span className="block mb-2">{language === 'hi' ? 'उत्सव' : 'LITERATURE'}</span>
                                    <span className="block text-secondary-container mb-2">{language === 'hi' ? 'वैश्विक' : 'GLOBAL'}</span>
                                    <span className="block text-secondary-container">{language === 'hi' ? 'दृष्टिकोण।' : 'PERSPECTIVES.'}</span>
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
                                    <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">{language === 'hi' ? 'DMF पहल' : 'DMF Initiative'}</span>
                                    <h2 className="font-headline text-4xl font-extrabold text-primary leading-tight mb-4">
                                        {language === 'hi' ? 'वर्ड्स बियॉन्ड बॉर्डर्स' : 'Words Beyond Borders'}
                                    </h2>
                                    <p className="text-secondary-container font-semibold text-sm mb-6 uppercase tracking-wider">{language === 'hi' ? 'राजनयिक-लेखकों का एक अंतर्राष्ट्रीय साहित्यिक सम्मेलन' : 'An International Literary Gathering of Diplomat–Authors'}</p>
                                    <div className="w-16 h-1 bg-secondary-container mb-8"></div>
                                    <p className="text-on-surface-variant leading-relaxed mb-6">
                                        <strong className="text-primary">{language === 'hi' ? 'वर्ड्स बियॉन्ड बॉर्डर्स' : 'Words Beyond Borders'}</strong> {language === 'hi' ? 'एक अद्वितीय अंतर्राष्ट्रीय साहित्यिक सम्मेलन है जो उन राजनयिकों का सम्मान करता है जिन्होंने अपने लेखन के माध्यम से साहित्य की दुनिया को समृद्ध किया है — कूटनीति, कथा साहित्य, कविता, संस्मरण, निबंध और रचनात्मक एवं बौद्धिक अभिव्यक्ति के अन्य रूपों में।' : 'is a unique international literary gathering that celebrates diplomats who have enriched the world of literature through their writings—across diplomacy, fiction, poetry, memoirs, essays, and other forms of creative and intellectual expression.'}
                                    </p>
                                    <p className="text-on-surface-variant leading-relaxed mb-8">
                                        {language === 'hi' ? 'राजनयिक दुनिया में एक दुर्लभ और शक्तिशाली दृष्टिकोण रखते हैं। अपने कार्य के माध्यम से, वे विविध समाजों, संस्कृतियों, राजनीतिक प्रणालियों और वैश्विक चुनौतियों से जुड़ते हैं। वे संघर्ष और सहयोग, वार्ता और परिवर्तन के क्षणों के साक्षी होते हैं। कई लोग इन जीवंत अनुभवों को प्रभावशाली साहित्यिक कृतियों में बदलते हैं — जो राष्ट्रों, विचारों और मानवीय कहानियों को जोड़ने वाली अंतर्दृष्टि प्रदान करती हैं।' : 'Diplomats occupy a rare and powerful vantage point in the world. Through their work, they engage with diverse societies, cultures, political systems, and global challenges. They witness moments of conflict and cooperation, negotiation and transformation. Many translate these lived experiences into compelling literary works—offering insights that bridge nations, ideas, and human stories.'}
                                    </p>
                                </div>
                                <div className="bg-primary/5 border-l-4 border-secondary-container p-6 rounded-r-xl">
                                    <p className="italic text-primary font-medium leading-relaxed">
                                        {language === 'hi' ? '"सीमाओं और संस्कृतियों के पार अपने अनूठे अनुभवों के माध्यम से, राजनयिक-लेखक दुनिया को वैश्विक मामलों की जटिलताओं में एक खिड़की प्रदान करते हैं — ऐसी कहानियाँ जो समझ और जुड़ाव को प्रेरित करती हैं।"' : '"Through their unique experiences across borders and cultures, diplomat-authors offer the world a lens into the complexities of global affairs—stories that inspire understanding and connection."'}
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
