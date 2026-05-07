import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { subPageTranslations } from '../translations/subPages';

export default function CenterOfExcellence() {
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
                                    <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">{language === 'hi' ? 'अंतर्राष्ट्रीय उत्कृष्टता केंद्र' : 'International Center of Excellence'}</p>
                                </div>
                                <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                    <span className="block mb-2">{language === 'hi' ? 'नवाचार का' : 'NURTURING'}</span>
                                    <span className="block mb-2">{language === 'hi' ? 'पोषण' : 'INNOVATION'}</span>
                                    <span className="block text-secondary-container mb-2">{language === 'hi' ? 'युवा' : 'YOUTH'}</span>
                                    <span className="block text-secondary-container">{language === 'hi' ? 'सशक्तिकरण।' : 'EMPOWERMENT.'}</span>
                                </h1>
                            </div>
                            {/* Right: Image */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                                <img alt="Center of Excellence" className="w-full h-full object-cover" src="/Images/WhatsApp Image 2026-04-09 at 15.25.51.jpeg" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="icoe" className="py-24 bg-surface-container-low px-8 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                            <div>
                                <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">{language === 'hi' ? 'DMF पहल' : 'DMF Initiative'}</span>
                                <h2 className="font-headline text-4xl font-extrabold text-primary leading-tight mb-4">
                                    {language === 'hi' ? 'अंतर्राष्ट्रीय उत्कृष्टता केंद्र' : 'International Center of Excellence'}
                                </h2>
                                <p className="text-secondary-container font-semibold text-sm mb-6 uppercase tracking-wider">{language === 'hi' ? 'KCB और DMF की एक संयुक्त पहल' : 'A Collaborative Initiative by KCB & DMF'}</p>
                                <div className="w-16 h-1 bg-secondary-container mb-8"></div>
                                <p className="text-on-surface-variant leading-relaxed mb-6">
                                    {language === 'hi' ? <><strong className="text-primary">अंतर्राष्ट्रीय उत्कृष्टता केंद्र (ICOE)</strong> की स्थापना सितंबर 2025 में खड़की छावनी बोर्ड और डॉ. ज्ञानेश्वर मुलय फाउंडेशन के बीच एक सहयोगात्मक पहल के माध्यम से की गई थी।</> : <><strong className="text-primary">International Centre of Excellence (ICOE)</strong> was established in September 2025 through a collaborative initiative between the Khadki Cantonment Board and the Dr. Dnyaneshwar Mulay Foundation.</>}
                                </p>
                                <p className="text-on-surface-variant leading-relaxed mb-6">
                                    {language === 'hi' ? 'खड़की छावनी बोर्ड छावनी बोर्ड अधिनियम के तहत कार्य करता है और रक्षा मंत्रालय, भारत सरकार के अंतर्गत संचालित होता है। बोर्ड शिक्षा, सामुदायिक विकास, महिलाओं की आजीविका परिवर्तन और सामाजिक कल्याण के माध्यम से रक्षा और नागरिक समुदायों के विकास में संलग्न रहा है।' : 'The Khadki Cantonment Board functions under the Cantonment Board Act and operates under the Ministry of Defense, Government of India. The board has been engaged in developing defense and civilian communities through education, community development, women\'s livelihood transformation, and social welfare.'}
                                </p>
                                <p className="text-on-surface-variant leading-relaxed">
                                    {language === 'hi' ? <> युवाओं और परिवारों के लिए अवसरों का विस्तार करने की आवश्यकता को पहचानते हुए, KCB ने <strong className="text-primary">डॉ. ज्ञानेश्वर मुलय</strong> के मार्गदर्शन और सहयोग को आमंत्रित किया, जो एक प्रतिष्ठित राजनयिक और भारतीय विदेश सेवा के पूर्व अधिकारी हैं, जिन्होंने पहले विदेश मंत्रालय में सचिव और राष्ट्रीय कौशल विकास निगम के सलाहकार के रूप में सेवा की है।</> : <>Recognizing the need to expand opportunities for youth and families, KCB invited the guidance and collaboration of <strong className="text-primary">Dr. Dnyaneshwar Mulay</strong>, a distinguished diplomat and former officer of the Indian Foreign Service, who previously served as Secretary in the Ministry of External Affairs and as Advisor to the National Skill Development Corporation.</>}
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-primary rounded-2xl p-10 text-white">
                                    <span className="material-symbols-outlined text-secondary-container text-5xl mb-4 block">school</span>
                                    <h3 className="font-headline text-2xl font-bold mb-3">{language === 'hi' ? 'नवाचार और कौशल विकास का मंच' : 'A Platform for Innovation & Skill Development'}</h3>
                                    <p className="text-white/80 text-sm leading-relaxed mb-6">
                                        {language === 'hi' ? 'DMF के माध्यम से डॉ. मुलय के नेतृत्व में, ICOE को प्रतिभा को पोषित करने, नवाचार को प्रोत्साहित करने और व्यक्तियों को राष्ट्रीय और वैश्विक अवसरों से जोड़ने के लिए एक दूरदर्शी मंच के रूप में स्थापित किया गया था।' : 'Under Dr. Mulay\'s leadership through DMF, the ICOE was established as a forward-looking platform to nurture talent, encourage innovation, and connect individuals with national and global opportunities.'}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { icon: 'lightbulb', label: language === 'hi' ? 'सामाजिक नवाचार' : 'Social Innovation' },
                                            { icon: 'work', label: language === 'hi' ? 'रोजगार योग्यता' : 'Employability' },
                                            { icon: 'rocket_launch', label: language === 'hi' ? 'उद्यमिता' : 'Entrepreneurship' },
                                            { icon: 'diversity_3', label: language === 'hi' ? 'सामुदायिक प्रभाव' : 'Community Impact' },
                                        ].map((s, i) => (
                                            <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-4 text-center">
                                                <span className="material-symbols-outlined text-secondary-container text-2xl mb-2 block">{s.icon}</span>
                                                <div className="text-white/70 text-xs uppercase tracking-wide">{s.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-primary/5 border-l-4 border-secondary-container p-6 rounded-r-xl">
                                    <p className="italic text-primary font-medium leading-relaxed">
                                        {language === 'hi' ? '"ICOE नवाचार और कौशल विकास को समर्पित एक सहयोगात्मक केंद्र के रूप में कार्य करता है — प्रतिभा को पोषित करने, नवाचार को प्रोत्साहित करने और व्यक्तियों को राष्ट्रीय और वैश्विक अवसरों से जोड़ने के लिए एक दूरदर्शी मंच।"' : '"The ICOE serves as a collaborative centre dedicated to innovation and skill development — a forward-looking platform to nurture talent, encourage innovation, and connect individuals with national and global opportunities."'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
