import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { subPageTranslations } from '../translations/subPages';

export default function ShelterHome() {
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
                                    <p className="text-white text-sm font-medium tracking-wider uppercase bg-green-700 px-4 py-2 rounded-lg">{language === 'hi' ? 'शेल्टर होम' : 'Shelter Home'}</p>
                                </div>
                                <h1 className="font-headline font-black text-5xl md:text-6xl lg:text-7xl leading-[0.9] text-white uppercase tracking-tight">
                                    <span className="block mb-2">{language === 'hi' ? 'देखभाल' : 'PROVIDING'}</span>
                                    <span className="block mb-2">{language === 'hi' ? 'प्रदान करना' : 'CARE'}</span>
                                    <span className="block text-secondary-container mb-2">{language === 'hi' ? 'गरिमापूर्ण' : 'DIGNIFIED'}</span>
                                    <span className="block text-secondary-container">{language === 'hi' ? 'जीवन।' : 'LIVING.'}</span>
                                </h1>
                            </div>
                            {/* Right: Image */}
                            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                                <img alt="Shelter Home" className="w-full h-full object-cover" src="/Images/selter_home.jpeg" />
                            </div>
                        </div>
                    </div>
                </section>
                <section id="old-age-home" className="py-24 bg-surface-container-low px-8 min-h-screen">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-label text-secondary-container text-xs font-bold tracking-widest uppercase mb-3 block">{language === 'hi' ? 'DMF पहल' : 'DMF Initiative'}</span>
                            <h2 className="font-headline text-4xl font-extrabold text-primary mb-4">{language === 'hi' ? 'शेल्टर होम – गरिमा, देखभाल और करुणा का घर' : 'Shelter Home – A Home of Dignity, Care & Compassion'}</h2>
                            <div className="w-16 h-1 bg-secondary-container mx-auto mb-6"></div>
                            <p className="text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
                                {language === 'hi' ? 'डॉ. ज्ञानेश्वर मुलय फाउंडेशन में, हम मानते हैं कि हर व्यक्ति गरिमा, सम्मान और भावनात्मक सुरक्षा के साथ जीने का हकदार है। हमारी शेल्टर होम पहल सभी उम्र के बेघर लोगों के लिए एक सुरक्षित, पोषणकारी और समावेशी वातावरण प्रदान करने का एक हार्दिक प्रयास है।' : 'At the Dr. Dnyaneshwar Mulay Foundation, we believe that every individual deserves to live with dignity, respect, and emotional security. Our Shelter Home initiative is a heartfelt effort to provide a safe, nurturing, and inclusive environment for homeless people of all ages who seek care, companionship, and a sense of belonging.'}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            <div className="space-y-6">
                                {[
                                    { icon: 'home', title: language === 'hi' ? 'सुरक्षित और आरामदायक आवास' : 'Safe & Comfortable Living', desc: language === 'hi' ? 'शांतिपूर्ण और घरेलू वातावरण प्रदान करने के लिए डिज़ाइन की गई अच्छी तरह से रखरखाव, स्वच्छ और सुरक्षित आवासीय सुविधाएं।' : 'Well-maintained, hygienic, and secure residential facilities designed to provide a peaceful and homely environment.' },
                                    { icon: 'health_and_safety', title: language === 'hi' ? 'स्वास्थ्य देखभाल और कल्याण सहायता' : 'Healthcare & Wellness Support', desc: language === 'hi' ? 'नियमित स्वास्थ्य जांच, चिकित्सा पेशेवरों तक पहुंच, पौष्टिक भोजन और योग और ध्यान सहित कल्याण गतिविधियां।' : 'Regular health check-ups, access to medical professionals, nutritious meals, and wellness activities including yoga and meditation.' },
                                    { icon: 'psychology', title: language === 'hi' ? 'भावनात्मक और सामाजिक देखभाल' : 'Emotional & Social Care', desc: language === 'hi' ? 'देखभाल करने वाला और सहानुभूतिपूर्ण स्टाफ। सामाजिक संपर्क, त्योहारों, जन्मदिन और सांस्कृतिक कार्यक्रमों के अवसर।' : 'A caring and empathetic staff. Opportunities for social interaction, and celebration of festivals, birthdays, and cultural events.' },
                                    { icon: 'sports_esports', title: language === 'hi' ? 'मनोरंजन और सहभागिता गतिविधियां' : 'Recreational & Engagement Activities', desc: language === 'hi' ? 'पढ़ना, संगीत, इनडोर खेल, कौशल-आधारित गतिविधियां, कहानी सत्र और स्वयंसेवकों से सामुदायिक संवाद कार्यक्रम।' : 'Reading, music, indoor games, skill-based activities, storytelling sessions, and community interaction programs from volunteers.' },
                                    { icon: 'self_improvement', title: language === 'hi' ? 'गरिमा और सम्मान सर्वप्रथम' : 'Dignity & Respect First', desc: language === 'hi' ? 'हम सुनिश्चित करते हैं कि हर निवासी के साथ परम सम्मान के साथ व्यवहार किया जाए, उनकी स्वतंत्रता और व्यक्तिगत पसंद को बनाए रखा जाए।' : 'We ensure that every resident is treated with utmost respect, maintaining their independence and personal choices.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4 p-5 bg-surface-container-lowest rounded-xl border-l-4 border-secondary-container/50 hover:border-secondary-container transition-all">
                                        <span className="material-symbols-outlined text-secondary-container text-2xl mt-0.5">{item.icon}</span>
                                        <div>
                                            <div className="font-headline font-bold text-primary text-sm mb-1">{item.title}</div>
                                            <div className="text-on-surface-variant text-xs leading-relaxed">{item.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-6">
                                <div className="bg-primary rounded-2xl p-10 text-white">
                                    <span className="material-symbols-outlined text-secondary-container text-5xl mb-4 block">elderly</span>
                                    <h3 className="font-headline text-2xl font-bold mb-3">{language === 'hi' ? 'हमारा विज़न और मिशन' : 'Our Vision & Mission'}</h3>
                                    <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium italic">
                                        {language === 'hi' ? '"एक करुणामय समुदाय बनाना जहां बुजुर्ग व्यक्ति गरिमा, स्वतंत्रता और खुशी के साथ जीवन जिएं, समग्र देखभाल और सार्थक सहभागिता द्वारा समर्थित हों।"' : '"To create a compassionate community where elderly individuals live with dignity, independence, and happiness, supported by holistic care and meaningful engagement."'}
                                    </p>
                                    <div className="rounded-xl overflow-hidden mt-6 border border-white/20">
                                        <img src="/Images/Seltter_home.jpeg" alt="Shelter Home" className="w-full h-80 object-cover" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
