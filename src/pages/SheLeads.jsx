import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { subPageTranslations } from '../translations/subPages';

export default function SheLeads() {
    const { language } = useLanguage();
    const t = subPageTranslations[language];
    return (
        <div>
            <main>
                <section className="bg-primary mt-[88px] py-16 md:py-24">
                    <div className="max-w-7xl mx-auto px-6 md:px-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-1 bg-secondary-container shrink-0"></div>
                                    <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">{language === 'hi' ? 'शी लीड्स' : 'She Leads'}</p>
                                </div>
                                <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                    <span className="block mb-2">{language === 'hi' ? 'महिलाओं को' : 'EMPOWERING'}</span>
                                    <span className="block mb-2">{language === 'hi' ? 'सशक्त बनाना' : 'WOMEN'}</span>
                                    <span className="block text-secondary-container mb-2">{language === 'hi' ? 'नेतृत्व का' : 'BUILDING'}</span>
                                    <span className="block text-secondary-container">{language === 'hi' ? 'निर्माण।' : 'LEADERS.'}</span>
                                </h1>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                                <img alt="She Leads" className="w-full h-full object-cover" src="/Images/WhatsApp Image 2026-04-06 at 12.20.21.jpeg" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="she-leads" className="py-24 bg-surface-container-low px-8 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">{language === 'hi' ? 'DMF पहल' : 'DMF Initiative'}</span>
                                <h2 className="font-headline text-4xl font-extrabold text-primary leading-tight mb-4">
                                    {language === 'hi' ? 'शी लीड्स — ' : 'She Leads — '}<span className="text-[#2e7d32]">{language === 'hi' ? 'महिला उद्यमिता कार्यक्रम' : "Women's Enterpreneurship Programme"}</span>
                                </h2>
                                <div className="w-16 h-1 bg-[#2e7d32] mb-8"></div>
                                <p className="text-on-surface-variant leading-relaxed mb-6">
                                    <strong className="text-primary">{language === 'hi' ? 'शी लीड्स' : 'She Leads'}</strong> {language === 'hi' ? 'ICOE के तहत एक प्रमुख पहल है जो विशेष रूप से रक्षा परिवारों और नागरिक समुदायों की महिलाओं को सशक्त बनाने पर केंद्रित है। कार्यक्रम आत्मविश्वास, व्यावसायिक कौशल और उद्यमशील मानसिकता का निर्माण करता है ताकि टिकाऊ आजीविका सक्षम हो सके।' : "is a flagship initiative under ICOE focused exclusively on empowering women from defence families and civilian communities. The programme builds confidence, vocational skills, and entrepreneurial mindset to enable sustainable livelihoods."}
                                </p>
                                <div className="space-y-4">
                                    {[
                                        { icon: 'groups', title: language === 'hi' ? 'सामान्य उत्पादक समूह' : 'Common Producer Groups', desc: language === 'hi' ? 'सामूहिक उद्यम के लिए स्व-टिकाऊ उत्पादक समूहों में संगठित महिलाएं।' : 'Women organized into self-sustaining producer groups for collective enterprise.' },
                                        { icon: 'storefront', title: language === 'hi' ? 'बाजार संपर्क' : 'Market Linkages', desc: language === 'hi' ? 'उत्पाद स्थानीय बाजारों, प्रदर्शनियों और ई-कॉमर्स प्लेटफॉर्म से जुड़े।' : 'Products connected to local markets, exhibitions, and e-commerce platforms.' },
                                        { icon: 'school', title: language === 'hi' ? 'कौशल प्रशिक्षण' : 'Skill Training', desc: language === 'hi' ? 'मिठाई बनाने, चमड़े के सामान, सिलाई और डिजिटल वित्त में व्यावहारिक प्रशिक्षण।' : 'Hands-on training in sweet-making, leather goods, tailoring, and digital finance.' },
                                        { icon: 'account_balance', title: language === 'hi' ? 'वित्तीय साक्षरता' : 'Financial Literacy', desc: language === 'hi' ? 'बैंकिंग, बचत, GST मूल बातें और स्व-रोजगार के लिए सूक्ष्म-वित्तपोषण।' : 'Banking, savings, GST basics, and micro-financing for self-employment.' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 bg-surface-container-lowest rounded-xl border-l-4 border-[#2e7d32]/40 hover:border-[#2e7d32] transition-all">
                                            <span className="material-symbols-outlined text-[#2e7d32] text-2xl mt-0.5">{item.icon}</span>
                                            <div>
                                                <div className="font-headline font-bold text-primary text-sm mb-1">{item.title}</div>
                                                <div className="text-on-surface-variant text-xs leading-relaxed">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { num: '25+', label: language === 'hi' ? 'प्रशिक्षित महिला उद्यमी' : 'Women Entrepreneurs Trained', color: 'bg-[#2e7d32] text-white' },
                                        { num: '2', label: language === 'hi' ? 'उत्पादक समूह गठित' : 'Producer Groups Formed', color: 'bg-secondary-container text-on-secondary-container' },
                                        { num: '3', label: language === 'hi' ? 'उद्यम क्षेत्र' : 'Enterprise Verticals', color: 'bg-primary text-white' },
                                        { num: '100%', label: language === 'hi' ? 'रक्षा और नागरिक परिवारों से' : 'From Defence & Civilian Families', color: 'bg-surface-container-lowest text-primary border border-outline-variant' },
                                    ].map((s, i) => (
                                        <div key={i} className={`${s.color} rounded-2xl p-6 text-center shadow-md`}>
                                            <div className="font-headline text-4xl font-black mb-2">{s.num}</div>
                                            <div className="text-xs uppercase tracking-widest opacity-80 leading-tight">{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-xl" style={{ height: '360px' }}>
                                    <img
                                        src="/Images/WhatsApp Image 2026-04-06 at 12.20.21.jpeg"
                                        alt="She Leads — Women Enterprise Workshop"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
