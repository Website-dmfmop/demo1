import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { subPageTranslations } from '../translations/subPages';

export default function NursingCollege() {
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
                                    <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">{language === 'hi' ? 'नर्सिंग कॉलेज' : 'Nursing College'}</p>
                                </div>
                                <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                    <span className="block mb-2">{language === 'hi' ? 'कौशल का' : 'DEVELOPING'}</span>
                                    <span className="block mb-2">{language === 'hi' ? 'विकास' : 'SKILLS'}</span>
                                    <span className="block text-secondary-container mb-2">{language === 'hi' ? 'करुणामय' : 'COMPASSIONATE'}</span>
                                    <span className="block text-secondary-container">{language === 'hi' ? 'देखभाल।' : 'CARE.'}</span>
                                </h1>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                                <img alt="Nursing College" className="w-full h-full object-cover" src="/Images/nursing_collage.jpeg" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="nursing-colleges" className="py-24 bg-surface px-8 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">{language === 'hi' ? 'स्वास्थ्य उत्कृष्टता' : 'Healthcare Excellence'}</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">{language === 'hi' ? 'नर्सिंग संस्थान — GNM कार्यक्रम' : 'Nursing Institute — GNM Program'}</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-6"></div>
                            <p className="text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
                                {language === 'hi' ? <>डॉ. ज्ञानेश्वर मुलय फाउंडेशन का नर्सिंग संस्थान करुणामय, कुशल और विश्व स्तर पर सक्षम स्वास्थ्य पेशेवरों को विकसित करने के लिए प्रतिबद्ध है। <strong className="text-primary">GNM (जनरल नर्सिंग और मिडवाइफरी)</strong> कार्यक्रम नर्सिंग देखभाल, मिडवाइफरी और सामुदायिक स्वास्थ्य में व्यापक प्रशिक्षण प्रदान करता है।</> : <>The Nursing Institute at Dr. Dnyaneshwar Mulay Foundation is committed to developing compassionate, skilled, and globally competent healthcare professionals. The <strong className="text-primary">GNM (General Nursing &amp; Midwifery)</strong> Program provides comprehensive training in nursing care, midwifery, and community health.</>}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                            <div className="md:col-span-2 bg-surface-container-low rounded-2xl p-10 border-l-4 border-primary">
                                <span className="material-symbols-outlined text-primary text-4xl mb-4 block">medical_services</span>
                                <h3 className="font-headline text-2xl font-bold text-primary mb-4">{language === 'hi' ? 'GNM कार्यक्रम के बारे में' : 'About the GNM Program'}</h3>
                                <p className="text-on-surface-variant leading-relaxed mb-6">
                                    {language === 'hi' ? <>GNM कार्यक्रम एक <strong className="text-primary">3-वर्षीय डिप्लोमा कोर्स</strong> है जो मजबूत नैदानिक कौशल, नैतिक मूल्यों और रोगी-केंद्रित देखभाल प्रथाओं के निर्माण पर केंद्रित है। यह सैद्धांतिक ज्ञान को व्यावहारिक प्रशिक्षण के साथ जोड़ता है।</> : <>The GNM program is a <strong className="text-primary">3-year diploma course</strong> that focuses on building strong clinical skills, ethical values, and patient-centered care practices. It combines theoretical knowledge with hands-on practical training.</>}
                                </p>
                                <div className="bg-surface-container-lowest rounded-xl p-6">
                                    <h4 className="font-headline font-bold text-primary mb-3">{language === 'hi' ? 'पात्रता मानदंड' : 'Eligibility Criteria'}</h4>
                                    <ul className="space-y-2 text-on-surface-variant text-sm">
                                        <li className="flex items-start gap-2"><span className="material-symbols-outlined text-secondary-container text-sm mt-0.5">check_circle</span>{language === 'hi' ? '10+2 (विज्ञान वरीयता) नियामक मानदंडों के अनुसार न्यूनतम आवश्यक अंकों के साथ' : '10+2 (Science preferred) with minimum required marks as per regulatory norms'}</li>
                                        <li className="flex items-start gap-2"><span className="material-symbols-outlined text-secondary-container text-sm mt-0.5">check_circle</span>{language === 'hi' ? 'नर्सिंग परिषद दिशानिर्देशों के अनुसार आयु और चिकित्सा योग्यता' : 'Age and medical fitness as per nursing council guidelines'}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="bg-primary rounded-2xl p-8 text-center flex-1 flex flex-col items-center justify-center">
                                    <span className="material-symbols-outlined text-secondary-container text-5xl mb-3">schedule</span>
                                    <div className="font-headline text-5xl font-black text-white mb-1">3</div>
                                    <div className="text-white/70 text-sm uppercase tracking-widest">{language === 'hi' ? 'वर्षीय डिप्लोमा' : 'Year Diploma'}</div>
                                </div>
                                <div className="bg-secondary-container rounded-2xl p-8 text-center flex-1 flex flex-col items-center justify-center">
                                    <span className="material-symbols-outlined text-on-secondary-container text-5xl mb-3">public</span>
                                    <div className="font-headline text-2xl font-black text-on-secondary-container mb-1">{language === 'hi' ? 'वैश्विक' : 'Global'}</div>
                                    <div className="text-on-secondary-container/70 text-sm uppercase tracking-widest">{language === 'hi' ? 'प्लेसमेंट तैयार' : 'Placement Ready'}</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-surface-container-low rounded-2xl p-10">
                            <h3 className="font-headline text-2xl font-bold text-primary mb-8 text-center">{language === 'hi' ? 'करियर के अवसर' : 'Career Opportunities'}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {[
                                    { icon: 'local_hospital', title: language === 'hi' ? 'स्टाफ नर्स' : 'Staff Nurse', desc: language === 'hi' ? 'अस्पतालों और क्लीनिकों में' : 'In hospitals and clinics' },
                                    { icon: 'health_and_safety', title: language === 'hi' ? 'सामुदायिक स्वास्थ्य नर्स' : 'Community Health Nurse', desc: language === 'hi' ? 'जमीनी स्तर पर स्वास्थ्य सेवा वितरण' : 'Grassroots healthcare delivery' },
                                    { icon: 'pregnant_woman', title: language === 'hi' ? 'दाई' : 'Midwife', desc: language === 'hi' ? 'मातृत्व और प्रसव देखभाल' : 'Maternity and childbirth care' },
                                    { icon: 'home_health', title: language === 'hi' ? 'होम केयर नर्स' : 'Home Care Nurse', desc: language === 'hi' ? 'घर पर रोगी देखभाल' : 'Patient care at home' },
                                    { icon: 'account_balance', title: language === 'hi' ? 'सरकारी और निजी क्षेत्र' : 'Govt. & Private Sector', desc: language === 'hi' ? 'देशभर में स्वास्थ्य संस्थान' : 'Healthcare institutions nationwide' },
                                    { icon: 'flight_takeoff', title: language === 'hi' ? 'अंतर्राष्ट्रीय प्लेसमेंट' : 'International Placement', desc: language === 'hi' ? 'वैश्विक अवसर (योग्यता के अधीन)' : 'Global opportunities (subject to qualifications)' },
                                ].map((c, i) => (
                                    <div key={i} className="bg-surface-container-lowest rounded-xl p-5 text-center hover:-translate-y-1 transition-all duration-300">
                                        <span className="material-symbols-outlined text-primary text-3xl mb-3 block">{c.icon}</span>
                                        <div className="font-headline font-bold text-primary text-sm mb-1">{c.title}</div>
                                        <div className="text-on-surface-variant text-xs">{c.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
